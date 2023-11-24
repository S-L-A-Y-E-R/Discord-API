import {
  getOne,
  getAll,
  updateOne,
  deleteOne,
  createOne,
} from "./factoryHandler";
import Profile from "../models/profileModel";
import { IProfile } from "../types/modelTypes";

export const getAllProfiles = getAll<IProfile>(Profile);

export const getProfile = getOne<IProfile>(Profile);

export const createProfile = createOne<IProfile>(Profile);

export const updateProfile = updateOne<IProfile>(Profile);

export const deleteProfile = deleteOne<IProfile>(Profile);
