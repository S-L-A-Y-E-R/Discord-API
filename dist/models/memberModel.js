"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    serverId: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Server",
    },
    profileId: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Profile",
    },
    role: {
        type: String,
        enum: ["admin", "moderator", "guest"],
        default: "guest",
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
memberSchema.pre(/^findOneAndUpdate/, function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});
memberSchema.pre(/^find/, function (next) {
    this.populate({
        path: "profileId",
    });
    next();
});
const Member = (0, mongoose_1.model)("Member", memberSchema);
exports.default = Member;
