"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator = require("validator");
const profileSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        validator: [validator.isEmail, "Please provide a valid email"],
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
profileSchema.pre(/^findOneAndUpdate/, function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});
const Profile = (0, mongoose_1.model)("Profile", profileSchema);
exports.default = Profile;
