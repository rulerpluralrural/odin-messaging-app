import React from "react";
import { FaXmark, FaUpload } from "react-icons/fa6";

const AddRoom = ({
	setAddRoom,
	handleForm,
	handleChange,
	handleFileChange,
	roomName,
	placeholderImg,
	imgURL,
}) => {
	return (
		<div className="fixed inset-0 h-screen bg-slate-700 bg-opacity-80 flex items-center justify-center z-10">
			<div className="flex flex-col gap-3 bg-white p-10 relative shadow-sm shadow-slate-700 rounded-md overflow-scroll w-[500px]">
				<FaXmark
					onClick={() => {
						setAddRoom(false);
					}}
					className="absolute top-3 right-4 text-red-600 cursor-pointer text-xl font-bold hover:text-red-700"
				/>
				<div className="text-center flex flex-col">
					<h1 className="text-2xl font-Roboto underline">Create a room</h1>
					<form onSubmit={handleForm} className="flex flex-col gap-3 py-3">
						<img
							src={imgURL || placeholderImg}
							alt="Chatroom Image"
							className="w-[150px] aspect-square rounded-full object-cover border-[2px] border-slate-50 self-center flex items-center justify-center"
						/>
						<div className="flex flex-col justify-start items-start">
							<label htmlFor="roomName" className="text-lg font-serif">
								Chatroom Name:
							</label>
							<input
								type="text"
								name="roomName"
								id="roomName"
								onChange={handleChange}
								value={roomName}
								className="w-full border-[1px] border-slate-500 p-2 rounded-sm"
							/>
						</div>
						<div className="flex flex-col justify-start items-start relative">
							<p className="text-lg font-serif">Chatroom Image:</p>
							<label
								htmlFor="roomImg"
								className="cursor-pointer border-[1px] border-slate-500 rounded-sm px-3 py-2 flex items-center gap-2 justify-center w-full hover:opacity-90"
							>
								<FaUpload /> Upload photo
							</label>
							<input
								type="file"
								name="roomImg"
								id="roomImg"
								onChange={handleFileChange}
								className="hidden"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors text-lg rounded-sm mt-2"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddRoom;
