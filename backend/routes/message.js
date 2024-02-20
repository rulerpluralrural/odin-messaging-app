import express from "express";
const router = express.Router();

import messageController from "../controllers/message.js";
import authenticateUser from "../middlewares/auth.js";

// GET route for all user messages
router.get("/messages", authenticateUser, messageController.get_rooms);

// POST route for creating a chat room
router.post("/messages", authenticateUser, messageController.post_create_room);

// POST route for sending a message
router.post(
	"/message/:id",
	authenticateUser,
	messageController.post_create_message
);

export default router;
