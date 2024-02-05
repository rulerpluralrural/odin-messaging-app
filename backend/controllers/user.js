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
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "Please provide your email and password" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid email" });
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
		check("firstName")
			.trim()
			.exists({ checkFalsy: true })
			.withMessage("You must type a first name")
			.isLength({ min: 3 })
			.withMessage("The first name must be at least 5 chars long")
			.isAlpha("en-US", { ignore: " " })
			.withMessage("The first name must contain only letters"),
		check("lastName")
			.trim()
			.exists({ checkFalsy: true })
			.withMessage("You must type a last name")
			.isLength({ min: 3 })
			.withMessage("The last name must be at least 5 chars long")
			.isAlpha("en-US", { ignore: " " })
			.withMessage("The last name must contain only letters"),
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
		check("address")
			.trim(0)
			.isLength({ min: 1 })
			.withMessage("Please provide your address"),
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
