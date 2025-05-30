import {
  createShortUrlDAO,
  getCustomShortUrlByIdDAO,
  getAllShortUrlDAO,
} from "../dao/shortUrl.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUserService = async (url) => {
  const shortUrl = generateNanoId(7);
  await createShortUrlDAO(url, shortUrl);
  return shortUrl;
};
export const createShortUrlWithUserService = async (url, shortUrl, userId) => {
  const finalShortUrl = shortUrl || generateNanoId(7);
  const existingUrl = await getCustomShortUrlByIdDAO(finalShortUrl);
  if (existingUrl) throw new Error("Short URL already exists");
  await createShortUrlDAO(url, finalShortUrl, userId);
  console.log(finalShortUrl);

  return finalShortUrl;
};

export const getAllShortUrlByIdService = async () => {
  const urls = await getAllShortUrlDAO();
  return urls;
};
