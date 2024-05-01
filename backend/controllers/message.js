import asyncHandler from "express-async-handler";
import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import Message from "../models/message.js";
import User from "../models/user.js";
import ChatRoom from "../models/chatRoom.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { ObjectId } from "mongodb";

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

	post_create_room: [
		check("roomName")
			.isLength({ min: 1 })
			.withMessage("Chat room name is required."),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new BadRequestError(errors.array());
			}

			const newRoom = new ChatRoom({
				name: req.body.roomName,
				users: [{ _id: req.user._id }],
				roomImg: `/images/room-images/${req.file.filename}`,
				messages: [],
			});

			await newRoom.save();
			res
				.status(StatusCodes.CREATED)
				.json({ msg: `Successfully created new room: ${req.body.roomName}` });
		}),
	],

	delete_room: asyncHandler(async (req, res) => {
		const roomID = req.params.id;
		await ChatRoom.findByIdAndDelete({ _id: roomID });

		res
			.status(StatusCodes.OK)
			.json({ msg: "Chatroom has been deleted successfully!" });
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

	delete_message: asyncHandler(async (req, res) => {
		const messageID = req.params.id;
		const roomID = req.body.roomID;

		if (!messageID) {
			throw new NotFoundError(`There is no message with this ID: ${messageID}`);
		} else if (!roomID) {
			throw new NotFoundError(`There is no chat room with this ID: ${roomID}`);
		}

		await ChatRoom.findByIdAndUpdate(
			roomID,
			{
				$pull: {
					messages: {
						_id: new ObjectId(messageID),
					},
				},
			},
			{ new: true }
		);

		res
			.status(StatusCodes.OK)
			.json({ msg: "Message has been deleted successfully!" });
	}),
};
