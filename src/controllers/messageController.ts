import { NextFunction, Request, Response } from "express";
import Message from "../models/messageModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const createMessage = catchAsync(async (req: any, res, next) => {
  const newMessage = await (
    await Message.create(req.body)
  ).populate("memberId");

  const channelKey = `chat:${req.body.channelId}:messages`;

  req.io.emit(channelKey, newMessage);

  res.status(201).json({
    status: "success",
    data: {
      data: newMessage,
    },
  });
});

export const updateMessage = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const updateKey = `chat:${message?.channelId}:messages:update`;

    req.io.emit(updateKey, message);

    res.status(200).json({
      status: "success",
      data: {
        data: message,
      },
    });
  }
);

export const deleteMessage = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { deleted: true, content: "This message has been deleted" },
      { new: true }
    );

    const updateKey = `chat:${message?.channelId}:messages:update`;

    req.io.emit(updateKey, message);

    res.status(200).json({
      status: "success",
      data: {
        data: message,
      },
    });
  }
);

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { channelId, memberId, page = 1, limit = 10 } = req.query;

  const filter: { [key: string]: any } = {};

  if (channelId) {
    filter.channelId = channelId;
  }

  if (memberId) {
    filter.memberId = memberId;
  }

  const options = {
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10),
    sort: { createdAt: -1 },
  };

  try {
    const messages = await Message.paginate(filter, options);

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
