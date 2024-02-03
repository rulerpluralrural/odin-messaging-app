import express from "express";
const router = express.Router();

import userController from "../controllers/user_controllers";

router.get("/user", userController.user_get);

export default router;
