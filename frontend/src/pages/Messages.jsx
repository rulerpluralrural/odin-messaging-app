import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ChatRooms from "../components/Messages/ChatRooms";
import Sidebar from "../components/Messages/Sidebar";
import AccessDenied from "./AccessDenied";
import { Outlet } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const Messages = ({ user }) => {
	const [messages, setMessages] = useState(null);
	const [loading, setLoading] = useState(true);

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
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen bg-slate-100">
				<PulseLoader size={15} color="#0D98BA" />
			</div>
		);
	}

	if (!user) {
		return <AccessDenied />;
	}

	return (
		<div className="grid grid-cols-[300px_1fr] bg-slate-100">
			<Sidebar />
			<div className="flex flex-col px-7 pt-1 pb-8">
				<h1 className="text-2xl text-slate-800 font-serif py-3">Chat</h1>
				<div className="grid grid-cols-[350px_1fr] gap-5  rounded-md">
					<div className="h-[775px] max-h-[775px] bg-white py-2 rounded-md overflow-x-hidden overflow-y-scroll">
						<SearchbarHeader />
						<p className="mt-3 px-5	font-bold font-Roboto tracking-wide text-lg border-b-[1px] border-slate-300">
							Room List
						</p>
						{messages?.map((item, index) => {
							return (
								<ChatRooms
									key={index}
									roomName={item.name}
									roomImg={item.roomImg}
									time={item.time_formatted}
									lastMessage={item.last_message}
									roomID={item._id}
								/>
							);
						})}
					</div>
					<Outlet />
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
