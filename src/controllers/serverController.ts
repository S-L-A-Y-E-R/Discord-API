import { v4 as uuidv4 } from "uuid";
import { getAll, getOne, updateOne, createOne } from "./factoryHandler";
import Server from "../models/serverModel";
import Channel from "../models/channelModel";
import Member from "../models/memberModel";
import Message from "../models/messageModel";
import { IServer } from "../types/modelTypes";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const getAllServers = getAll<IServer>(Server);

export const getServer = getOne<IServer>(Server);

export const createServer = createOne<IServer>(Server);

export const updateServer = updateOne<IServer>(Server);

export const deleteServer = catchAsync(async (req, res, next) => {
  const server = await Server.findById(req.params.id);

  if (!server) {
    return next(new AppError("No server found with that ID", 404));
  }

  const channels = await Channel.find({ serverId: server._id });

  channels.forEach(async (channel) => {
    await Message.findOneAndDelete({ channelId: channel._id });
    await Channel.findOneAndDelete({ _id: channel._id });
  });

  await Member.deleteMany({ serverId: server._id });

  await Server.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const regenerateInviteCode = catchAsync(async (req, res, next) => {
  const server = await Server.findById(req.params.id);
  if (!server) {
    return next(new AppError("No server found with that ID", 404));
  }
  server.inviteCode = uuidv4();
  await server.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    data: server,
  });
});
