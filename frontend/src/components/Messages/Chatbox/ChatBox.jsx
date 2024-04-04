import React, { useEffect, useState } from "react";
import Message from "./Message";
import AddUserForm from "../Popups/AddUsers/AddUserForm";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import ChatboxHeader from "./ChatboxHeader";
import ChatboxInput from "./ChatboxInput";
import ChatboxMessages from "./ChatboxMessages";
import DeleteRoom from "../Popups/DeleteRoom/DeleteRoom";
import DeleteNotif from "../Popups/DeleteRoom/DeleteNotif";

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
	const [deleteNotif, setDeleteNotif] = useState("");
	const [loading, setLoading] = useState(true);
	const [room, setRoom] = useState(null);
	const { id } = useParams();

	const getMessages = async () => {
		try {
			setLoading(true);

			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/message/${id}`,
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
			await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message/${id}`, {
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
				<DeleteRoom
					setPopupDeleteRoom={setPopupDeleteRoom}
					selectedRoom={room}
					id={id}
					setDeleteNotif={setDeleteNotif}
				/>
			)}
			{deleteNotif && <DeleteNotif message={deleteNotif} setDeleteNotif={setDeleteNotif} setRefreshKey={setRefreshKey}/>}
		</div>
	);
};

export default ChatBox;
