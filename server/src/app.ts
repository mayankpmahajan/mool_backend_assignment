import express, {Express} from 'express';
import dotenv from 'dotenv';
import { pino } from "pino";
import cors from "cors";
import helmet from "helmet";
import masterRouter from './api';


dotenv.config();
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname,time'
    }
  }
})

const app:Express = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use('api/v1',masterRouter);

export {app, logger}