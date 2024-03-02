import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authHandler from "./route/auth.js";
import blogHandler from "./route/blog.js";
import userHandler from "./route/user.js";

const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  AccessControlAllowOrigin: "*",
  origin: "https://word-web-sigma.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/auth", authHandler);
app.use("/api/v1/blog", blogHandler);
app.use("/api/v1/user", userHandler);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Db connected successfully");
  } catch (err) {
    console.log(err);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("server running");
});
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
