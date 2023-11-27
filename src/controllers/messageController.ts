import Message from "../models/messageModel";
import catchAsync from "../utils/catchAsync";

export const createMessage = catchAsync(async (req: any, res, next) => {
  const newMessage = await Message.create(req.body);

  const channelKey = `chat:${req.body.channelId}:messages`;

  req.io.emit(channelKey, newMessage);

  res.status(201).json({
    status: "success",
    data: {
      data: newMessage,
    },
  });
});
