import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import apiRoutes from "./routes";
import errorHandler from "@middlewares/error.handler";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", apiRoutes);

app.use(errorHandler);
export default app;
