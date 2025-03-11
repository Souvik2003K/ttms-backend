import express from "express";
import {
  logsController,
  readLogsController,
} from "../controller/userLogsController.js";

const router = express.Router();

router.post("/createLogs", logsController);
router.get("/readLogs", readLogsController);

export default router;
