import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Message from "../models/message.js";
import { BadRequestError } from "../errors/index.js";

export default {
	messages_get: asyncHandler(async (req, res) => {
		const messages = await Message.find();

		if (!messages) {
			throw new BadRequestError("There are no messages!");
		}

		res.status(StatusCodes.OK).json({ messages });
	}),
};
