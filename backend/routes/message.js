import express from "express";
const router = express.Router();

import messageController from "../controllers/message.js";
import authenticateUser from "../middlewares/auth.js";

router.get("/messages", authenticateUser, messageController.get_rooms);
router.post("/messages", authenticateUser, messageController.post_create_room);

export default router;
