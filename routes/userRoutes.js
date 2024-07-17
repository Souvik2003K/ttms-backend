import express from "express";
import { getUsersController } from "../controller/userController.js";

const router = express.Router();

router.get("/getUsers", getUsersController);

export default router;
