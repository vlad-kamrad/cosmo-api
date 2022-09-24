import { config as configDotenv } from "dotenv";
configDotenv();

import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

import authRouter from "./routes/auth.route";
import slotRouter from "./routes/slot.route";
import bookingRouter from "./routes/booking.route";
import staticRouter from "./routes/static.route";

import { PORT } from "./config/config";
import { isReady } from "./config/db";

const app = express();

const limiter = rateLimit({
  standardHeaders: true,
  legacyHeaders: false,
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(mongoSanitize({ replaceWith: "_" }));
app.use(limiter);

app.disable("x-powered-by");

app.use("/slot", slotRouter);
app.use("/auth", authRouter);
app.use("/booking", bookingRouter);
app.use("/", staticRouter);

app.get("/health", (_, res) => res.json({ db: isReady() }));

app.listen(PORT, () => console.log(`We're live on ${PORT}`));
