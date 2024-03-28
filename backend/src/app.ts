import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import appRouter from "./routes/index.js";

const app = express();

const origin = "http://localhost:3000";

// to run the config or to initialize the .env variables
config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ credentials: true, origin }));

// remove this in production
app.use(morgan("dev"));

// routes
app.use("/api/v1", appRouter);

export default app;
