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

const iconStyle =
	"flex items-center text-left px-20 gap-3 cursor-pointer hover:bg-slate-200 focus:bg-slate-200 transition-colors py-3";

const Sidebar = () => {
	return (
		<div className="h-full flex flex-col py-10 text-lg font-Roboto text-slate-600 bg-white border-r-2 border-slate-300 shadow-lg shadow-slate-400">
			<div className={iconStyle}>
				<FaHome /> <p>Dashboard</p>
			</div>
			<div className={iconStyle}>
				<FaProjectDiagram /> <p>Projects</p>
			</div>
			<div className={iconStyle}>
				<FaList /> <p>Tasks</p>
			</div>
			<div className={iconStyle}>
				<FaUserFriends /> <p>Clients</p>
			</div>
			<div className={iconStyle}>
				<FaRegMessage /> <p>Chat</p>
			</div>
			<div className={iconStyle}>
				<FaBell /> <p>Activity</p>
			</div>
			<div className={iconStyle}>
				<FaCalendar /> <p>Calendar</p>
			</div>
			<div className={iconStyle}>
				<FaGear /> <p>Settings</p>
			</div>
			<div className={iconStyle}>
				<FaCube /> <p>Help</p>
			</div>
		</div>
	);
};

export default Sidebar;
