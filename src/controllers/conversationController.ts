import Conversation from "../models/conversationModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { createOne } from "./factoryHandler";
import { IConversation } from "../types/modelTypes";

export const getOneConversation = catchAsync(async (req, res, next) => {
  const query = Conversation.findOne({
    memberOneId: req.params.memberOneId,
    memberTwoId: req.params.memberTwoId,
  });

  query.populate("memberOneId memberTwoId");

  const conversation = await query;

  if (!conversation) {
    return next(new AppError("No conversation found with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: conversation,
    },
  });
});

export const createConversation = createOne<IConversation>(Conversation);
