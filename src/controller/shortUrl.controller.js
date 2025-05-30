import { getShortUrlByIdDAO } from "../dao/shortUrl.js";
import {
  createShortUrlWithoutUserService,
  createShortUrlWithUserService,
  getAllShortUrlByIdService,
} from "../services/shortUrl.service.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const shortUrl = await createShortUrlWithoutUserService(url);
    res.status(201).json(process.env.BASE_URL + "/" + shortUrl);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createShortUrlAuth = async (req, res) => {
  try {
    const { url } = req.body;
    const userId = req?.user.id;
    const shortUrl = await generateNanoId(7);
    const result = await createShortUrlWithUserService(url, shortUrl, userId);
    return res.status(201).json(process.env.BASE_URL + "/" + result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createCustomShortUrl = async (req, res) => {
  try {
    const { url, customShortUrl } = req.body;
    const userId = req.user._id;
    const result = await createShortUrlWithUserService(
      url,
      customShortUrl,
      userId
    );
    return res.status(201).json(process.env.BASE_URL + "/" + result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectFromShortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await getShortUrlByIdDAO(shortUrl);
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    const urls = await getAllShortUrlByIdService();
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
