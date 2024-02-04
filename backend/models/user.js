import mongoose from "mongoose";
const Schema = mongoose.Schema();

import { DateTime } from "luxon";

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
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
			publicID: {
				type: String,
				required: [true, "Public ID is required"],
			},
			url: {
				type: String,
				default: "",
			},
		},
	},
	{ timestamps: true }
);

UserSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

UserSchema.set("toJSON", { virtuals: true });

export default mongoose.model("User", UserSchema);
