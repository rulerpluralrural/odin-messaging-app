import express from "express";
const router = express.Router();

import messageController from "../controllers/message.js"

router.get("/messages", messageController.messages_get);

export default router;
