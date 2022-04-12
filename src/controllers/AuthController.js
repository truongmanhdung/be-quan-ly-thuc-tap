import Manager from "../models/manager";
import Student from "../models/student";

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const ObjectId = require("mongodb").ObjectID;

//login
export const loginGoogle = async (req, res) => {
  const { token, cumpusId } = req.body;
  const cumpusObjectId = ObjectId(cumpusId);
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
    campus_id: cumpusObjectId,
  });
  const student = await Student.findOne({
    email: email,
    campus_id: cumpusObjectId,
  });
  if (manager) {
    res.status(200).json({
      manager,
      token,
      name,
      picture,
      isAdmin: true,
      message: "Đăng nhập thành công",
    });
  } else if (student) {
    res.status(200).json({
      student,
      token,
      name,
      picture,
      isAdmin: false,
      message: "Đăng nhập thành công",
    });
  } else {
    res.status(400).json({ token: "", message: "Dang nhap that bai" });
  }
};

//logout
export const logout = async (req, res) => {
  res.status(201).json({
    message: "Logout successfully",
    token: "",
  });
};

//getAll
export const getManagers = async (req, res) => {
  const managers = await Manager.find();
  res.status(201).json({
    managers,
    message: "Get all manager",
  });
};
