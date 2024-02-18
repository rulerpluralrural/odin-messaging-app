import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Message from "../models/message.js";
import ChatRoom from "../models/chatRoom.js";
import { BadRequestError } from "../errors/index.js";

export default {
	get_rooms: asyncHandler(async (req, res) => {
		const rooms = await ChatRoom.find({ users: { $in: [req.user] } });

		if (!rooms) {
			throw new BadRequestError("There are no rooms!");
		}

		console.log(req.user);
		res.status(StatusCodes.OK).json({ rooms });
	}),

	post_create_room: asyncHandler(async (req, res) => {
		const newRoom = new ChatRoom({
			name: req.body.name,
			users: [req.user],
			messages: [],
		});

		await newRoom.save();
		res.status(StatusCodes.CREATED).json({ newRoom });
	}),
};
