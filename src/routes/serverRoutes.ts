import express from "express";
import {
  getServer,
  updateServer,
  deleteServer,
  getAllServers,
  createServer,
} from "../controllers/serverController";

const router = express.Router();

router.route("/").get(getAllServers).post(createServer);

router.route("/:id").get(getServer).patch(updateServer).delete(deleteServer);

export default router;
