import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  if (!email) throw new Error("Email is required");
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

export const findUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

export const createUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const newUser = new User({
    name,
    email,
    password,
  });
  await newUser.save();
  return newUser;
};

export const getShortUrlByIdDAO = async (shortUrl) => {
  const user = await User.findOne({ shortUrl });
  if (!user) {
    throw new Error("Short URL not found");
  }
  return user;
};
