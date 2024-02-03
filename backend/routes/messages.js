import express from "express";
const router = express.Router();

router.get("/messages", messageController_get);

export default router;
