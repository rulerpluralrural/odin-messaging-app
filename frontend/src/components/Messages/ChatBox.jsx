import React, { useEffect, useState } from "react";
import Message from "./Message";

import {
	FaPaperclip,
	FaRegSmile,
	FaPaperPlane,
	FaRegPlusSquare,
} from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";

const ChatBox = ({ user, popupAddUser, setPopupAddUser }) => {
	const [message, editMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const [room, setRoom] = useState(null);
	const [refreshKey, setRefreshKey] = useState(0);
	const { id } = useParams();

	const getMessages = async () => {
		try {
			setLoading(true);

			const response = await fetch(
				`http://localhost:8000/api/v1/message/${id}`,
				{
					credentials: "include",
				}
			).then((res) => res.json());

			setRoom(response.room);
			editMessage("")
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getMessages();
	}, [refreshKey, id]);

	const sendMessage = async (e) => {
		e.preventDefault();

		try {
			await fetch(`http://localhost:8000/api/v1/message/${id}`, {
				credentials: "include",
				method: "POST",
				body: JSON.stringify({ message }),
				headers: {
					["Content-Type"]: "application/json; charset=utf-8",
				},
			}).then((res) => res.JSON);
			setRefreshKey((prev) => prev + 1);
			editMessage("")
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col text-slate-950 bg-white p-10 rounded-md">
			<ChatBoxHeader
				selectedRoom={room}
				popupAddUser={popupAddUser}
				setPopupAddUser={setPopupAddUser}
			/>

			{loading ? (
				<div className="flex justify-center items-center h-[600px] max-h-[600px]">
					<PulseLoader size={15} color="#0D98BA" />
				</div>
			) : (
				<ChatBoxMessages selectedRoom={room} user={user} />
			)}

			<ChatBoxInput
				sendMessage={sendMessage}
				message={message}
				editMessage={editMessage}
			/>
		</div>
	);
};

const ChatBoxHeader = ({ selectedRoom, setPopupAddUser, popupAddUser }) => {
	return (
		<div className="flex justify-between items-center border-b-2 border-slate-200 pb-3 ">
			<div className="flex flex-col items-start justify-center">
				<h1 className="font-bold text-xl text-slate-800 font-Roboto">
					{selectedRoom.name}
				</h1>
				<div className="flex gap-2">
					<small className="text-sm text-slate-800">
						{selectedRoom.date_formatted},
					</small>
					<small className="text-sm text-slate-800">
						{selectedRoom.time_formatted}
					</small>
				</div>
			</div>
			<div
				className="flex items-end gap-2 bg-blue-500 text-white cursor-pointer p-3 rounded-md hover:bg-blue-600 transition-colors"
				onClick={() => {
					setPopupAddUser(!popupAddUser);
				}}
			>
				<p className="font-Roboto">Add user</p>
				<FaRegPlusSquare className="text-2xl " />
			</div>
		</div>
	);
};

const ChatBoxMessages = ({ selectedRoom, user }) => {
	return (
		<div className="flex flex-col gap-2 py-3 overflow-scroll h-[600px] max-h-[600px] relative">
			{selectedRoom.messages <= 0 ? (
				<div className="flex items-center justify-center h-full">
					<p className="text-slate-700">There are no messages in this room!</p>
				</div>
			) : (
				<div>
					{selectedRoom.messages.map((item, index) => {
						return (
							<Message
								key={index}
								message={item.message}
								sender={item.sender.firstName}
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

const ChatBoxInput = ({ sendMessage, message, editMessage }) => {
	return (
		<div>
			<form
				className="grid grid-cols-[1fr_200px] py-3 border-t-2 gap-2 border-slate-300"
				onSubmit={sendMessage}
			>
				<input
					type="text"
					placeholder="Type a message"
					className="w-full h-full rounded-sm border-[1px] border-slate-400 px-3 py-1 font-sans"
					onChange={(e) => {
						editMessage(e.target.value);
					}}
					value={message}
				/>
				<div className=" flex items-center justify-around gap-3 text-2xl text-slate-700">
					<div className="flex items-end justify-between gap-2">
						<FaPaperclip className="cursor-pointer hover:scale-105 transition-transform" />
						<FaRegSmile className="cursor-pointer hover:scale-105 transition-transform" />
					</div>
					<button
						type="submit"
						className="text-base bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-md p-3 w-full self-end flex items-center gap-3 justify-center"
					>
						Send
						<FaPaperPlane />
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChatBox;
