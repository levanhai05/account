const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // Không có token -> bỏ qua, KHÔNG verify
    if (!header || !header.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = header.split(" ")[1];
    if (!token) {
      req.user = null;
      return next();
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      req.user = null;
      return next();
    }

    req.user = user;
    next();
  } catch (err) {
    // Token lỗi -> KHÔNG CRASH SERVER
    req.user = null;
    return next();
  }
};
