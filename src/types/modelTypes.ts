import { Document } from "mongoose";

export interface IProfile extends Document {
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IServer extends Document {
  name: string;
  imageUrl: string;
  inviteCode: string;
  profileId: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IChannel extends Document {
  serverId: string[];
  name: string;
  type: string;
  profileId: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMember extends Document {
  serverId: string[];
  profileId: string[];
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
