import { model, Schema, Model } from "mongoose";
import { IDirectMessage } from "../types/modelTypes";

const directMessageSchema = new Schema({
  content: {
    type: String,
    trim: true,
  },
  fileUrl: {
    type: String,
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
  deleted: {
    type: Boolean,
    default: false,
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

directMessageSchema.pre(/^findOneAndUpdate/, function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const DirectMessage: Model<IDirectMessage> = model<IDirectMessage>(
  "DirectMessage",
  directMessageSchema
);

export default DirectMessage;
