import React from "react";
import { FaUser, FaMessage, FaM } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const buttonStyle =
	"flex items-center gap-1 hover:opacity-70 focus:opacity-70 transition-opacity cursor-pointer";

const Tooltip = ({ setUser }) => {
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await fetch("http://localhost:8000/api/v1/logout", {
				method: "POST",
				credentials: "include",
			});
			setUser(null);
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col gap-2 bg-white w-[125px] text-slate-900 rounded-lg py-3 px-2 font-sans">
			<div className={buttonStyle}>
				<FaUser className="opacity-70" />
				<Link to={"/profile"}>Profile</Link>
			</div>
			<div className={buttonStyle}>
				<FaMessage className="opacity-70" />
				<Link to={"/messages"}>Messages</Link>
			</div>
			<div className={buttonStyle}>
				<FaSignOutAlt className="opacity-70" />
				<a onClick={logout}>Logout</a>
			</div>
		</div>
	);
};

export default Tooltip;
