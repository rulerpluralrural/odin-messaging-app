import React from "react";
import {
	FaPaperclip,
	FaRegSmile,
	FaPaperPlane,
} from "react-icons/fa";

const ChatboxInput = ({ sendMessage, message, editMessage }) => {
	return (
		<div>
			<form
				className="grid grid-cols-[1fr_200px] py-3 border-t-2 gap-2 border-slate-300"
				onSubmit={sendMessage}
			>
				<input
					type="text"
					placeholder="Type a message"
					className="w-full h-full rounded-sm border-[1px] border-slate-400 px-3 py-1 font-sans"
					onChange={(e) => {
						editMessage(e.target.value);
					}}
					value={message}
				/>
				<div className=" flex items-center justify-around gap-3 text-2xl text-slate-700">
					<div className="flex items-end justify-between gap-2">
						<FaPaperclip className="cursor-pointer hover:scale-105 transition-transform" />
						<FaRegSmile className="cursor-pointer hover:scale-105 transition-transform" />
					</div>
					<button
						type="submit"
						className="text-base bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-md p-3 w-full self-end flex items-center gap-3 justify-center"
					>
						Send
						<FaPaperPlane />
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChatboxInput;
