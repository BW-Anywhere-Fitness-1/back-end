const UserRole = require("./../../models/UserRole");

module.exports = async (req, res, next) => {
  try {
    const role = await UserRole.findById(req.user.role_id);
    if (role.name !== "Instructor") {
      res.status(403).json({ message: "Access forbidden." });
    }
  } catch (error) {
    next(error);
  }
};
