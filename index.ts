import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import anime from "./routes/anime";
import character from "./routes/character";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Set up routes
app.use("/anime", anime);
app.use("/character", character);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}; press Ctrl-C to terminate.`);
});

app.get("/anime", (_req: Request, res: Response) => {
  res.redirect("anime");
});

app.get("/character", (_req: Request, res: Response) => {
  res.redirect("character");
});

app.all("*", (_req: Request, _res: Response, next: NextFunction) => {
  next(Error("Resource not found"));
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.send(err.message);
});
