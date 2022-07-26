import axios, { AxiosResponse, AxiosError } from "axios";
import { Request, Response, NextFunction } from "express";
import IEndpoint from "../utils/IEndpoint";
import HTTPError from "../utils/error";

const getQuoteByQuery = (endpoint: IEndpoint) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { q: query } = req.query;
    if (typeof query !== "string" || !query) {
      return next(new HTTPError("'q' query parameter must be a string type."));
    }

    try {
      const response: AxiosResponse = await axios.get(
        `${endpoint.url}?${endpoint.param}=${query}`
      );
      let randomQuote = null;
      if (response.data.length > 0) {
        randomQuote = response.data[Math.floor(Math.random() * response.data.length)];
      }
      res.json(randomQuote);
    } catch (e) {
      const err = new HTTPError("GET request error");
      if (e instanceof AxiosError && e.response) {
        err.message = e.response.data.error;
        if (e.response.status) {
          err.status = e.response.status;
        }
      } else if (e instanceof Error) {
        err.message = e.message;
      }
      return next(err);
    }
  };
};

export default getQuoteByQuery;
