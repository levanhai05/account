const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// -----------------------------
// ĐĂNG KÝ
// -----------------------------
exports.register = async (req, res) => {
  try {
    const { username, displayName, email, password } = req.body;

    if (!username || !displayName || !email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin" });
    }

    // kiểm tra trùng username hoặc email
    const existsUser = await User.findOne({ username });
    if (existsUser) {
      return res.status(400).json({ message: "Tên tài khoản đã tồn tại" });
    }

    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      displayName,
      email,
      password: hashed,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Đăng ký thành công",
      token,
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// -----------------------------
// ĐĂNG NHẬP
// -----------------------------
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
