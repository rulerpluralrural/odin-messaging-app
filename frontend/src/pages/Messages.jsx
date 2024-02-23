import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import ChatRooms from "../components/Messages/ChatRooms";
import ChatBox from "../components/Messages/ChatBox";
import { Link } from "react-router-dom";
import Sidebar from "../components/Messages/Sidebar";

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

	console.log(selectedRoom);
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
		<div className="grid grid-cols-[300px_1fr] h-screen overflow-scroll">
			<Sidebar />
			<div className="flex flex-col p-10">
			<h1 className="text-2xl text-slate-800 pb-10 font-serif	">Chat</h1>
				<div className="grid grid-cols-[250px_1fr] gap-5 h-full rounded-md w-full">
					<div className="h-full bg-white p-10 rounded-sm">
						<div className="relative">
							<input
								type="search"
								placeholder="Search here"
								className="px-8 py-1 bg-transparent border-[1px] border-blue-800 rounded-sm w-full text-slate-800 outline-none placeholder:text-slate-600"
							/>
							<FaSearch className="absolute text-slate-500 top-2 left-2" />
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
					<div>{showRoom && <ChatBox selectedRoom={selectedRoom} />}</div>
				</div>
			</div>
		</div>
	);
};

export default Messages;
