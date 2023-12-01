"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: "config.env" });
const app_1 = require("./app");
mongoose_1.default
    .connect(process.env.DATABASE)
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Error connecting to the database:", err));
const port = process.env.PORT || 3000;
app_1.server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    app_1.server.close(() => process.exit(1));
});
