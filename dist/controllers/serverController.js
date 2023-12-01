"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regenerateInviteCode = exports.deleteServer = exports.updateServer = exports.createServer = exports.getServer = exports.getAllServers = void 0;
const uuid_1 = require("uuid");
const factoryHandler_1 = require("./factoryHandler");
const serverModel_1 = __importDefault(require("../models/serverModel"));
const channelModel_1 = __importDefault(require("../models/channelModel"));
const memberModel_1 = __importDefault(require("../models/memberModel"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
exports.getAllServers = (0, factoryHandler_1.getAll)(serverModel_1.default);
exports.getServer = (0, factoryHandler_1.getOne)(serverModel_1.default);
exports.createServer = (0, factoryHandler_1.createOne)(serverModel_1.default);
exports.updateServer = (0, factoryHandler_1.updateOne)(serverModel_1.default);
exports.deleteServer = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const server = yield serverModel_1.default.findById(req.params.id);
    if (!server) {
        return next(new appError_1.default("No server found with that ID", 404));
    }
    const channels = yield channelModel_1.default.find({ serverId: server._id });
    channels.forEach((channel) => __awaiter(void 0, void 0, void 0, function* () {
        yield messageModel_1.default.findOneAndDelete({ channelId: channel._id });
        yield channelModel_1.default.findOneAndDelete({ _id: channel._id });
    }));
    yield memberModel_1.default.deleteMany({ serverId: server._id });
    yield serverModel_1.default.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
}));
exports.regenerateInviteCode = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const server = yield serverModel_1.default.findById(req.params.id);
    if (!server) {
        return next(new appError_1.default("No server found with that ID", 404));
    }
    server.inviteCode = (0, uuid_1.v4)();
    yield server.save({ validateBeforeSave: false });
    res.status(200).json({
        status: "success",
        data: server,
    });
}));
