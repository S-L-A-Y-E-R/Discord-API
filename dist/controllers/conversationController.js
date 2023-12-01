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
exports.createConversation = exports.getOneConversation = void 0;
const conversationModel_1 = __importDefault(require("../models/conversationModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
exports.getOneConversation = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let conversation = yield conversationModel_1.default.findOne({
        memberOneId: req.params.memberOneId,
        memberTwoId: req.params.memberTwoId,
    }).populate("memberOneId memberTwoId");
    if (!conversation) {
        conversation = yield conversationModel_1.default.findOne({
            memberOneId: req.params.memberTwoId,
            memberTwoId: req.params.memberOneId,
        }).populate("memberOneId memberTwoId");
    }
    if (!conversation) {
        return next(new appError_1.default("No conversation found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            data: conversation,
        },
    });
}));
exports.createConversation = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.memberOneId === req.body.memberTwoId) {
        return next(new appError_1.default("You can't create a conversation with yourself", 400));
    }
    const conversationSampleOne = yield conversationModel_1.default.findOne({
        memberOneId: req.body.memberOneId,
        memberTwoId: req.body.memberTwoId,
    });
    if (conversationSampleOne) {
        return res.status(200).json({
            status: "success",
            data: {
                data: conversationSampleOne,
            },
        });
    }
    const conversationSampleTwo = yield conversationModel_1.default.findOne({
        memberOneId: req.body.memberTwoId,
        memberTwoId: req.body.memberOneId,
    });
    if (conversationSampleTwo) {
        return res.status(200).json({
            status: "success",
            data: {
                data: conversationSampleTwo,
            },
        });
    }
    const newConversation = yield (yield conversationModel_1.default.create(req.body)).populate("memberOneId memberTwoId");
    res.status(201).json({
        status: "success",
        data: {
            data: newConversation,
        },
    });
}));
