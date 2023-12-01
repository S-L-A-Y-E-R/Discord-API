"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const directMessagesController_1 = require("../controllers/directMessagesController");
const router = express_1.default.Router();
router.route("/").post(directMessagesController_1.createDirectMessage).get(directMessagesController_1.getDirectMessages);
router.route("/:id").patch(directMessagesController_1.updateDirectMessage).delete(directMessagesController_1.deleteDirectMessage);
exports.default = router;
