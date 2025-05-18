import { getShortUrlByIdDAO } from "../dao/shortUrl.js";
import { createShortUrlWithoutUserService } from "../services/shortUrl.service.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const shortUrl = generateNanoId(7);
    const result = await createShortUrlWithoutUserService(url, shortUrl);
    res.status(201).json(process.env.BASE_URL + "/" + result);
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectFromShortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await getShortUrlByIdDAO(shortUrl);
    console.log(url);
    console.log("clicking redirect", url);

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error redirecting to original URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
