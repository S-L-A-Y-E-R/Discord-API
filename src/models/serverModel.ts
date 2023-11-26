import mongoose, {
  Model,
  PopulatedDoc,
  Query,
  Schema,
  model,
  Document,
} from "mongoose";
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
      unique: true,
    },
    profileId: [
      {
        type: Schema.ObjectId,
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

serverSchema.virtual("channels", {
  ref: "Channel",
  localField: "_id",
  foreignField: "serverId",
});

serverSchema.pre(
  /^find/,
  function (
    this: Query<PopulatedDoc<Document<IServer>>, Document<IServer>>,
    next
  ) {
    this.populate({
      path: "members",
      options: { sort: { role: -1 } },
    }).populate({
      path: "channels",
      options: { sort: { createdAt: -1 } },
    });
    next();
  }
);

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
