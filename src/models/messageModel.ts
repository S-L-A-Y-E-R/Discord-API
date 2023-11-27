import { Model, Schema, model } from "mongoose";
import { IMessage } from "../types/modelTypes";

const messageSchema = new Schema({
  content: {
    type: String,
    trim: true,
  },
  fileUrl: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  memberId: {
    type: Schema.ObjectId,
    ref: "Member",
  },
  channelId: {
    type: Schema.ObjectId,
    ref: "Channel",
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

messageSchema.pre(/^findOneAndUpdate/, function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Message: Model<IMessage> = model<IMessage>("Message", messageSchema);

export default Message;
