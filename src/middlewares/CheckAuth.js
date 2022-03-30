import User from "../models/User";

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.isAuthenticateUser = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: "Vui lòng đăng nhập tài khoản" });
  }
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email } = ticket.getPayload();
  req.user = User.findOne({ email: email });
  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message: `Tài khoản quyền :${req.user.role} không được phép truy cập page quản lý Admin`,
        });
    }
    next();
  };
};
