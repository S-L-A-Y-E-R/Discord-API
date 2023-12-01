"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const messageSchema = new mongoose_1.Schema({
    content: {
        type: String,
        trim: true,
    },
    fileUrl: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    memberId: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Member",
    },
    channelId: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Channel",
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
messageSchema.pre(/^findOneAndUpdate/, function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});
messageSchema.pre(/^find/, function (next) {
    this.populate({
        path: "memberId",
    });
    next();
});
messageSchema.plugin(mongoose_paginate_v2_1.default);
const Message = (0, mongoose_1.model)("Message", messageSchema);
exports.default = Message;
