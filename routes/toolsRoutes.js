import express from "express";
import { addToolsController } from "../controller/toolsController.js";

const router = express.Router();

router.post("/addTools", addToolsController);

export default router;
