import React from "react";
import Message from "./Message";

const ChatBox = ({ selectedRoom }) => {
	return (
		<div className="flex flex-col h-full text-slate-950">
			<div className="h-10 border-b-[1px] border-slate-900 flex items-center justify-center">
				<h1>{selectedRoom.name}</h1>
				<p>{selectedRoom.date_formatted}</p>
			</div>
			<div className="flex flex-col gap-2 py-3">
				{selectedRoom.messages.map((item, index) => {
					return (
						<Message
							key={index}
							message={item.message}
							sender={item.sender.firstName}
							profileImg={item.sender.profileImg}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ChatBox;
