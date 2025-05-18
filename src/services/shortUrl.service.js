import { createShortUrlDAO } from "../dao/shortUrl.js";

export const createShortUrlWithoutUserService = async (url, shortUrl) => {
  await createShortUrlDAO(url, shortUrl);
  return shortUrl;
};
export const createShortUrlWithUserService = async (url, shortUrl, userId) => {
  await createShortUrlDAO(url, shortUrl, userId);
  return shortUrl;
};
