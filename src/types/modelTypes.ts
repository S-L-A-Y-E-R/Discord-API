import { Document, Model } from "mongoose";

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

export interface IMessage extends Document {
  content: string;
  fileUrl: string;
  deleted: boolean;
  memberId: string[];
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageModel extends Model<IMessage> {
  paginate(query?: any, options?: any, callback?: any): Promise<any>;
}

export interface IConversation extends Document {
  memberOneId: string;
  memberTwoId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDirectMessage extends Document {
  content: string;
  fileUrl: string;
  memberId: string[];
  conversationId: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDirectMessageModel extends Model<IDirectMessage> {
  paginate(query?: any, options?: any, callback?: any): Promise<any>;
}
