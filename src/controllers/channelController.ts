import Channel from "../models/channelModel";
import { IChannel } from "../types/modelTypes";
import {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  createOne,
} from "./factoryHandler";

export const getAllChannels = getAll<IChannel>(Channel);

export const getChannel = getOne<IChannel>(Channel);

export const deleteChannel = deleteOne<IChannel>(Channel);

export const updateChannel = updateOne<IChannel>(Channel);

export const createChannel = createOne<IChannel>(Channel);
