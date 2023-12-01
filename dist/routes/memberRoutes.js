"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberController_1 = require("../controllers/memberController");
const router = express_1.default.Router({ mergeParams: true });
router.route("/").get(memberController_1.getAllMembers).post(memberController_1.createMember);
router.route("/:id").get(memberController_1.getMember).patch(memberController_1.updateMember).delete(memberController_1.deleteMember);
exports.default = router;
