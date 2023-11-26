import express from "express";
import {
  getServer,
  updateServer,
  deleteServer,
  getAllServers,
  createServer,
  regenerateInviteCode,
} from "../controllers/serverController";
import memberRouter from "./memberRoutes";

const router = express.Router();

router.route("/:id/invite-code").patch(regenerateInviteCode);

router.use("/:serverId/members", memberRouter);

router.route("/").get(getAllServers).post(createServer);

router.route("/:id").get(getServer).patch(updateServer).delete(deleteServer);

export default router;
