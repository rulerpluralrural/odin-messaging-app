import React from "react";
import { FaXmark } from "react-icons/fa6";

const DeleteNotif = ({ message, setDeleteNotif, setRefreshKey }) => {
	return (
		<div className="fixed inset-0 h-screen bg-slate-700 bg-opacity-80 flex items-center justify-center z-10">
			<div className="flex flex-col gap-3 bg-white p-10 relative shadow-sm shadow-slate-700 rounded-md text-center">
				<FaXmark
					className="top-2 right-2 absolute text-red-600 hover:text-red-700 cursor-pointer text-xl"
					onClick={() => {
						setDeleteNotif("");
						setRefreshKey((prev) => prev + 1);
					}}
				/>
				<p className="text-lg font-bold">{message}</p>
			</div>
		</div>
	);
};

export default DeleteNotif;
