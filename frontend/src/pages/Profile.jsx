import React from "react";
import AccessDenied from "./AccessDenied";

const Profile = ({ user }) => {

	if (!user) {
		return <AccessDenied />;
	}

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-center py-10">
        <div>
            <img src={user.profileImg} alt={`${user.name}.jpg`} className="rounded-full h-[300px] aspect-square object-cover  border-4 border-white shadow-md shadow-slate-400"/>
        </div>
      
      </div>
		</div>
	);
};

export default Profile;
