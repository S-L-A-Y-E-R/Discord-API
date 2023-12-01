import express from "express";
import {
  createDirectMessage,
  getDirectMessages,
  updateDirectMessage,
  deleteDirectMessage,
} from "../controllers/directMessagesController";

const router = express.Router();

router.route("/").post(createDirectMessage).get(getDirectMessages);

router.route("/:id").patch(updateDirectMessage).delete(deleteDirectMessage);

export default router;
