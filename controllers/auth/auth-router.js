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

router.post("/signup", verifyAuthCode, async (req, res, next) => {
  try {
    const { auth_code, ...rest } = req.body || {};
    const hash = bcrypt.hashSync(req.body.password, 10);

    const user = await User.insert({
      ...rest,
      password: hash,
    });

    res.status(201).json(user);
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

router.post("/logout", authentication, async (req, res, next) => {
  try {
    await RevokedToken.insert({ token: req.token });
    res.json({ message: "Successful logged out." });
  } catch (error) {
    next(error);
  }
});

router.post("/send-auth-code", async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(401).json({ message: "Email field is required." });
    }
    const code = generateAuthToken();
    await AuthenticationCode.insert({ email: req.body.email, code });
    await sendMail(req.body.email, "Anywhere-Fitness.com Invitation", code);

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
    const userRole = await UserRole.findById(req.body.role_id);
    if (!userRole) {
      res.status(401).json({ message: "User role id not found" });
    }
    switch (userRole.name) {
      case "Instructor":
        const authCode = await AuthenticationCode.query()
          .where("email", req.body.email)
          .where("code", req.body.authCode)
          .first();
        if (!authCode) {
          res
            .status(401)
            .json({ message: "UAuthentication code doest not found" });
        }
        next();
      case "Client":
        return next();
      default:
        return res.status(500).json({ message: "Something wrong!" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
