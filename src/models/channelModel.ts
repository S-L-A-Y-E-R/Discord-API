import { model, Schema, Model } from "mongoose";
import { IChannel } from "../types/modelTypes";

const channelSchema = new Schema({
  serverId: {
    type: Schema.ObjectId,
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
    type: Schema.ObjectId,
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

const Channel: Model<IChannel> = model<IChannel>("Channel", channelSchema);

export default Channel;
