import express from "express";
import {
  getProfile,
  updateProfile,
  deleteProfile,
  getAllProfiles,
  createProfile,
} from "../controllers/profileController";

const router = express.Router();

router.route("/").get(getAllProfiles).post(createProfile);

router.route("/:id").get(getProfile).patch(updateProfile).delete(deleteProfile);

export default router;
