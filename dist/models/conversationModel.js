"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    memberOneId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Member",
    },
    memberTwoId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Member",
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
conversationSchema.pre(/^findOneAndUpdate/, function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});
const Conversation = (0, mongoose_1.model)("Conversation", conversationSchema);
exports.default = Conversation;
