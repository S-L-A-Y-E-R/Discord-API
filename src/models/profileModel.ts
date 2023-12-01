import { Schema, model, Model } from "mongoose";
const validator = require("validator");
import { IProfile } from "../types/modelTypes";

const profileSchema = new Schema({
  userId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

profileSchema.pre(/^findOneAndUpdate/, function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Profile: Model<IProfile> = model<IProfile>("Profile", profileSchema);

export default Profile;
