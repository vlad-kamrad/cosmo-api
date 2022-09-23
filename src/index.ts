import { config as configDotenv } from "dotenv";
configDotenv();

import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./routes/auth.route";
import slotRouter from "./routes/slot.route";
import bookingRouter from "./routes/booking.route";

import { PORT } from "./config/config";
import { isReady } from "./config/db";

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.disable("x-powered-by");

app.use("/slot", slotRouter);
app.use("/auth", authRouter);
app.use("/booking", bookingRouter);

app.get("/health", (_, res) => res.json({ db: isReady() }));

app.listen(PORT, () => console.log(`We're live on ${PORT}`));
