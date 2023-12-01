import { Schema, model, Model } from "mongoose";
import { IMember } from "../types/modelTypes";

const memberSchema = new Schema({
  serverId: {
    type: Schema.ObjectId,
    ref: "Server",
  },
  profileId: {
    type: Schema.ObjectId,
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

memberSchema.pre(/^find/, function (this: any, next) {
  this.populate({
    path: "profileId",
  });
  next();
});

const Member: Model<IMember> = model<IMember>("Member", memberSchema);

export default Member;
