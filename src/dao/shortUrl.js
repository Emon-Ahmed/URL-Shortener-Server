import ShortUrl from "../models/shortUrl.model.js";

export const createShortUrlDAO = async (url, shortUrl, userId) => {
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const newUrl = new ShortUrl({
    originalUrl: url,
    shortUrl: shortUrl,
  });
  if (userId) {
    newUrl.user = userId;
  }
  await newUrl.save();
};

export const getShortUrlByIdDAO = async (shortUrl) => {
  console.log("DAO");

  const url = await ShortUrl.findOne({ shortUrl });
  if (!url) {
    return res.status(404).json({ error: "URL not found" });
  }
  url.clicks += 1;
  await url.save();
  return url;
};
