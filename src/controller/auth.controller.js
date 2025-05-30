import { cookieOptions } from "../config/config.js";
import User from "../models/user.model.js";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { token, newUser } = await registerUserService(name, email, password);
  req.user = newUser;
  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({
    token,
    user: newUser,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUserService(email, password);
  req.user = user;
  console.log(token);

  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ token, user });
};

export const logoutUser = async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  req.user = null; // Clear user from request
  res.status(200).json({ message: "Logout successful" });
};

export const get_current_user = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
};

export const checkAuth = async (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user });
  }
  res.status(401).json({ message: "Unauthorized" });
};
