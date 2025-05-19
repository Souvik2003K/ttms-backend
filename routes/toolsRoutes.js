import express from "express";
import {
  addToolsController,
  bulkAuditController,
  getToolsBySerialNoController,
  getToolsController,
  getToolsNameController,
  getToolsPhotoController,
  getToolsSerialController,
  toolAllocateController,
  toolCountController,
  toolHandoverController,
  toolListController,
  toolsAllocationHistoryController,
  updateCalliberationController,
  updateStatusController,
} from "../controller/toolsController.js";
import multer from "multer";

const router = express.Router();

// Set up multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/addTools", upload.single("photo"), addToolsController);
router.get("/getTools", getToolsController);
router.get("/getTools/:serial", getToolsBySerialNoController);
router.get("/getToolsSerialNo/:name", getToolsSerialController);
router.get("/getToolsAudit", getToolsNameController); // will used for name
router.get("/getToolsPhoto/:tid", getToolsPhotoController);
router.get("/tools-list/:page", toolListController);
router.get("/count", toolCountController);
router.get("/allocationHistory", toolsAllocationHistoryController);
router.put("/updateStatus/:serial", updateStatusController);
router.put("/calliberated/:serial", updateCalliberationController);
router.put("/allocation", toolAllocateController);
router.post("/handover", toolHandoverController);
router.put("/bulkAudit", bulkAuditController);

export default router;
