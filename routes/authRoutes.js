import express from "express";
import {
  loginController,
  registerController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", requireSignIn, isAdmin, registerController);
router.post("/login", loginController);

export default router;
