import express from "express";

import dotenv from "dotenv";
dotenv.config();

import connectDb from "./utils/db";

import userRoutes from "./routes/user";

(() => {
  const app = express();

  connectDb();

  app.use(express.json());

  app.use("/api/v1", userRoutes);

  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log("hello from port", port));
})();
