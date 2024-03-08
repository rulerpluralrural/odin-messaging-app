import React from "react";
import AccessDenied from "./AccessDenied";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileBody from "../components/Profile/ProfileBody";

const Profile = ({ user }) => {
	console.log(user);
	if (!user) {
		return <AccessDenied />;
	}

	return (
		<div className="font-Roboto flex flex-col">
			<ProfileHeader user={user} />
			<ProfileBody user={user} />
		</div>
	);
};

export default Profile;
