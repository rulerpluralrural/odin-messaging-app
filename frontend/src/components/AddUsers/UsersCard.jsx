import React, { useState } from "react";

const UsersCard = ({ user, selectedUser, setSelectedUser }) => {
	return (
		<div
			className={`${
				selectedUser === user.handle ? "bg-blue-500 text-white" : "bg-slate-100"
			} flex gap-2 items-center text-slate-900 p-2 rounded-md cursor-pointer shadow-sm shadow-slate-300 w-full hover:bg-blue-500 group transition-colors`}
			onClick={() => {
				setSelectedUser(user.handle);
			}}
		>
			<img
				src={user.profileImg}
				alt={`${user.firstName} Img`}
				className="rounded-full aspect-square bg-white text-xs text-slate-500 flex items-center justify-center w-[60px]"
			/>
			<div
				className={`${
					selectedUser === user.handle ? "text-white font-bold" : "text-black font-normal"
				} flex flex-col gap-1 font-Roboto group-hover:text-white group-hover:font-bold`}
			>
				<p>
					{user.firstName} {user.lastName}
				</p>
				<p
					className={`${
						selectedUser === user.handle ? "text-white font-normal" : "text-slate-600"
					} group-hover:text-white group-hover:font-normal`}
				>
					{user.handle}
				</p>
				<p className="font-bold">{user.work}</p>
			</div>
		</div>
	);
};

export default UsersCard;
