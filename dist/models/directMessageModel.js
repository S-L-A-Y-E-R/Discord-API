"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const directMessageSchema = new mongoose_1.Schema({
    content: {
        type: String,
        trim: true,
    },
    fileUrl: {
        type: String,
    },
    memberId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Member",
    },
    conversationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Conversation",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
directMessageSchema.pre(/^find/, function (next) {
    this.populate({
        path: "memberId",
    });
    next();
});
directMessageSchema.pre(/^findOneAndUpdate/, function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});
directMessageSchema.plugin(mongoose_paginate_v2_1.default);
const DirectMessage = (0, mongoose_1.model)("DirectMessage", directMessageSchema);
exports.default = DirectMessage;
