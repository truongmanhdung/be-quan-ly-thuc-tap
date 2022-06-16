import Manager from "../models/manager";
import Student from "../models/student";
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const isAuthenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Vui lòng đăng nhập tài khoản" });
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const manager = await Manager.findOne({
      _id: decoded.userId,
      campus_id: decoded.campusId,
    });
    const student = await Student.findOne({
      _id: decoded.userId,
      campus_id: decoded.campusId,
    });

    if (manager) {
      req.role = manager.role;
      next();
    }
     if (student) {
      req.role = "student";
      next();
    }
    res.status(401).json({
      msg: "không có quyền truy cập"
    })
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

export const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!(roles === req.role)) {
      return res.status(403).json({
        message: `Tài khoản quyền :${req.role} không được phép truy cập quyền giáo viên`,
      });
    }
    next();
  };
};
