"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.createProfile = exports.getProfile = exports.getAllProfiles = void 0;
const factoryHandler_1 = require("./factoryHandler");
const profileModel_1 = __importDefault(require("../models/profileModel"));
exports.getAllProfiles = (0, factoryHandler_1.getAll)(profileModel_1.default);
exports.getProfile = (0, factoryHandler_1.getOne)(profileModel_1.default);
exports.createProfile = (0, factoryHandler_1.createOne)(profileModel_1.default);
exports.updateProfile = (0, factoryHandler_1.updateOne)(profileModel_1.default);
exports.deleteProfile = (0, factoryHandler_1.deleteOne)(profileModel_1.default);
