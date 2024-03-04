import React from "react";

const UsersCard = ({ user, selectedUser, setSelectedUser }) => {
	return (
		<div
			className={`${
				selectedUser === user._id ? "bg-blue-500 text-white" : "bg-slate-100"
			} flex gap-2 items-center text-slate-900 p-2 rounded-md cursor-pointer shadow-sm shadow-slate-300 w-full hover:bg-blue-500 group transition-colors`}
			onClick={() => {
				setSelectedUser(user._id);
			}}
		>
			<img
				src={user.profileImg}
				alt={`${user.firstName} Img`}
				className="rounded-full aspect-square bg-white text-xs text-slate-500 flex items-center justify-center w-[60px]"
			/>
			<div
				className={`${
					selectedUser === user._id
						? "text-white font-bold"
						: "text-black font-normal"
				} flex flex-col font-Roboto group-hover:text-white group-hover:font-bold`}
			>
				<p>
					{user.firstName} {user.lastName}
				</p>
				<p
					className={`${
						selectedUser === user._id
							? "text-white font-normal"
							: "text-slate-600"
					} group-hover:text-white group-hover:font-normal text-sm`}
				>
					{user.handle}
				</p>
				<p
					className={`${
						selectedUser === user._id
							? "text-white"
							: "text-slate-600"
					} font-bold text-sm text-slate-600 group-hover:text-white`}
				>
					{user.work}
				</p>
			</div>
		</div>
	);
};

export default UsersCard;
