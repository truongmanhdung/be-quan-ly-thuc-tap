import User from "../models/User";

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//login
export const loginGoogle = async (req, res) => {
  const { token,cumpus} = await req.body;
  if (!token) {
    return res.status(401).json({ message: "Vui lòng đăng nhập tài khoản" });
  }
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, name, picture } = ticket.getPayload();
  const user = await User.findOne({ email: email ,cumpus:cumpus});
  //userAdmin
  if (user) {
    res.status(201);
    res.json({ user, token, name, picture,isAdmin:true, message: "Đăng nhập thành công" });
  } else {
    res.status(201);
    res.json({ email, name, picture, token, message: "Đăng nhập thành công" });
  }
};

//getAll
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(201).json({
    users,
    message: "Get all user",
  });
};
