import { model, PopulatedDoc, Query, Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IDirectMessage, IDirectMessageModel } from "../types/modelTypes";

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

directMessageSchema.pre(
  /^find/,
  function (
    this: Query<
      PopulatedDoc<Document<IDirectMessage>>,
      Document<IDirectMessage>
    >,
    next
  ) {
    this.populate({
      path: "memberId",
    });
    next();
  }
);

directMessageSchema.pre(/^findOneAndUpdate/, function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

directMessageSchema.plugin(mongoosePaginate);

const DirectMessage = model<IDirectMessage, IDirectMessageModel>(
  "DirectMessage",
  directMessageSchema
);

export default DirectMessage;
