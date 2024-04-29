import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const PopupDeleteMessage = ({ messageID, selectedRoom, setRefreshKey }) => {
	const [notifMessage, setNotifMessage] = useState("");
	const roomID = selectedRoom._id;

	const deleteMessage = async () => {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/api/v1/message/${messageID}/delete`,
				{
					method: "DELETE",
					credentials: "include",
					body: JSON.stringify({ roomID }),
					headers: {
						["Content-Type"]: "application/json; charset=utf-8",
					},
				}
			);

			if (response.msg) {
				setNotifMessage(response.msg);
			} else {
				setNotifMessage(response.message);
			}

			setRefreshKey((prev) => prev + 1);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<button
			className="absolute top-4 right-10 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition-colors"
			type="button"
			title="Delete Message?"
			onClick={deleteMessage}
		>
			<FaTrash />
		</button>
	);
};

export default PopupDeleteMessage;
