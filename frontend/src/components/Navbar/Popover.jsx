import React from "react";
import { FaUser, FaMessage, FaM } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const buttonStyle =
	"flex items-center gap-1 hover:bg-slate-200 focus:bg-slate-200 transition-colors cursor-pointer py-1 px-2";

const Popover = ({ setUser, isPopoverOpen, setIsPopoverOpen }) => {
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
		<div
			className={`${
				!isPopoverOpen ? "hidden" : "flex flex-col"
			} bg-white w-[125px] text-slate-700 rounded-lg font-sans absolute top-14 right-5 z-20`}
		>
			<div className={`${buttonStyle} rounded-t-lg`}>
				<FaUser className="opacity-90" />
				<Link
					to={"/profile"}
					onClick={() => {
						setIsPopoverOpen(false);
					}}
				>
					Profile
				</Link>
			</div>
			<div className={buttonStyle}>
				<FaMessage className="opacity-90" />
				<Link
					to={"/messages"}
					onClick={() => {
						setIsPopoverOpen(false);
					}}
				>
					Messages
				</Link>
			</div>
			<div className={`${buttonStyle} rounded-b-lg`}>
				<FaSignOutAlt
					className="opacity-90"
					onClick={() => {
						setIsPopoverOpen(false);
					}}
				/>
				<p>Logout</p>
			</div>
		</div>
	);
};

export default Popover;
