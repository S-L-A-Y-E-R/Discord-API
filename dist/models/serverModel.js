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
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const channelModel_1 = __importDefault(require("./channelModel"));
const memberModel_1 = __importDefault(require("./memberModel"));
const serverSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
    },
    inviteCode: {
        type: String,
        unique: true,
    },
    profileId: [
        {
            type: mongoose_1.Schema.ObjectId,
            ref: "Profile",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
serverSchema.virtual("members", {
    ref: "Member",
    localField: "_id",
    foreignField: "serverId",
});
serverSchema.virtual("channels", {
    ref: "Channel",
    localField: "_id",
    foreignField: "serverId",
});
serverSchema.pre(/^find/, function (next) {
    this.populate({
        path: "members",
        options: { sort: { role: 1 } },
    }).populate({
        path: "channels",
        options: { sort: { createdAt: 1 } },
    });
    next();
});
serverSchema.pre(/^findOneAndUpdate/, function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});
serverSchema.pre("save", function (next) {
    if (!this.isNew) {
        next();
    }
    this.inviteCode = (0, uuid_1.v4)();
    next();
});
serverSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const channel = channelModel_1.default.create({
            serverId: doc._id,
            name: "general",
            type: "text",
            profileId: doc.profileId,
        });
        const member = memberModel_1.default.create({
            serverId: doc._id,
            profileId: doc.profileId,
            role: "admin",
        });
        yield Promise.all([channel, member]);
    });
});
const Server = (0, mongoose_1.model)("Server", serverSchema);
exports.default = Server;
