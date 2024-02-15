import React from "react";
import { Link } from "react-router-dom";

const NavButtons = () => {
	return (
		<>
			<div className="flex justify-between items-center font-bold font-Roboto text-lg gap-1">
				<Link
					to={"/login"}
					className="group relative inline-block overflow-hidden rounded-sm border tracking-wider
					border-none bg-transparent px-10 py-2 hover:text-yellow-300 focus:outline-none focus:ring
					active:bg-purple-600 active:text-white"
				>
					<span class="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full"></span>
					<span class="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-200 group-hover:h-full"></span>
					<span class="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-200 group-hover:w-full"></span>
					<span class="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-200 group-hover:h-full"></span>
					LOGIN
				</Link>
				<Link
					to={"/register"}
					className="group relative inline-block overflow-hidden rounded-sm border tracking-wider
					border-none bg-transparent px-10 py-2 hover:text-yellow-300 focus:outline-none focus:ring
					active:bg-purple-600 active:text-white"
				>
					<span class="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full"></span>
					<span class="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-200 group-hover:h-full"></span>
					<span class="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-200 group-hover:w-full"></span>
					<span class="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-200 group-hover:h-full"></span>
					SIGN-UP
				</Link>
			</div>
		</>
	);
};

export default NavButtons;
