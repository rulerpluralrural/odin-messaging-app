import express from "express";
const router = express.Router();
import multer from "multer";

import messageController from "../controllers/message.js";
import authenticateUser from "../middlewares/auth.js";

const storage = multer.diskStorage({
	destination: "./public/images/room-images",
	filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname.replace("-", "_"));
	},
});
const upload = multer({ storage: storage });

// GET route for all user messages
router.get("/messages", authenticateUser, messageController.get_rooms);

// POST route for creating a chat room
router.post("/messages", authenticateUser, messageController.post_create_room);

// PUT route for updating chat room
router.put(
	"/messages/:id/upload",
	authenticateUser,
	upload.single("roomImg"),
	messageController.edit_room
);

// POST route for sending a message
router.post(
	"/message/:id",
	authenticateUser,
	messageController.post_send_message
);

// GET route for messages in a chatroom
router.get("/message/:id", authenticateUser, messageController.get_messages);

export default router;
