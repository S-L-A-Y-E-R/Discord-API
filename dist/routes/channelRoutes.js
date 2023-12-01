"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const channelController_1 = require("../controllers/channelController");
const router = express_1.default.Router();
router.route("/").get(channelController_1.getAllChannels).post(channelController_1.createChannel);
router.route("/:id").get(channelController_1.getChannel).patch(channelController_1.updateChannel).delete(channelController_1.deleteChannel);
exports.default = router;
