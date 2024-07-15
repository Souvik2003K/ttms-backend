import express from "express";
import {
  addToolsController,
  getToolsBySerialNoController,
  getToolsController,
  getToolsNameController,
  getToolsPhotoController,
  getToolsSerialController,
  toolCountController,
  toolListController,
  updateStatusController,
} from "../controller/toolsController.js";

const router = express.Router();

router.post("/addTools", addToolsController);
router.get("/getTools", getToolsController);
router.get("/getTools/:serial", getToolsBySerialNoController);
router.get("/getToolsSerialNo/:name", getToolsSerialController);
router.get("/getToolsName", getToolsNameController);
router.get("/getToolsPhoto/:tid", getToolsPhotoController);
router.get("/tools-list/:page", toolListController);
router.get("/count", toolCountController);
router.put("/updateStatus/:serial", updateStatusController);

export default router;
