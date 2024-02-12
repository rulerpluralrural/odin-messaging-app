import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Popover } from "react-tiny-popover";

const circle =
	"h-[13px] w-[13px] rounded-full bg-transparent border-[1px] border-slate-200";

const Navbar = ({ user }) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	return (
		<div className="flex justify-between bg-purple-700 py-3 px-4 text-white">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<div className={circle}></div>
					<div className={circle}></div>
					<div className={circle}></div>
				</div>
				<div className="font-bold text-2xl font-serif text-yellow-300">
					<Link to={"/"}>ChatS</Link>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<FaGear className="cursor-pointer text-lg"></FaGear>
				{user ? (
					<Popover
						isOpen={isPopoverOpen}
						positions={"bottom"}
						content={
							<div className="flex flex-col bg-purple-500 text-yellow-300 rounded-lg p-3 ">
								<Link to={"/profile"}>Profile</Link>
								<Link>Logout</Link>
							</div>
						}
					>
						<div onClick={() => setIsPopoverOpen(!isPopoverOpen)} className="w-[50px] aspect-square cursor-pointer bg-slate-300"></div>
					</Popover>
				) : (
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
				)}
			</div>
		</div>
	);
};

export default Navbar;
