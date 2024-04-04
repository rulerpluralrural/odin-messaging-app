import asyncHandler from "express-async-handler";
import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import Message from "../models/message.js";
import User from "../models/user.js";
import ChatRoom from "../models/chatRoom.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export default {
	get_rooms: asyncHandler(async (req, res) => {
		const rooms = await ChatRoom.find({ users: { $in: [req.user] } })
			.populate("users")
			.exec();

		const chatRooms = [];

		for (const room of rooms) {
			const users = await User.find({
				_id: { $in: room.users.map((user) => user._id) },
			});

			chatRooms.push({ ...room.toJSON(), users });
		}

		if (!rooms) {
			throw new BadRequestError("There are no rooms!");
		}

		res.status(StatusCodes.OK).json({ chatRooms });
	}),

	get_messages: asyncHandler(async (req, res) => {
		const room = await ChatRoom.findById(req.params.id)
			.populate("messages")
			.populate("messages.sender")
			.exec();

		if (!room) {
			throw new NotFoundError(
				`There is no room with this id: ${req.params.id}`
			);
		}

		res.status(StatusCodes.OK).json({ room });
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

	delete_room: asyncHandler(async (req, res) => {
		const roomID = req.params.id;
		const room = await ChatRoom.findByIdAndDelete({ _id: roomID });

		res.status(StatusCodes.OK).json({ msg: "Chatroom deleted successfully!" });
	}),

	edit_room: asyncHandler(async (req, res) => {
		const room = {
			roomImg: `/images/room-images/${req.file.filename}`,
			_id: req.params.id,
		};

		if (!room) {
			throw new NotFoundError(`No user found with this id: ${req.params.id}`);
		}

		await ChatRoom.findByIdAndUpdate(
			{
				_id: req.params.id,
			},
			room
		);

		res.status(StatusCodes.OK).json({ msg: "Uploaded Successfully!" });
	}),

	post_send_message: [
		check("message").isLength({ min: 1 }).withMessage("Message is required"),
		check("id").isLength({ min: 1 }).withMessage("Room ID is required"),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);
			const message = new Message({
				message: req.body.message,
				sender: req.user._id,
			});

			if (!errors.isEmpty()) {
				throw new BadRequestError(errors.array());
			}

			const sendMessage = await ChatRoom.findByIdAndUpdate(
				req.params.id,
				{
					$push: {
						messages: message,
					},
				},
				{ new: true }
			);

			res.status(StatusCodes.CREATED).json({ sendMessage });
		}),
	],
};
