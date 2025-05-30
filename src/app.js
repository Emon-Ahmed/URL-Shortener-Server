import express from "express";
import connectDB from "./config/mongo.config.js";
import shortUrlRoute from "./routes/shortUrl.route.js";
import authRoute from "./routes/auth.route.js";
import { redirectFromShortUrl } from "./controller/shortUrl.controller.js";
import { errorHandler } from "./utils/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use("/api/create", shortUrlRoute);
app.use("/api/auth", authRoute);
app.use("/:shortUrl", redirectFromShortUrl);

app.listen(3000, async () => {
  try {
    await connectDB();
    console.log("Server is running on port 3000");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});
