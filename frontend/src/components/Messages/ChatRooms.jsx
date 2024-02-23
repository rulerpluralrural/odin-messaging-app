import React from "react";

const ChatRooms = ({ roomName, setShowRoom }) => {

	return (
		<div
			className=" flex gap-2 items-center cursor-pointer hover:bg-purple-800 p-2 rounded-lg"
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
