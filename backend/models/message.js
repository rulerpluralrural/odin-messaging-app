import mongoose from "mongoose";
const Schema = mongoose.Schema();

const MessageSchema = new Schema(
	{
		message: {
			type: String,
			required: [true, "Message is required"],
		},
		users: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: [true, "User is required"],
				},
				sender: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: [true, "Sender is required"],
				},
				read: {
					type: Date,
				},
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
