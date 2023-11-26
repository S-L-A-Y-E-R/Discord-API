import Channel from "../models/channelModel";
import {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  createOne,
} from "./factoryHandler";

export const getAllChannels = getAll(Channel);

export const getChannel = getOne(Channel);

export const deleteChannel = deleteOne(Channel);

export const updateChannel = updateOne(Channel);

export const createChannel = createOne(Channel);
