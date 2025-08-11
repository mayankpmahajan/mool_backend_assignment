import express, { Express } from "express";
import dotenv from "dotenv";
import pino from "pino";
import cors from "cors";
import helmet from "helmet";
import masterRouter from "./api";
import connectDB from "./config/database";
import rateLimit from "express-rate-limit";

dotenv.config();
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname,time",
    },
  },
});

const app: Express = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //set for react frontend will be updated whenever needed
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", masterRouter);

connectDB();

export { app, logger };
