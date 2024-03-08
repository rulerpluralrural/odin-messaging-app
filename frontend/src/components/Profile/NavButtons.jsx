import React from "react";
import { FaUserCircle, FaInfoCircle, FaUserFriends } from "react-icons/fa";

const buttonStyle =
	"flex gap-1 items-center justify-center text-xl text-slate-900 hover:bg-slate-300 py-5 w-full transition-colors";

const NavButtons = ({ button, setActiveButton, activeButton }) => {
	return (
		<>
			<button
				className={`${buttonStyle} ${
					activeButton === button
						? "bg-slate-300 border-b-2 border-blue-600"
						: "border-b-2 border-slate-400"
				}`}
				onClick={() => setActiveButton(button)}
			>
				{button === "Contact" ? (
					<FaInfoCircle />
				) : button === "About" ? (
					<FaUserCircle />
				) : (
					<FaUserFriends className="text-2xl" />
				)}
				{button}
			</button>
		</>
	);
};

export default NavButtons;
