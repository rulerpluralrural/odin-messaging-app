import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import ChatRooms from "../components/ChatRooms";
import ChatBox from "../components/ChatBox";
import { Link } from "react-router-dom";

const Messages = ({ user }) => {
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

	console.log(selectedRoom)
	if (!user) {
		return (
			<div className="h-screen flex items-center mt-52 flex-col gap-5">
				<p className="text-4xl font-Roboto font-bold">
					You need to login to view this page!
				</p>
				<Link
					to={"/login"}
					className="text-blue-900 underline text-2xl font-bold hover:text-blue-700 focus:text-blue-700"
				>
					Login
				</Link>
			</div>
		);
	}

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
					messages?.map((item, index) => {
						return (
							<ChatRooms
								key={index}
								roomName={item.name}
								setShowRoom={setShowRoom}
							/>
						);
					})
				)}
			</div>
			<div className="bg-slate-100">{showRoom && <ChatBox selectedRoom={selectedRoom}/>}</div>
		</div>
	);
};

export default Messages;
