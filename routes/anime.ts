import express from "express";
const router = express.Router();
import getQuoteByQuery from "../controllers/getController";
import { ANIMECHAN_GET_QUOTE_BY_ANIME } from "../utils/constants";

router.route("/").get(getQuoteByQuery(ANIMECHAN_GET_QUOTE_BY_ANIME));

export default router;
