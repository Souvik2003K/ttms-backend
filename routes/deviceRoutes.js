import express from "express";
import {
  createDeviceController,
  getDeviceController,
} from "../controller/deviceController.js";

const router = express.Router();

router.post("/createDevice", createDeviceController);
router.get("/getDevice", getDeviceController);

export default router;
