import express from "express";
import {
  createShortUrl,
  redirectFromShortUrl,
} from "../controller/shortUrl.controller.js";
const router = express.Router();

router.post("/", createShortUrl);
// router.post("/:shortUrl", redirectFromShortUrl);

export default router;
