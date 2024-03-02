import React, { useState } from "react";

const UsersCard = ({ user, selectedUser, setSelectedUser }) => {
    console.log(selectedUser)
	return (
		<div
			className={`flex gap-2 items-center bg-slate-100 text-slate-900 p-2 rounded-md cursor-pointer shadow-sm shadow-slate-300 ${
				selectedUser === user.handle && "bg-blue-300"
			}`}
			onClick={() => {
				setSelectedUser(user.handle);
			}}
		>
			<img
				src={user.profileImg}
				alt={`${user.firstName} Img`}
				className="rounded-full aspect-square bg-white text-xs text-slate-500 flex items-center justify-center w-[60px]"
			/>
			<div className="flex flex-col gap-1 font-Roboto">
				<p>
					{user.firstName} {user.lastName}
				</p>
				<p className="text-slate-600">{user.handle}</p>
				<p className="font-bold">{user.work}</p>
			</div>
		</div>
	);
};

export default UsersCard;
