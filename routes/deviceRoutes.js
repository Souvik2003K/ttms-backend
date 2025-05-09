import express from "express";
import { createDeviceController } from "../controller/deviceController.js";

const router = express.Router();

router.post("/createDevice", createDeviceController);

export default router;
