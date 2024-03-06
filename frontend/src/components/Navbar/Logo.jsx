import React from "react";
import { Link } from "react-router-dom";

const circle =
	"h-[13px] w-[13px] rounded-full bg-transparent border-2 ";

const Logo = () => {
	return (
		<div className="flex items-center justify-center gap-3 w-[300px] border-r-[1px] border-slate-300 h-[75px] overflow-hidden">
			<div className="flex items-center gap-2">
				<div className={`${circle} border-blue-600`} ></div>
				<div className={`${circle} border-red-800`}></div>
				<div className={`${circle} border-green-400`}></div>
			</div>
			<div className="font-bold text-3xl font-CroissantOne text-blue-800">
				<Link to={"/"}>ChatS</Link>
			</div>
		</div>
	);
};

export default Logo;
