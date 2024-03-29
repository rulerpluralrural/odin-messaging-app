import React, { useEffect, useState } from "react";
import Message from "./Message";
import AddUserForm from "../AddUsers/AddUserForm";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import ChatboxHeader from "./ChatboxHeader";
import ChatboxInput from "./ChatboxInput";
import ChatboxMessages from "./ChatboxMessages";

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
			editMessage("");
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
			editMessage("");
		} catch (error) {
			console.log(error);
		}
	};

	if (!room) {
		return (
			<div className="flex justify-center items-center h-full">
				<PulseLoader size={15} color="#0D98BA" />
			</div>
		);
	}

	return (
		<div className="flex flex-col text-slate-950 bg-white p-5 rounded-md">
			{loading ? (
				<>
					<ChatboxHeader
						selectedRoom={room}
						popupAddUser={popupAddUser}
						setPopupAddUser={setPopupAddUser}
					/>
					<div className="flex justify-center items-center h-[600px] max-h-[600px]">
						<PulseLoader size={15} color="#0D98BA" />
					</div>
				</>
			) : (
				<>
					<ChatboxHeader
						selectedRoom={room}
						popupAddUser={popupAddUser}
						setPopupAddUser={setPopupAddUser}
					/>
					<ChatboxMessages selectedRoom={room} user={user} />
				</>
			)}

			<ChatboxInput
				sendMessage={sendMessage}
				message={message}
				editMessage={editMessage}
			/>

			{popupAddUser && (
				<AddUserForm
					setPopupAddUser={setPopupAddUser}
					id={id}
					setRefreshKey={setRefreshKey}
				/>
			)}
		</div>
	);
};


export default ChatBox;
