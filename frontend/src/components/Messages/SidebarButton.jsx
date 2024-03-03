import React from "react";
import {
	FaHome,
	FaProjectDiagram,
	FaUserFriends,
	FaList,
	FaBell,
	FaCalendar,
	FaCube,
} from "react-icons/fa";
import { FaRegMessage, FaGear } from "react-icons/fa6";

const SidebarButton = ({ button, setActiveButton, activeButton }) => {
	return (
		<div
			className={`hover:bg-blue-400 hover:text-white border-y-[1px] border-white  ${
				activeButton === button.id && "bg-blue-400 text-white"
			} flex items-center text-left px-20 gap-3 cursor-pointer transition-colors py-3 `}
            title="Decoration Only"
			onClick={() => {
				setActiveButton(button.id);
			}}
		>
			{button.name === "Dashboard" ? (
				<FaHome />
			) : button.name === "Projects" ? (
				<FaProjectDiagram />
			) : button.name === "Tasks" ? (
				<FaList />
			) : button.name === "Clients" ? (
				<FaUserFriends />
			) : button.name === "Chat" ? (
				<FaRegMessage />
			) : button.name === "Activity" ? (
				<FaBell />
			) : button.name === "Calendar" ? (
				<FaCalendar />
			) : button.name === "Settings" ? (
				<FaGear />
			) : (
				<FaCube />
			)}
			<p>{button.name}</p>
		</div>
	);
};

export default SidebarButton;
