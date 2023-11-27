import express from "express";
import {
  createConversation,
  getOneConversation,
} from "../controllers/conversationController";

const router = express.Router();

router.route("/").post(createConversation);

router.route("/:memberOneId/:memberTwoId").get(getOneConversation);

export default router;
