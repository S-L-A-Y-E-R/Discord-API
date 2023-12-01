"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
router.route("/").post(messageController_1.createMessage).get(messageController_1.getMessages);
router.route("/:id").patch(messageController_1.updateMessage).delete(messageController_1.deleteMessage);
exports.default = router;
