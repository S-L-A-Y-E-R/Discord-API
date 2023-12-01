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
exports.getDirectMessages = exports.deleteDirectMessage = exports.updateDirectMessage = exports.createDirectMessage = void 0;
const directMessageModel_1 = __importDefault(require("../models/directMessageModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
exports.createDirectMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = yield (yield directMessageModel_1.default.create(req.body)).populate("memberId");
    const channelKey = `chat:${req.body.conversationId}:messages`;
    req.io.emit(channelKey, newMessage);
    res.status(201).json({
        status: "success",
        data: {
            data: newMessage,
        },
    });
}));
exports.updateDirectMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield directMessageModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    const updateKey = `chat:${message === null || message === void 0 ? void 0 : message.conversationId}:messages:update`;
    req.io.emit(updateKey, message);
    res.status(200).json({
        status: "success",
        data: {
            data: message,
        },
    });
}));
exports.deleteDirectMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield directMessageModel_1.default.findByIdAndUpdate(req.params.id, {
        deleted: true,
        content: "This message has been deleted",
        fileUrl: "",
    }, { new: true });
    const updateKey = `chat:${message === null || message === void 0 ? void 0 : message.conversationId}:messages:update`;
    req.io.emit(updateKey, message);
    res.status(200).json({
        status: "success",
        data: {
            data: message,
        },
    });
}));
const getDirectMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { conversationId, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (conversationId) {
        filter.conversationId = conversationId;
    }
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { createdAt: -1 },
    };
    try {
        const messages = yield directMessageModel_1.default.paginate(filter, options);
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
exports.getDirectMessages = getDirectMessages;
