import mongoose, { Model, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IServer } from "../types/modelTypes";
import Channel from "./channelModel";
import Member from "./memberModel";

const serverSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    inviteCode: {
      type: String,
    },
    profileId: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

serverSchema.virtual("members", {
  ref: "Member",
  localField: "_id",
  foreignField: "serverId",
});

serverSchema.pre(/^findOneAndUpdate/, function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

serverSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
  }
  this.inviteCode = uuidv4();
  next();
});

serverSchema.post("save", async function (doc) {
  const channel = Channel.create({
    serverId: doc._id,
    name: "general",
    type: "text",
    profileId: doc.profileId,
  });
  const member = Member.create({
    serverId: doc._id,
    profileId: doc.profileId,
    role: "admin",
  });
  await Promise.all([channel, member]);
});

const Server: Model<IServer> = model<IServer>("Server", serverSchema);

export default Server;
