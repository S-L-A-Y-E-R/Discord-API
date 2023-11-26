import express from "express";
import {
  getAllMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/memberController";

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllMembers).post(createMember);

router.route("/:id").get(getMember).patch(updateMember).delete(deleteMember);

export default router;
