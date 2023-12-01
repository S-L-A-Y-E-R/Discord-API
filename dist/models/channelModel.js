"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const channelSchema = new mongoose_1.Schema({
    serverId: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Server",
    },
    name: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        enum: ["text", "voice", "video"],
    },
    profileId: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Profile",
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
channelSchema.pre(/^findOneAndUpdate/, function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});
const Channel = (0, mongoose_1.model)("Channel", channelSchema);
exports.default = Channel;
