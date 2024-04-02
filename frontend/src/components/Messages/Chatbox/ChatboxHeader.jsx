import React, { useState } from "react";
import { FaTrash, FaUser } from "react-icons/fa";
import PopupEditRoom from "../Popups/PopupEditRoom";
import PopupMessage from "../Popups/PopupMessage";

const ChatboxHeader = ({
	selectedRoom,
	setPopupAddUser,
	popupAddUser,
	setRefreshKey,
	setPopupDeleteRoom,
	popupDeleteRoom,
}) => {
	const [editRoom, setEditRoom] = useState(null);
	const [file, setFile] = useState(null);
	const [imgURL, setImgURL] = useState(null);
	const [message, setMessage] = useState("");

	const fr = new FileReader();
	fr.onload = function (e) {
		setImgURL(e.target.result);
	};

	const handleFileChange = (e) => {
		setFile(e.target.files);
		fr.readAsDataURL(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("roomImg", file[0]);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/messages/${editRoom._id}/upload`,
				{
					method: "PUT",
					body: formData,
					credentials: "include",
				}
			).then((res) => res.json());

			if (response.msg) {
				setMessage(response.msg);
				setEditRoom(false);
				setRefreshKey((prev) => prev + 1);
			} else {
				setMessage("There was an error, Please try again.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex justify-between items-center border-b-2 border-slate-200 pb-3 ">
			{editRoom && (
				<PopupEditRoom
					setEditRoom={setEditRoom}
					handleFileChange={handleFileChange}
					handleSubmit={handleSubmit}
					editRoom={editRoom}
					imgURL={imgURL}
					roomImg={`${import.meta.env.VITE_BACKEND_URL}${selectedRoom.roomImg}`}
				/>
			)}
			{message && <PopupMessage message={message} setMessage={setMessage} />}
			<div className="flex gap-2">
				<img
					src={`${import.meta.env.VITE_BACKEND_URL}${selectedRoom.roomImg}`}
					alt={`${selectedRoom.name}.jpg`}
					className="w-[50px] aspect-square rounded-md border-[1px] object-cover border-slate-50 cursor-pointer hover:opacity-80 transition-opacity flex items-center text-xs justify-center text-center"
					title="Change Image"
					onClick={() => {
						setEditRoom(selectedRoom);
					}}
				/>
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
			</div>

			<div className="text-slate-700 self-end text-sm flex gap-1">
				<p>No. of users: </p>
				<p className="font-bold">
					( <span className="text-green-400">{selectedRoom.users.length}</span>{" "}
					)
				</p>
			</div>
			<div className="flex gap-1">
				<div
					className="flex items-end gap-2 bg-blue-500 text-white cursor-pointer p-4 rounded-full hover:bg-blue-600 transition-colors"
					onClick={() => {
						setPopupAddUser(!popupAddUser);
					}}
				>
					<FaUser className="text-lg" />
				</div>
				<div
					className="flex items-center gap-2 bg-red-500 text-white cursor-pointer p-4 rounded-full aspect-square hover:bg-red-600 transition-colors"
					onClick={() => {
						setPopupDeleteRoom(!popupDeleteRoom);
					}}
				>
					<FaTrash className="font-lg" />
				</div>
			</div>
		</div>
	);
};

export default ChatboxHeader;
