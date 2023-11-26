import express from "express";
import {
  getAllChannels,
  getChannel,
  createChannel,
  deleteChannel,
  updateChannel,
} from "../controllers/channelController";

const router = express.Router();

router.route("/").get(getAllChannels).post(createChannel);

router.route("/:id").get(getChannel).patch(updateChannel).delete(deleteChannel);

export default router;
