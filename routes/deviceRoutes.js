import express from "express";
import {
  allocateController,
  createDeviceController,
  getDeviceController,
} from "../controller/deviceController.js";

const router = express.Router();

router.post("/createDevice", createDeviceController);
router.get("/getDevice", getDeviceController);
router.post("/allocate", allocateController);

export default router;
