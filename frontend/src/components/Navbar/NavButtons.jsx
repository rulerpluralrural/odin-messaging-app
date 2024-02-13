import React from "react";
import { Link } from "react-router-dom";

const NavButtons = () => {
	return (
		<>
			<div className="flex justify-between items-center font-bold font-serif text-lg gap-1">
				<Link
					to={"/login"}
					className="hover:bg-yellow-500 focus:bg-yellow-500 p-2 rounded-md"
				>
					LOGIN
				</Link>
				<Link
					to={"/register"}
					className="hover:bg-yellow-500 focus:bg-yellow-500 p-2 rounded-md"
				>
					SIGN-UP
				</Link>
			</div>
		</>
	);
};

export default NavButtons;
