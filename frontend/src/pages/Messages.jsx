import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import ChatRooms from "../components/Messages/ChatRooms";
import Sidebar from "../components/Messages/Sidebar";
import AccessDenied from "./AccessDenied";
import { Outlet } from "react-router-dom";
import AddRoom from "../components/Messages/Popups/AddRooms/AddRoom";
import { PulseLoader } from "react-spinners";

const Messages = ({ user }) => {
	const [chatRooms, setChatRooms] = useState(null);
	const [loading, setLoading] = useState(true);
	const [notif, setNotif] = useState("");
	const [addRoom, setAddRoom] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const [file, setFile] = useState(null);
	const [imgURL, setImgURL] = useState(null);
	const [roomName, setRoomName] = useState("");

	useEffect(() => {
		const getMessages = async () => {
			try {
				setLoading(true);

				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/v1/messages`,
					{
						credentials: "include",
					}
				).then((res) => res.json());
				setLoading(false);
				setChatRooms(response.chatRooms);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		getMessages();
	}, [refreshKey]);

	const fr = new FileReader();
	fr.onload = function (e) {
		setImgURL(e.target.result);
	};

	const handleFileChange = (e) => {
		setFile(e.target.files);
		fr.readAsDataURL(e.target.files[0]);
	};

	const handleChange = (e) => {
		setRoomName(e.target.value);
	};

	const handleForm = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		if (file) {
			formData.append("roomImg", file[0]);
		}
		formData.append("roomName", roomName);

		setLoading(true);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/messages`,
				{
					method: "POST",
					credentials: "include",
					body: formData,
				}
			).then((res) => res.json());

			if (response.msg) {
				setNotif(response.msg);
			} else {
				setNotif("There was an error, please try again.");
			}

			setLoading(false);
			setAddRoom(false);
			setRefreshKey((prev) => prev + 1);

			e.target.reset();
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	if (!user) {
		return <AccessDenied />;
	}

	return (
		<div className="grid grid-cols-[300px_1fr] bg-slate-100">
			{chatRooms ? (
				<Sidebar chatRooms={chatRooms} />
			) : (
				<div className="flex items-center justify-center   bg-white border-r-2  border-slate-200">
					<p className=" animate-bounce text-lg text-slate-600 font-Roboto">
						Loading...
					</p>
				</div>
			)}
			{addRoom && (
				<AddRoom
					setAddRoom={setAddRoom}
					handleForm={handleForm}
					handleChange={handleChange}
					handleFileChange={handleFileChange}
					roomName={roomName}
					placeholderImg={`${
						import.meta.env.VITE_BACKEND_URL
					}/images/room-images/placeholder-image.jpg`}
					imgURL={imgURL}
				/>
			)}
			<div className="flex flex-col px-7 pt-1 pb-8">
				<h1 className="text-2xl text-slate-800 font-serif py-3">Chat</h1>
				<div className="grid grid-cols-[350px_1fr] gap-5  rounded-md">
					<div className="h-[750px] max-h-[750px] bg-white py-2 rounded-md overflow-x-hidden overflow-y-scroll">
						<SearchbarHeader />
						<p className="mt-3 px-5	font-bold font-Roboto tracking-wide text-lg border-b-[1px] border-slate-300">
							Room List
						</p>
						{loading ? (
							<div className="text-center text-slate-500 flex items-center justify-center mt-40 animate-bounce">
								<PulseLoader size={15} color="#0D98BA" />
							</div>
						) : !chatRooms ? (
							<div className="text-center text-slate-500 flex items-center justify-center mt-40 animate-bounce">
								<PulseLoader size={15} color="#0D98BA" />
							</div>
						) : (
							<div>
								{chatRooms.map((item, index) => {
									return (
										<ChatRooms
											key={index}
											roomName={item.name}
											roomImg={`${import.meta.env.VITE_BACKEND_URL}${
												item.roomImg || "/images/room-images/placeholder-image.jpg"
											}`}
											time={item.time_formatted}
											lastMessage={item.last_message}
											roomID={item._id}
										/>
									);
								})}
								<div
									className="flex flex-col items-center justify-center px-5 py-4 border-b-[1px] border-slate-300 cursor-pointer hover:bg-blue-500 group transition-all"
									title="Create new room"
									onClick={() => {
										setAddRoom(true);
									}}
								>
									<FaPlus className="text-4xl border-4 border-slate-500 rounded-full p-1 text-slate-500 group-hover:text-white group-hover:border-white"></FaPlus>
								</div>
							</div>
						)}
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
