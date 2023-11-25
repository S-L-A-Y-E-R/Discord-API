import Member from "../models/memberModel";
import {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  createOne,
} from "./factoryHandler";
import { IMember } from "../types/modelTypes";

export const getAllMembers = getAll<IMember>(Member);

export const getMember = getOne<IMember>(Member);

export const deleteMember = deleteOne<IMember>(Member);

export const updateMember = updateOne<IMember>(Member);

export const createMember = createOne<IMember>(Member);
