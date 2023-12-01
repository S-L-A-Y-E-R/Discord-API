import express from "express";
import {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController";

const router = express.Router();

router.route("/").post(createMessage).get(getMessages);

router.route("/:id").patch(updateMessage).delete(deleteMessage);

export default router;
