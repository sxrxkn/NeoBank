import { ApiError } from "../models";

export const getNewsData = async (url: string) => {
  const newsData = await fetch(url).then((response) => response.json());
  return newsData;
};

export const isApiError = (x: unknown): x is ApiError => {
  if (x && typeof x === "object" && "code" in x) {
    return true;
  }
  return false;
};
