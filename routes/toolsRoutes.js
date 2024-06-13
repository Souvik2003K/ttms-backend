import express from "express";
import {
  addToolsController,
  getToolsController,
  getToolsPhotoController,
} from "../controller/toolsController.js";

const router = express.Router();

router.post("/addTools", addToolsController);
router.get("/getTools", getToolsController);
router.get("/getToolsPhoto/:tid", getToolsPhotoController);

export default router;
