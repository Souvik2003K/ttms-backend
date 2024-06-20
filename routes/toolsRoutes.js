import express from "express";
import {
  addToolsController,
  getToolsController,
  getToolsPhotoController,
  toolCountController,
  toolListController,
} from "../controller/toolsController.js";

const router = express.Router();

router.post("/addTools", addToolsController);
router.get("/getTools", getToolsController);
router.get("/getToolsPhoto/:tid", getToolsPhotoController);
router.get("/tools-list/:page", toolListController);
router.get("/count", toolCountController);

export default router;
