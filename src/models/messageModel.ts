import { Schema, model, Document, Query, PopulatedDoc } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IMessage, IMessageModel } from "../types/modelTypes";

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

messageSchema.pre(
  /^find/,
  function (
    this: Query<PopulatedDoc<Document<IMessage>>, Document<IMessage>>,
    next
  ) {
    this.populate({
      path: "memberId",
    });
    next();
  }
);

messageSchema.plugin(mongoosePaginate);

const Message = model<IMessage, IMessageModel>("Message", messageSchema);

export default Message;
