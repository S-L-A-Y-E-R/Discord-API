"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = require("../controllers/profileController");
const router = express_1.default.Router();
router.route("/").get(profileController_1.getAllProfiles).post(profileController_1.createProfile);
router.route("/:id").get(profileController_1.getProfile).patch(profileController_1.updateProfile).delete(profileController_1.deleteProfile);
exports.default = router;
