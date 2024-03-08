import React from "react";

const ProfileHeader = ({ user }) => {
	return (
		<div className="flex items-center justify-center py-10 bg-slate-100">
			<div className="flex flex-col text-center items-center justify-center gap-2">
				<img
					src={user.profileImg}
					alt={`${user.name}.jpg`}
					className="rounded-full h-[200px] w-[200px] object-cover  border-4 border-white shadow-md shadow-slate-400 self-center"
				/>
				<div className="w-[500px] ">
					<div className="flex gap-2 items-center justify-center">
						<h1 className="text-xl">
							{user.firstName} {user.lastName}
						</h1>
					</div>
					<div></div>
					<p className="text-2xl font-bold mt-1">{user.work}</p>
					<p>{user.about}</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
