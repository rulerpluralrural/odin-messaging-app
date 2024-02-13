import React from "react";
import { Link } from "react-router-dom";

const circle =
	"h-[13px] w-[13px] rounded-full bg-transparent border-2 border-yellow-200";

const Logo = () => {
	return (
		<>
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<div className={circle}></div>
					<div className={circle}></div>
					<div className={circle}></div>
				</div>
				<div className="font-bold text-2xl font-serif text-yellow-200">
					<Link to={"/"}>ChatS</Link>
				</div>
			</div>
		</>
	);
};

export default Logo;
