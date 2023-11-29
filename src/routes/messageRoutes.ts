import express from "express";
import {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} from "../controllers/directMessagesController";

const router = express.Router();

router.route("/socket-direct").post(createMessage);

router.route("/socket-direct/:id").patch(updateMessage).delete(deleteMessage);

router.route("/").get(getMessages);

export default router;
