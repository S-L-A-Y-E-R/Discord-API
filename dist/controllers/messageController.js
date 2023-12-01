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
exports.getMessages = exports.deleteMessage = exports.updateMessage = exports.createMessage = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
exports.createMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = yield (yield messageModel_1.default.create(req.body)).populate("memberId");
    const channelKey = `chat:${req.body.channelId}:messages`;
    req.io.emit(channelKey, newMessage);
    res.status(201).json({
        status: "success",
        data: {
            data: newMessage,
        },
    });
}));
exports.updateMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield messageModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    const updateKey = `chat:${message === null || message === void 0 ? void 0 : message.channelId}:messages:update`;
    req.io.emit(updateKey, message);
    res.status(200).json({
        status: "success",
        data: {
            data: message,
        },
    });
}));
exports.deleteMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield messageModel_1.default.findByIdAndUpdate(req.params.id, { deleted: true, content: "This message has been deleted" }, { new: true });
    const updateKey = `chat:${message === null || message === void 0 ? void 0 : message.channelId}:messages:update`;
    req.io.emit(updateKey, message);
    res.status(200).json({
        status: "success",
        data: {
            data: message,
        },
    });
}));
const getMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { channelId, memberId, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (channelId) {
        filter.channelId = channelId;
    }
    if (memberId) {
        filter.memberId = memberId;
    }
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { createdAt: -1 },
    };
    try {
        const messages = yield messageModel_1.default.paginate(filter, options);
        res.status(200).json({
            status: "success",
            page: req.query.page,
            results: messages.totalDocs,
            data: {
                data: messages.docs,
            },
        });
    }
    catch (err) {
        next(new appError_1.default("Something went wrong", 400));
    }
});
exports.getMessages = getMessages;
