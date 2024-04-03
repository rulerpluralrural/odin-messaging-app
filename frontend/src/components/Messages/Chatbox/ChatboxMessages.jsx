import React from "react";
import Message from "./Message";

const ChatboxMessages = ({ selectedRoom, user }) => {
	return (
		<div className="flex flex-col gap-2 py-3 overflow-scroll h-[600px] max-h-[600px] relative">
			{selectedRoom.messages <= 0 ? (
				<div className="flex items-center justify-center h-full">
					<p className="text-slate-700">There are no messages in this room!</p>
				</div>
			) : (
				<div className="px-4 py-2">
					{selectedRoom.messages.map((item, index) => {
						return (
							<Message
								key={index}
								message={item.message}
								senderID={item.sender._id}
								senderName={item.sender.firstName}
								profileImg={item.sender.profileImg}
								dateSent={item.time_formatted}
								user={user}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ChatboxMessages;
