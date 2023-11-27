import { model, Schema, Model } from "mongoose";
import { IConversation } from "../types/modelTypes";

const conversationSchema = new Schema({
  memberOneId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
  },
  memberTwoId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
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

conversationSchema.pre(/^findOneAndUpdate/, function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Conversation: Model<IConversation> = model<IConversation>(
  "Conversation",
  conversationSchema
);

export default Conversation;
