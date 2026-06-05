import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { planRouter } from "./routes/plan";
import { profileRouter } from "./routes/profile";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/profile", profileRouter);
app.use("/api/plan", planRouter);

const url = new URL(process.env.DATABASE_URL!);

console.log({
  username: url.username,
  password: url.password,
  hostname: url.hostname,
});

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
