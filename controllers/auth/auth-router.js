const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../../models/User");
const RevokedToken = require("./../../models/RevokedToken");
const AuthenticationCode = require("./../../models/AuthenticationCode");
const UserRole = require("./../../models/UserRole");
const authentication = require("./auth-middleware");
const sendMail = require("./../../utils/sendMail");
const { generateAuthToken } = require("./../../utils");
const DatabaseError = require("./../../errors/DatabaseError");

router.post("/signup", verifyAuthCode, async (req, res, next) => {
  try {
    User.validate(req.body);

    const { authCode, ...rest } = req.body;
    const hash = bcrypt.hashSync(req.body.password, 10);

    const user = await User.insert({
      ...rest,
      password: hash,
    });

    delete user.password;

    return res.status(201).json(user[0]);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.query().where({ email }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const tokenPayload = {
        subject: user.id,
      };
      const access_token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

      res.json({
        access_token,
        displayName: `${user.first_name} ${user.last_name}`,
      });
    } else {
      res.status(403).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/logout", authentication, async (req, res, next) => {
  try {
    await RevokedToken.insert({ token: req.token });
    res.json({ message: "Successful logged out." });
  } catch (error) {
    next(error);
  }
});

router.post("/auth-code", async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(401).json({ message: "Email field is required." });
    }
    const code = generateAuthToken();
    await AuthenticationCode.insert({ email: req.body.email, code });
    await sendMail(req.body.email, "Any-Fitness.com Invitation", { code });

    res.json({
      message: `An invitation email has been sent to ${req.body.email}. 
      Check your junk folder if you did not see the email in your main inbox.`,
    });
  } catch (error) {
    next(error);
  }
});

async function verifyAuthCode(req, res, next) {
  try {
    if (
      !req.body.role_id ||
      (req.body.role_id && typeof req.body.role_id !== "number")
    ) {
      return res
        .status(401)
        .json({ message: "User role id not found or invalid id format" });
    }
    if (
      !req.body.email ||
      (req.body.email && typeof req.body.email !== "string")
    ) {
      return res
        .status(401)
        .json({ message: "email id not found or invalid email format" });
    }

    const userRole = await UserRole.findById(req.body.role_id);
    if (!userRole) {
      return res.status(401).json({ message: "User role id not found" });
    }

    switch (userRole.name) {
      case "Instructor":
        const authCode = await AuthenticationCode.query()
          .where("email", req.body.email)
          .where("code", req.body.authCode)
          .first();
        if (!authCode) {
          return res
            .status(403)
            .json({ message: "Authentication code doest not found" });
        }
        next();
        break;
      case "Client":
        next();
        break;
      default:
        return res
          .status(500)
          .json({ message: "User role must be Instructor or Client" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
