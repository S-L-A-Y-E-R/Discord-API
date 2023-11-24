import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "config.env" });

mongoose
  .connect(process.env.DATABASE!)
  .then(console.log("Connected to database")!);

import app from "./app";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
