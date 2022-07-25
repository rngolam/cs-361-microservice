import express from "express";
const router = express.Router();
import getQuoteByQuery from "../controllers/getController";
import { ANIMECHAN_GET_QUOTE_BY_CHARACTER } from "../utils/constants";

router.route("/").get(getQuoteByQuery(ANIMECHAN_GET_QUOTE_BY_CHARACTER));

export default router;
