import Manager from "../models/manager";
import Student from "../models/student";
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const ObjectId = require("mongodb").ObjectID;

//login
export const loginGoogle = async (req, res) => {
  const { token, cumpusId: campusId, smester_id } = req.body;
  try {
    if (!token) {
      return res.status(401).json({ message: "Vui lòng đăng nhập tài khoản" });
    }
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, picture } = ticket.getPayload();
    const manager = await Manager.findOne({
      email: email,
      campus_id: campusId,
    });

    const student = await Student.findOne({
      email: email,
      campus_id: campusId,
      smester_id: smester_id
    });

    if (manager) {
      const accessToken = jwt.sign(
        { userId: manager._id, campusId: manager.campus_id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.status(200).json({
        manager,
        token,
        name,
        picture,
        isAdmin: true,
        message: "Đăng nhập thành công",
        accessToken: accessToken,
      });
    } else if (student) {
      const accessToken = jwt.sign(
        { userId: student._id, campusId: student.campus_id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.status(200).json({
        student,
        token,
        name,
        picture,
        isAdmin: false,
        message: "Đăng nhập thành công",
        accessToken: accessToken,
      });
    } else {
      res.status(400).json({ token: "", message: "Dang nhap that bai" });
    }
  } catch (error) {
    res.status(500).json({ token: "", message: "Lỗi server" });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.status(201).json({
      message: "Logout successfully",
      token: "",
    });
  } catch (error) {
    res.status(500).json({ token: "", message: "Lỗi server" });
  }
};

//getAll
export const getManagers = async (req, res) => {
  const managers = await Manager.find();
  try {
    res.status(201).json({
      managers,
      message: "Get all manager",
    });
  } catch (error) {
    res.status(500).json({ token: "", message: "Lỗi server" });
  }
};
