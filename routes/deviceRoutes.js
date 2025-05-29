import express from "express";
import {
  allocateController,
  createDeviceController,
  getDeviceController,
  updateDeviceController,
} from "../controller/deviceController.js";

const router = express.Router();

router.post("/createDevice", createDeviceController);
router.get("/getDevice", getDeviceController);
router.post("/allocate", allocateController);
router.post("/updateDevice", updateDeviceController);

export default router;
