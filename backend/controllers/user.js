import asyncHandler from "express-async-handler";
import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import User from "../models/user";

export default {
	// GET a single user
	user_get: asyncHandler(async (req, res) => {
		const userID = req.params.id;

		const user = await User.findOne({
			_id: userID,
		});

		if (!user) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: "User ID not found" });
		}

		res.status(StatusCodes.OK).json({ user });
	}),

	// GET all users
	users_get: asyncHandler(async (req, res) => {
		const users = await User.find()
			.sort([["username", "ascending"]])
			.select("-password")
			.exec();

		res.status(StatusCodes.OK).json(users);
	}),
};
