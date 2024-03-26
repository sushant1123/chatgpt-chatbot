import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";

const app = express();

// to run the config or to initialize the .env variables
config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// remove this in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
