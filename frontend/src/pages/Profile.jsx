import React from "react";
import AccessDenied from "./AccessDenied";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileBody from "../components/Profile/ProfileBody";
import { PulseLoader } from "react-spinners";

const Profile = ({ user, loadingInfo }) => {
	if (loadingInfo) {
		return <PulseLoader size={15} color="#0D98BA" />;
	}
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
