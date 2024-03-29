import React from "react";
import { Link } from "react-router-dom";

const ChatRooms = ({
	roomName,
	roomImg,
	time,
	lastMessage,
	roomID,
	setEditRoom,
}) => {
	return (
		<Link
			className="flex gap-2 items-start justify-between cursor-pointer hover:bg-slate-100 hover:scale-105 group transition-all px-5 py-4 border-b-[1px] border-slate-300"
			to={`/messages/${roomID}`}
		>
			<div className="flex items-center gap-3">
				<div className="rounded-full border-[1px] border-slate-50 w-[60px]  aspect-square flex items-center justify-center text-center text-slate-600 text-xs relative">
					<img
						src={roomImg}
						alt={`${
							roomName.length > 10
								? roomName.substring(0, 10) + "..."
								: roomName
						} Img`}
						className="rounded-full  aspect-square hover:opacity-90 transition-opacity"
						title="Change Image"
						onClick={() => {
							setEditRoom({ roomImg, roomID });
						}}
					/>
					<div className="absolute top-[2px] right-0 rounded-full bg-green-600 w-[12px] aspect-square border-2 border-white"></div>
				</div>
				<div className="self-start flex flex-col gap-2">
					<p className="group-hover:font-bold">{roomName}</p>
					<p className="text-slate-500 text-sm w-full">
						{lastMessage.length > 20
							? lastMessage.substring(0, 20) + "..."
							: lastMessage}
					</p>
				</div>
			</div>

			<div className=" justify-end text-right text-slate-500 text-xs break-keep">
				{time}
			</div>
		</Link>
	);
};

export default ChatRooms;
