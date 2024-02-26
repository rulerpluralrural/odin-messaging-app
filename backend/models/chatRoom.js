import mongoose from "mongoose";
import { Schema } from "mongoose";
import { MessageSchema } from "./message.js";

import { DateTime } from "luxon";

const ChatRoomSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		users: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			},
		],
		roomImg: {
			type: String,
			default: "",
		},
		messages: [MessageSchema],
	},
	{
		timestamps: true,
	}
);

ChatRoomSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

ChatRoomSchema.virtual("time_formatted").get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(
		DateTime.TIME_SIMPLE
	);
});

ChatRoomSchema.set("toJSON", { virtuals: true });

export default mongoose.model("ChatRoom", ChatRoomSchema);
