import asyncHandler from "express-async-handler";
import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import Message from "../models/message.js";
import User from "../models/user.js";
import ChatRoom from "../models/chatRoom.js";
import { BadRequestError } from "../errors/index.js";

export default {
	get_rooms: asyncHandler(async (req, res) => {
		const rooms = await ChatRoom.find({ users: { $in: [req.user] } })
			.populate(["users", "messages"])
			.exec();

		const chatRooms = [];

		for (const room of rooms) {
			const users = await User.find({
				_id: { $in: room.users.map((user) => user._id) },
			});

			const messages = await Message.find({
				_id: { $in: room.messages.map((message) => message._id) },
			});

			chatRooms.push({ ...room.toObject(), users, messages });
		}

		if (!rooms) {
			throw new BadRequestError("There are no rooms!");
		}

		res.status(StatusCodes.OK).json({ chatRooms });
	}),

	post_create_room: asyncHandler(async (req, res) => {
		const newRoom = new ChatRoom({
			name: req.body.name,
			users: [{ _id: req.user._id }],
			messages: [],
		});

		await newRoom.save();
		res.status(StatusCodes.CREATED).json({ newRoom });
	}),

	post_create_message: [
		check("message").isLength({ min: 1 }).withMessage("Message is required"),
		check("id").isLength({ min: 1 }).withMessage("Room ID is required"),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new BadRequestError(errors.array());
			}

			const sendMessage = await ChatRoom.findByIdAndUpdate(
				req.params.id,
				{
					$push: {
						messages: { message: req.body.message, sender: req.user._id },
					},
				},
				{ new: true }
			);

			res.status(StatusCodes.CREATED).json({ sendMessage });
		}),
	],
};
