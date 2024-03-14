import React from "react";
import { FaUser, FaMessage, FaM } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const buttonStyle =
	"flex items-center gap-1 hover:bg-slate-200 focus:bg-slate-200 transition-colors cursor-pointer py-2 px-3";

const Popover = ({ setUserInfo, setUserSession, isPopoverOpen, setIsPopoverOpen }) => {
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await fetch("http://localhost:8000/api/v1/logout", {
				method: "POST",
				credentials: "include",
			});
			setUserInfo(null);
			setUserSession(null)
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={`${
				!isPopoverOpen ? "hidden" : "flex flex-col"
			} bg-white w-[140px] text-slate-700 rounded-lg font-sans absolute top-14 right-10 shadow-sm shadow-slate-600`}
		>
			<Link
				className={`${buttonStyle} rounded-t-lg`}
				to={"/profile"}
				onClick={() => {
					setIsPopoverOpen(false);
				}}
			>
				<FaUser className="opacity-90" />
				Profile
			</Link>
			<Link
				className={buttonStyle}
				to={"/messages"}
				onClick={() => {
					setIsPopoverOpen(false);
				}}
			>
				<FaMessage className="opacity-90" />
				Messages
			</Link>
			<Link
				className={`${buttonStyle} rounded-b-lg`}
				onClick={() => {
					setIsPopoverOpen(false);
					logout();
				}}
			>
				<FaSignOutAlt className="opacity-90" />
				Logout
			</Link>
		</div>
	);
};

export default Popover;
