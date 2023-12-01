"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverController_1 = require("../controllers/serverController");
const memberRoutes_1 = __importDefault(require("./memberRoutes"));
const router = express_1.default.Router();
router.route("/:id/invite-code").patch(serverController_1.regenerateInviteCode);
router.use("/:serverId/members", memberRoutes_1.default);
router.route("/").get(serverController_1.getAllServers).post(serverController_1.createServer);
router.route("/:id").get(serverController_1.getServer).patch(serverController_1.updateServer).delete(serverController_1.deleteServer);
exports.default = router;
