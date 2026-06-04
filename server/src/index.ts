import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { planRouter } from "./routes/plan";
import { profileRouter } from "./routes/profile";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/profile", profileRouter);
app.use("/api/plan", planRouter);

app.listen(() => {
  console.log(`Server running on PORT : ${PORT}`);
});
