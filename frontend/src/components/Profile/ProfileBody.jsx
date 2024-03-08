import React, { useState } from "react";
import NavButtons from "./NavButtons";
import Contact from "./Contact";
import About from "./About";
import FriendsList from "./FriendsList";

const ProfileBody = ({ user }) => {
	const [activeButton, setActiveButton] = useState("");
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
			</div>
			<div className="flex flex-col w-[500px] py-5 gap-2 font-Roboto">
				{activeButton === "Contact" ? (
					<Contact user={user}/>
				) : activeButton === "About" ? (
					<About user={user}/>
				) : (
					<FriendsList />
				)}
			</div>
		</div>
	);
};

export default ProfileBody;
