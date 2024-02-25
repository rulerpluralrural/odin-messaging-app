import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { DateTime } from "luxon";

export const MessageSchema = new Schema(
	{
		message: {
			type: String,
			required: [true, "Message is required"],
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Sender is required"],
		},
	},
	{ timestamps: true }
);

MessageSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

MessageSchema.virtual("time_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.TIME_SIMPLE);
});

MessageSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Message", MessageSchema);
