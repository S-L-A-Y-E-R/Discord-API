import { v4 as uuidv4 } from "uuid";
import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} from "./factoryHandler";
import Server from "../models/serverModel";
import Channel from "../models/channelModel";
import Member from "../models/memberModel";
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

  await Channel.deleteMany({ serverId: server._id });

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
