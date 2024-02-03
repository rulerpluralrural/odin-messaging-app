import express from "express";
const router = express.Router();

router.get("/user", userController_get);

export default router;
