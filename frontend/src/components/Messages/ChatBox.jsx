import React from "react";
import Message from "./Message";

const ChatBox = ({ selectedRoom, user }) => {
	return (
		<div className="flex flex-col h-full text-slate-950 bg-white p-10 rounded-sm">
			<div className="pb-1 border-b-2 border-slate-200 flex flex-col items-center justify-center">
				<h1 className="font-bold text-xl text-slate-800 font-Roboto">{selectedRoom.name}</h1>
				<div className="flex gap-2">
					<small className="text-sm text-slate-800">{selectedRoom.date_formatted},</small>
					<small className="text-sm text-slate-800">{selectedRoom.time_formatted}</small>
				</div>
			</div>
			<div className="flex flex-col gap-2 py-3">
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
		</div>
	);
};

export default ChatBox;
