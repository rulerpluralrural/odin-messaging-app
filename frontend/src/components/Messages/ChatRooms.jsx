import React from "react";

const ChatRooms = ({ roomName, setShowRoom }) => {

	return (
		<div
			className=" flex gap-2 items-center cursor-pointer hover:bg-slate-300 transition-colors px-10 py-3"
			onClick={() => {
				setShowRoom(roomName);
			}}
		>
			<div className="h-2 w-2 rounded-full bg-green-600"></div>
			<div>{roomName}</div>
		</div>
	);
};

export default ChatRooms;
