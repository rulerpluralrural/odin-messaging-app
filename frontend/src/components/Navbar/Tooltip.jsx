import React from "react";
import { FaUser } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const buttonStyle= "flex items-center gap-1 hover:opacity-70 focus:opacity-70 transition-opacity cursor-pointer"

const Tooltip = () => {
	return (
		<div className="flex flex-col gap-2 bg-white w-[100px] text-slate-900 rounded-lg py-3 px-2 font-sans ">
			<div className={buttonStyle}>
				<FaUser className="opacity-70" />
				<Link to={"/profile"}>Profile</Link>
			</div>
			<div className={buttonStyle}>
				<FaSignOutAlt className="opacity-70" />
				<a>Logout</a>
			</div>
		</div>
	);
};

export default Tooltip;
