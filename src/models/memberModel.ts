import { Schema, model, Model } from "mongoose";
import { IMember } from "../types/modelTypes";

const memberSchema = new Schema({
  serverId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Server",
    },
  ],
  profileId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
  role: {
    type: String,
    enum: ["admin", "moderator", "guuest"],
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

const Member: Model<IMember> = model<IMember>("Member", memberSchema);

export default Member;
