import React, { useState } from "react";
import NavButtons from "./NavButtons";

const ProfileBody = ({ user }) => {
	const [activeButton, setActiveButton] = useState("");
	const buttons = ["Contact", "About", "Friends"];

	return (
		<div className="bg-white flex flex-col items-center justify-center">
			<div className="flex items-center justify-between w-[500px]">
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
			<a
				className="text-blue-700 font-mono tracking-tightest text-sm cursor-pointer hover:text-blue-800 hover:underline self-end"
				title="Twitter"
				href="https://twitter.com/"
				target="_blank"
			>
				{user.handle}
			</a>
		</div>
	);
};

export default ProfileBody;
