import express from "express";
import {
  createShortUrl,
  redirectFromShortUrl,
  createCustomShortUrl,
  createShortUrlAuth,
  getAllUrls,
} from "../controller/shortUrl.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", createShortUrl);
router.post("/auth", authMiddleware, createShortUrlAuth);
router.post("/custom", createCustomShortUrl);
router.get("/urls", getAllUrls);
// router.post("/:shortUrl", redirectFromShortUrl);

export default router;
