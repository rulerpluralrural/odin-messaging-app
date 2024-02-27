import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ChatRooms from "../components/Messages/ChatRooms";
import ChatBox from "../components/Messages/ChatBox";
import Sidebar from "../components/Messages/Sidebar";
import AccessDenied from "./AccessDenied";

const Messages = ({ user, popupAddUser, setPopupAddUser }) => {
	const [messages, setMessages] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showRoom, setShowRoom] = useState(false);
	const selectedRoom = messages?.find((room) => showRoom === room.name);

	useEffect(() => {
		const getMessages = async () => {
			try {
				setLoading(true);

				const response = await fetch("http://localhost:8000/api/v1/messages", {
					credentials: "include",
				}).then((res) => res.json());
				setMessages(response.chatRooms);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		getMessages();
	}, [showRoom]);

	if (!user) {
		return <AccessDenied />;
	}

	return (
		<div className="grid grid-cols-[300px_1fr] h-full">
			<Sidebar />
			<div className="flex flex-col px-7 py-3 pb-10">
				<h1 className="text-2xl text-slate-800 font-serif py-3">Chat</h1>
				<div className="grid grid-cols-[350px_1fr] gap-5 h-full rounded-md w-full">
					<div className="h-full bg-white py-10 rounded-md">
						<SearchbarHeader />
						<p className="mt-3 px-5	font-bold font-Roboto tracking-wide text-lg border-b-[1px] border-slate-300">
							Room List
						</p>
						{messages?.map((item, index) => {
							return (
								<ChatRooms
									key={index}
									roomName={item.name}
									setShowRoom={setShowRoom}
									roomImg={item.roomImg}
									time={item.time_formatted}
									lastMessage={item.messages[item.messages.length - 1]}
								/>
							);
						})}
					</div>
					<div>
						{showRoom && (
							<ChatBox
								selectedRoom={selectedRoom}
								user={user}
								loading={loading}
								popupAddUser={popupAddUser}
								setPopupAddUser={setPopupAddUser}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const SearchbarHeader = () => {
	return (
		<div className="relative text-lg tracking-tighter">
			<input
				type="search"
				placeholder="Search..."
				className=" px-12 py-2 bg-transparent rounded-sm w-full text-slate-800 placeholder:text-slate-400"
			/>
			<FaSearch className="absolute text-slate-400 top-[11px] left-5 text-xl" />
		</div>
	);
};

export default Messages;
