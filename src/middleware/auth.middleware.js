import jsonwebtoken from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req?.cookies?.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
