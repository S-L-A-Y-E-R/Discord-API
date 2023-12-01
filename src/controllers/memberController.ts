import { Request, Response, NextFunction } from "express";
import Member from "../models/memberModel";
import { getOne, deleteOne, updateOne, createOne } from "./factoryHandler";
import { IMember } from "../types/modelTypes";
import catchAsync from "../utils/catchAsync";

export const getAllMembers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { serverId, profileId, role } = req.query;

    const filter: { [key: string]: any } = {};

    if (role) {
      filter.role = role;
    }

    if (profileId) {
      filter.profileId = profileId;
    }

    if (serverId) {
      filter.serverId = serverId;
    }

    let members = await Member.find();
    members = members.filter((member: any) => {
      for (const key in filter) {
        if (member[key].toString() !== filter[key]) {
          return false;
        }
      }
      return true;
    });

    res.status(200).json({
      status: "success",
      results: members.length,
      data: members,
    });
  }
);

export const getMember = getOne<IMember>(Member);

export const deleteMember = deleteOne<IMember>(Member);

export const updateMember = updateOne<IMember>(Member);

export const createMember = createOne<IMember>(Member);
