import React, { useEffect, useState } from "react";
import Message from "./Message";
import AddUserForm from "./Popups/AddUsers/AddUserForm";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import ChatboxHeader from "./Chatbox/ChatboxHeader";
import ChatboxInput from "./Chatbox/ChatboxInput";
import ChatboxMessages from "./Chatbox/ChatboxMessages";
import DeleteRoom from "./Popups/DeleteRoom/DeleteRoom";

const ChatBox = ({
	user,
	popupAddUser,
	setPopupAddUser,
	refreshKey,
	setRefreshKey,
	popupDeleteRoom,
	setPopupDeleteRoom,
}) => {
	const [message, editMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const [room, setRoom] = useState(null);
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
						setRefreshKey={setRefreshKey}
						popupDeleteRoom={popupDeleteRoom}
						setPopupDeleteRoom={setPopupDeleteRoom}
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
						setRefreshKey={setRefreshKey}
						popupDeleteRoom={popupDeleteRoom}
						setPopupDeleteRoom={setPopupDeleteRoom}
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
			{popupDeleteRoom && (
				<DeleteRoom setPopupDeleteRoom={setPopupDeleteRoom} selectedRoom={room}/>
			)}
		</div>
	);
};

export default ChatBox;
