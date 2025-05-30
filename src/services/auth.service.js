import jsonwebtoken from "jsonwebtoken";
import { createUser, findUserByEmail } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";
import bcrypt from "bcrypt";

export const registerUserService = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");
  const newUser = await createUser(name, email, password);
  const token = signToken({ id: newUser._id });
  return { token, newUser };
};

export const loginUserService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid User/Password");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid User/Password");
  const token = signToken({ id: user._id });
  return { token, user };
};

export const createShortUrlWithoutUserService = async (url, shortUrl) => {
  const existingUrl = await getShortUrlByIdDAO(shortUrl);
  if (existingUrl) throw new Error("Short URL already exists");
  const newUrl = await createShortUrlWithoutUserService(url, shortUrl);
  return newUrl;
};
