"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChannel = exports.updateChannel = exports.deleteChannel = exports.getChannel = exports.getAllChannels = void 0;
const channelModel_1 = __importDefault(require("../models/channelModel"));
const factoryHandler_1 = require("./factoryHandler");
exports.getAllChannels = (0, factoryHandler_1.getAll)(channelModel_1.default);
exports.getChannel = (0, factoryHandler_1.getOne)(channelModel_1.default);
exports.deleteChannel = (0, factoryHandler_1.deleteOne)(channelModel_1.default);
exports.updateChannel = (0, factoryHandler_1.updateOne)(channelModel_1.default);
exports.createChannel = (0, factoryHandler_1.createOne)(channelModel_1.default);
