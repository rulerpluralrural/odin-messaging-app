import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import ChatRooms from "../components/ChatRooms";
import ChatBox from "../components/ChatBox";

const Messages = () => {
	const [messages, setMessages] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showRoom, setShowRoom] = useState(false);

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

	console.log(showRoom);

	return (
		<div className="grid grid-cols-[300px_1fr] h-screen text-white">
			<div className="bg-slate-950 p-3 flex flex-col gap-1">
				<h1 className="text-lg font-bold">Conversations</h1>
				<div className="relative">
					<input
						type="search"
						placeholder="Search here"
						className="px-8 py-1 bg-transparent border-[1px] border-purple-600 rounded-sm w-full text-white"
					/>
					<FaSearch className="absolute text-slate-200 top-2 left-2" />
				</div>
				<p className="mt-5">Friends List</p>
				{messages === null || loading ? (
					<div className="flex items-center justify-center h-full">
						<ClipLoader size={100} color="purple" />
					</div>
				) : (
					messages.map((item, index) => {
						return (
							<ChatRooms
								key={index}
								roomName={item.name}
								users={item.users}
								messages={item.messages}
								setShowRoom={setShowRoom}
								showRoom={showRoom}
							/>
						);
					})
				)}
			</div>
			<div className="bg-slate-100">{showRoom && <ChatBox />}</div>
		</div>
	);
};

export default Messages;
