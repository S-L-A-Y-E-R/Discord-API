import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} from "./factoryHandler";
import Server from "../models/serverModel";
import { IServer } from "../types/modelTypes";

export const getAllServers = getAll<IServer>(Server);

export const getServer = getOne<IServer>(Server);

export const createServer = createOne<IServer>(Server);

export const updateServer = updateOne<IServer>(Server);

export const deleteServer = deleteOne<IServer>(Server);
