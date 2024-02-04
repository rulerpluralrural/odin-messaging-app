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

	// Handle login on POST
	login: asyncHandler(async (req, res) => {
		const { username, password } = req.body;

		if (!username || !password) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "Please provide a username and password" });
		}

		const user = await User.findOne({ username });
		if (!user) {
			res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid username" });
		}

		const isPasswordCorrect = await user.comparePassword(password);
		if (!isPasswordCorrect) {
			res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid password" });
		}

		const token = user.createJWT();

		req.session.token = token;

		res
			.status(StatusCodes.OK)
			.json({ user: { username: user.username, _id: user._id }, token });
	}),

	// Handle sign-up on POST
	register: [
		check("username")
			.trim()
			.isLength({ min: 1 })
			.escape()
			.withMessage("Username is required")
			.custom(async (value) => {
				const existingUsername = await User.findOne({ username: value });
				if (existingUsername) {
					throw new BadRequestError(
						"Username already in use, Please choose a different one"
					);
				}
			}),
		check("email")
			.trim()
			.isLength({ min: 1 })
			.withMessage("Email is required")
			.custom(async (value) => {
				const existingEmail = await User.findOne({ existingEmail: value });
				if (existingEmail) {
					throw new BadRequestError(
						"E-mail is not available, Please choose a different one."
					);
				}
			})
			.isEmail()
			.withMessage("Email is not valid"),
		check("password")
			.trim()
			.isLength({ min: 6 })
			.withMessage(
				"Password is required and must be at least 5 characters long"
			),
		check("password2").custom(async (value, { req }) => {
			if (value !== req.body.password) {
				throw new BadRequestError(
					"Password confirmation does not match password"
				);
			}
		}),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(StatusCodes.BAD_REQUEST).json(errors.array());
			}
			const user = await User.create({ ...req.body });

			if (user) {
				const token = user.createJWT();
				req.session.token = token;

				res.status(StatusCodes.CREATED).json({
					user: { id: user._id, username: user.username, email: user.email },
					token,
				});
			} else {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: "Invalid user data" });
			}
		}),
	],
};
