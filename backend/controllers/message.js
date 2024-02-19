import asyncHandler from "express-async-handler";
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

			chatRooms.push({ ...room.toObject(), users });
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
};
