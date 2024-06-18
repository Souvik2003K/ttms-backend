import express from "express";
import {
  addToolsController,
  getToolsController,
  getToolsPhotoController,
  productListController,
} from "../controller/toolsController.js";

const router = express.Router();

router.post("/addTools", addToolsController);
router.get("/getTools", getToolsController);
router.get("/getToolsPhoto/:tid", getToolsPhotoController);
router.get("/tools-list/:page", productListController);

export default router;
