import React, { useState } from "react";
import NavButtons from "./NavButtons";
import Contact from "./Contact";
import About from "./About";
import FriendsList from "./FriendsList";
import EditProfile from "./EditProfile";

const ProfileBody = ({ user }) => {
	const [activeButton, setActiveButton] = useState("About");
	const [editProfile, setEditProfile] = useState(false);
	const buttons = ["Contact", "About", "Friends"];

	return (
		<div className="bg-white flex flex-col items-center justify-center">
			<div className="flex items-center justify-between w-[500px] font-sans">
				{buttons.map((button, index) => {
					return (
						<NavButtons
							key={index}
							button={button}
							setActiveButton={setActiveButton}
							activeButton={activeButton}
						/>
					);
				})}
			</div>{" "}
			<div className="flex flex-col w-[500px] py-5 gap-2 font-Roboto">
				{editProfile ? (
					<EditProfile user={user} setEditProfile={setEditProfile}/>
				) : (
					<div>
						{activeButton === "Contact" ? (
							<Contact user={user} />
						) : activeButton === "About" ? (
							<About user={user} />
						) : (
							<FriendsList />
						)}
						{activeButton !== "Friends" && (
							<button
								className="py-1 mt-2 w-full bg-blue-600 text-white text-lg font-Roboto rounded-sm hover:bg-blue-700 transition-colors"
								onClick={() => setEditProfile(true)}
							>
								Edit Profile
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileBody;
