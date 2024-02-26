import React from "react";
import Message from "./Message";

import { FaPaperclip, FaRegSmile, FaPaperPlane } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

const ChatBox = ({ selectedRoom, user, loading }) => {
	if (loading) {
		return <div className="flex justify-center items-center h-full">
		<PulseLoader size={15} color="#0D98BA" />
	</div>
	}
	return (
		<div className="grid grid-rows-[100px_1fr_100px] h-full text-slate-950 bg-white p-10 rounded-md">
			<ChatBoxHeader selectedRoom={selectedRoom} />
			<ChatBoxMessages selectedRoom={selectedRoom} user={user} />
			<ChatBoxInput />
		</div>
	);
};

const ChatBoxHeader = ({ selectedRoom }) => {
	return (
		<div className="pb-1 border-b-2 border-slate-200 flex flex-col items-center justify-center">
			<h1 className="font-bold text-xl text-slate-800 font-Roboto">
				{selectedRoom.name}
			</h1>
			<div className="flex gap-2">
				<small className="text-sm text-slate-800">
					{selectedRoom.date_formatted},
				</small>
				<small className="text-sm text-slate-800">
					{selectedRoom.time_formatted}
				</small>
			</div>
		</div>
	);
};

const ChatBoxMessages = ({ selectedRoom, user }) => {
	return (
		<div className="flex flex-col gap-2 py-3 overflow-scroll">
			{selectedRoom.messages.map((item, index) => {
				return (
					<Message
						key={index}
						message={item.message}
						sender={item.sender.firstName}
						profileImg={item.sender.profileImg}
						dateSent={item.time_formatted}
						user={user}
					/>
				);
			})}
		</div>
	);
};

const ChatBoxInput = () => {
	return (
		<div>
			<form className="grid grid-cols-[1fr_200px] py-3 border-t-2 gap-2 border-slate-300">
				<input
					type="text"
					placeholder="Type a message"
					className="w-full h-full rounded-sm border-[1px] border-slate-400 px-3 py-1 font-sans"
				/>
				<div className=" flex items-center justify-around gap-3 text-2xl text-slate-700">
					<div className="flex items-end justify-between gap-2">
						<FaPaperclip className="cursor-pointer hover:scale-105 transition-transform" />
						<FaRegSmile className="cursor-pointer hover:scale-105 transition-transform" />
					</div>
					<button
						type="submit"
						className="text-base bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 transition-colors text-white rounded-md p-3 w-full self-end flex items-center gap-3 justify-center"
					>
						Send
						<FaPaperPlane />
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChatBox;
