import asyncHandler from "express-async-handler";
import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import User from "../models/user.js";
import ChatRoom from "../models/chatRoom.js";
import { Types } from "mongoose";

export default {
	// GET a single user
	user_get: asyncHandler(async (req, res) => {
		const userID = req.user._id;

		const user = await User.findOne({
			_id: userID,
		}).select("-password");

		if (!user) {
			throw new NotFoundError(`There is no user with this id: ${userID}`);
		}

		res.status(StatusCodes.OK).json({ user });
	}),

	// GET all users
	users_get: asyncHandler(async (req, res) => {
		const users = await User.find({
			$text: {
				$search: req.query.search,
				$caseSensitive: false,
				$diacriticSensitive: false,
			},
		})
			.sort([["email", "ascending"]])
			.select("-password")
			.exec();

		if (!users) {
			throw NotFoundError("There are no users!");
		}

		res.status(StatusCodes.OK).json(users);
	}),

	// Handle add user to a room on PUT
	add_user_put: [
		check("id")
			.trim()
			.isLength({ min: 1 })
			.withMessage("User ID is required")
			.custom(async (value, { req }) => {
				const room = await ChatRoom.findById(req.params.id);
				const existingUser = room.users.find((user) => {
					return user.id === value;
				});

				if (existingUser) {
					throw new BadRequestError("User is already in the Chatroom");
				}
			}),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new BadRequestError(errors.array());
			}

			const room = await ChatRoom.findById(req.params.id);
			const id = new Types.ObjectId(req.body.id);

			if (!room) {
				throw new NotFoundError(
					`Cannot find the room with this id: ${req.params.id}`
				);
			}

			room.users.push({ _id: id });

			await room.save();

			res.status(StatusCodes.OK).json({ room });
		}),
	],

	edit_user_put: [
		check("firstName")
			.trim()
			.isLength({ min: 3 })
			.withMessage("First name must be at least 3 letters.")
			.isAlpha()
			.withMessage("First name must be letters only."),
		check("lastName")
			.trim()
			.isLength({ min: 3 })
			.withMessage("First name must be at least 3 letters.")
			.isAlpha()
			.withMessage("First name must be letters only."),
		check("age")
			.trim()
			.isAlphanumeric()
			.withMessage("Age must be number only.")
			.isFloat({ min: 18 })
			.withMessage("Age must be 18 and over."),
		check("email")
			.trim()
			.isLength({ min: 1 })
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email must be valid."),
		check("phoneNumber")
			.trim()
			.isMobilePhone("any")
			.withMessage("Mobile phone number is not valid."),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new BadRequestError(errors.array());
			}

			const user = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				age: req.body.age,
				email: req.body.email,
				gender: req.body.gender,
				birthday: req.body.birthday,
				address: req.body.address,
				education: req.body.education,
				work: req.body.work,
				about: req.body.about,
				phoneNumber: req.body.phoneNumber,
				_id: req.params.id,
			};

			if (!user) {
				throw new NotFoundError(`No user with this id: ${req.params.id}`);
			}

			const updatedUser = await User.findByIdAndUpdate(
				{ _id: req.params.id },
				user
			);

			res.status(StatusCodes.CREATED).json({ user: updatedUser });
		}),
	],

	// AUTHENTICATION

	// Handle login on POST
	login: asyncHandler(async (req, res) => {
		const { email, password } = req.body;

		if (!email || !password) {
			throw new BadRequestError("Please provide your email and password");
		}

		const user = await User.findOne({ email });
		if (!user) {
			throw new BadRequestError("Invalid email");
		}

		const isPasswordCorrect = await user.comparePassword(password);
		if (!isPasswordCorrect) {
			throw new BadRequestError("Invalid password");
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
				const existingEmail = await User.findOne({ email: value });
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
				"Password is required and must be at least 6 characters long"
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
				throw new BadRequestError(errors.array());
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
				throw new BadRequestError("Invalid user data");
			}
		}),
	],

	// Handle user logout POST
	logout: asyncHandler(async (req, res) => {
		res.cookie("token", "logout", {
			httpOnly: true,
			expires: new Date(Date.now() + 1000),
		});
		req.session.token = undefined;
		res.status(StatusCodes.OK).json({ msg: "User logged out" });
	}),

	// Check user session
	check_user_session: asyncHandler(async (req, res) => {
		res.status(StatusCodes.OK).json({
			user: {
				_id: req.user._id,
			},
		});
	}),
};
