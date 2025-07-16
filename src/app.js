import express from "express";
import { connectDb } from "./config/connectDb";
import userRouter from "./router/User";
import categoryRouter from "./router/category";
import postRouter from "./router/post";
import tagRouter from "./router/tag";
const app = express();
connectDb();

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", postRouter);
app.use("/api", tagRouter);

export const viteNodeApp = app;
