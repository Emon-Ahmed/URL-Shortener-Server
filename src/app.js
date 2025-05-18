import express from "express";
import { nanoid } from "nanoid";
import ShortUrl from "./models/shortUrl.model.js";
import connectDB from "./config/mongo.config.js";
import shortUrlRoute from "./routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./controller/shortUrl.controller.js";
import { errorHandler } from "./utils/errorHandler.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use("/api/create", shortUrlRoute);
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
