import ShortUrl from "../models/shortUrl.model.js";

export const createShortUrlDAO = async (url, customShortUrl, userId) => {
  const newUrl = new ShortUrl({
    originalUrl: url,
    shortUrl: customShortUrl,
  });
  if (userId) {
    newUrl.user = userId;
  }
  await newUrl.save();
};

export const getShortUrlByIdDAO = async (shortUrl) => {
  const url = await ShortUrl.findOneAndUpdate(
    { shortUrl },
    { $inc: { clicks: 1 } },
    { new: true }
  );
  return url;
};

export const getCustomShortUrlByIdDAO = async (customShortUrl) => {
  const url = await ShortUrl.findOne({ customShortUrl });
  // if (url) {
  //   url.clicks += 1;
  //   await url.save();
  // }
  return url;
};

export const getAllShortUrlDAO = async () => {
  const urls = await ShortUrl.find();
  return urls;
};
