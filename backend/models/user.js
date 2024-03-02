import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { DateTime } from "luxon";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			minLength: 3,
			required: [true, "First name is required"],
		},
		lastName: {
			type: String,
			minLength: 3,
			required: [true, "Last name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please provide a valid email",
			],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: 6,
		},
		address: {
			type: String,
			default: "",
		},
		about: {
			type: String,
			default: "",
		},
		profileImg: {
			type: String,
			default: "",
		},
		work: {
			type: String,
			default: "",
		},
		handle: {
			type: String,
			default: function () {
				if (this.firstName) {
					return `@${this.firstName}${Math.floor(
						Math.random() * (100 - 1 + 1) + 1
					)}`;
				}
				return null;
			},
			unique: true,
		},
	},
	{ timestamps: true }
);

UserSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

UserSchema.pre("save", async function () {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userId: this._id, email: this.email },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	);
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

UserSchema.index(
	{ firstName: "text", lastName: "text" },
	{ textIndexVersion: 1, name: "$text" }
);

UserSchema.set("toJSON", { virtuals: true });

export default mongoose.model("User", UserSchema);
