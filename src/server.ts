import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "config.env" });

import { server } from "./app";

mongoose
  .connect(process.env.DATABASE!)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database:", err));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
