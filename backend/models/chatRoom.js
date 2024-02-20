import mongoose from "mongoose";
import { Schema } from "mongoose";
import { MessageSchema } from "./message.js";

const ChatRoomSchema = new Schema({
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
	messages: [MessageSchema],
});

export default mongoose.model("ChatRoom", ChatRoomSchema);
