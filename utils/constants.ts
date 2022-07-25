import IEndpoint from "./IEndpoint";

export const ANIMECHAN_GET_QUOTE_BY_ANIME: IEndpoint = {
  url: "https://animechan.vercel.app/api/quotes/anime",
  param: "title",
};
export const ANIMECHAN_GET_QUOTE_BY_CHARACTER: IEndpoint = {
  url: "https://animechan.vercel.app/api/quotes/character",
  param: "name",
};
