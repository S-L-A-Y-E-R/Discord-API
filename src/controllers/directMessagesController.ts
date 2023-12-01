import { NextFunction, Request, Response } from "express";
import DirectMessage from "../models/directMessageModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const createDirectMessage = catchAsync(async (req: any, res, next) => {
  const newMessage = await (
    await DirectMessage.create(req.body)
  ).populate("memberId");

  const channelKey = `chat:${req.body.conversationId}:messages`;

  req.io.emit(channelKey, newMessage);

  res.status(201).json({
    status: "success",
    data: {
      data: newMessage,
    },
  });
});

export const updateDirectMessage = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const message = await DirectMessage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    const updateKey = `chat:${message?.conversationId}:messages:update`;

    req.io.emit(updateKey, message);

    res.status(200).json({
      status: "success",
      data: {
        data: message,
      },
    });
  }
);

export const deleteDirectMessage = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const message = await DirectMessage.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        content: "This message has been deleted",
        fileUrl: "",
      },
      { new: true }
    );

    const updateKey = `chat:${message?.conversationId}:messages:update`;

    req.io.emit(updateKey, message);

    res.status(200).json({
      status: "success",
      data: {
        data: message,
      },
    });
  }
);

export const getDirectMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { conversationId, page = 1, limit = 10 } = req.query;

  const filter: { [key: string]: any } = {};

  if (conversationId) {
    filter.conversationId = conversationId;
  }

  const options = {
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10),
    sort: { createdAt: -1 },
  };

  try {
    const messages = await DirectMessage.paginate(filter, options);

    res.status(200).json({
      status: "success",
      page: req.query.page,
      results: messages.totalDocs,
      data: {
        data: messages.docs,
      },
    });
  } catch (err) {
    next(new AppError("Something went wrong", 400));
  }
};
