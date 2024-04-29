import React from "react";

const DeleteRoom = ({ setPopupDeleteRoom, selectedRoom, id, setDeleteNotif }) => {

	const handleDeleteRoom = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/messages/${id}/delete`,
				{
					method: "DELETE",
					credentials: "include",
					headers: {
						["Content-Type"]: "application/json; charset=utf-8",
					},
				}
			).then((res) => res.json());

			if (response.msg) {
				setDeleteNotif(response.msg);
				setPopupDeleteRoom(false)
			} else {
				setDeleteNotif("There was an error please try again.")
			}
			
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="fixed inset-0 h-screen bg-slate-700 bg-opacity-80 flex items-center justify-center z-10">
			<div className="flex flex-col gap-3 bg-white p-10 relative shadow-sm shadow-slate-700 rounded-md text-center">
				<div className="text-lg">
					<p className=" first-letter:text-2xl first-letter:font-bold first-letter:font-serif first-letter:text-red-600 tracking-wide">
						Are you sure{" "}
					</p>
					<p>you want to delete this chat room?</p>
				</div>
				<div className="flex flex-col items-center gap-2">
					<img
						src={`${import.meta.env.VITE_BACKEND_URL}${selectedRoom.roomImg}`}
						alt={`${selectedRoom.name}.jpg`}
						className="w-[100px] aspect-square rounded-md border-[1px] object-cover border-slate-50 cursor-pointer hover:opacity-80 transition-opacity flex items-center text-xs justify-center text-center"
					/>
					<p className="font-bold text-lg">{selectedRoom.name}</p>
				</div>
				<div className="flex gap-3 items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-600 transition-colors text-white p-2 rounded-md w-full"
						onClick={handleDeleteRoom}
					>
						Yes
					</button>
					<button
						className="bg-red-500 hover:bg-red-600 transition-colors text-white p-2 rounded-md w-full"
						onClick={() => {
							setPopupDeleteRoom(false);
						}}
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteRoom;
