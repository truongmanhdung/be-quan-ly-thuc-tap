import Manager from "../models/manager";

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//login
export const loginGoogle = async (req, res) => {
  const { token,cumpusId} = await req.body;
  if (!token) {
    return res.status(401).json({ message: "Vui lòng đăng nhập tài khoản" });
  }
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, name, picture } = ticket.getPayload();
  const manager = await Manager.findOne({ email: email ,cumpus:cumpusId});
  //manager
  if (manager) {
    res.status(201);
    res.json({ manager, token, name, picture,isAdmin:true, message: "Đăng nhập thành công" });
  } else {
    //student
    res.status(201);
    res.json({ email, name, picture, token, message: "Đăng nhập thành công" });
  }
};

//logout
export const logout = async (req, res) => {
  res.status(201).json({
    message: "Logout successfully",
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
