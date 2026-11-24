import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import urlRoutes from "./routes/route.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", urlRoutes);

export default app;
