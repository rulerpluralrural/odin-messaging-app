import React from "react";
import AccessDenied from "./AccessDenied";

const Profile = ({ user }) => {
	console.log(user);
	if (!user) {
		return <AccessDenied />;
	}

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-center py-10">
				<div className="flex flex-col text-center gap-2">
					<img
						src={user.profileImg}
						alt={`${user.name}.jpg`}
						className="rounded-full h-[300px] w-[300px] object-cover  border-4 border-white shadow-md shadow-slate-400 self-center"
					/>
					<div className="w-[500px] ">
						<div className="flex gap-2 items-center justify-center">
							<h1 className="text-xl font-Roboto">
								{user.firstName} {user.lastName}
							</h1>
							<a
								className="text-blue-700 text-sm cursor-pointer hover:text-blue-800 hover:underline"
								title="Twitter"
								href="https://twitter.com/"
								target="_blank"
							>
								{user.handle}
							</a>
						</div>

						<p className="text-2xl font-bold">{user.work}</p>
						<p>{user.about}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
