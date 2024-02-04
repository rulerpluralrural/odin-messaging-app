import express from "express";
const router = express.Router();

import messageController from "../controllers/message"

router.get("/messages", messageController.messages_get);

export default router;
