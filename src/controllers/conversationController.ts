import { NextFunction, Request, Response } from "express";
import Conversation from "../models/conversationModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const getOneConversation = catchAsync(async (req, res, next) => {
  let conversation = await Conversation.findOne({
    memberOneId: req.params.memberOneId,
    memberTwoId: req.params.memberTwoId,
  }).populate("memberOneId memberTwoId");

  if (!conversation) {
    conversation = await Conversation.findOne({
      memberOneId: req.params.memberTwoId,
      memberTwoId: req.params.memberOneId,
    }).populate("memberOneId memberTwoId");
  }

  if (!conversation) {
    return next(new AppError("No conversation found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: conversation,
    },
  });
});

export const createConversation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.memberOneId === req.body.memberTwoId) {
      return next(
        new AppError("You can't create a conversation with yourself", 400)
      );
    }

    const conversationSampleOne = await Conversation.findOne({
      memberOneId: req.body.memberOneId,
      memberTwoId: req.body.memberTwoId,
    });

    if (conversationSampleOne) {
      return res.status(200).json({
        status: "success",
        data: {
          data: conversationSampleOne,
        },
      });
    }

    const conversationSampleTwo = await Conversation.findOne({
      memberOneId: req.body.memberTwoId,
      memberTwoId: req.body.memberOneId,
    });

    if (conversationSampleTwo) {
      return res.status(200).json({
        status: "success",
        data: {
          data: conversationSampleTwo,
        },
      });
    }

    const newConversation = await (
      await Conversation.create(req.body)
    ).populate("memberOneId memberTwoId");

    res.status(201).json({
      status: "success",
      data: {
        data: newConversation,
      },
    });
  }
);
