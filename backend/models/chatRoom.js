import mongoose from "mongoose";
import { Schema } from "mongoose";

const ChatRoomSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name is required"]
	},
	users: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		},
	],
	messages: [
		{
			message: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
			},
		},
	],
});

export default mongoose.model("ChatRoom", ChatRoomSchema);
