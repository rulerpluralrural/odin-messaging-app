import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Logo from "./Logo";
import NavButtons from "./NavButtons";
import Popover from "./Popover";
import { ClipLoader } from "react-spinners";

const Navbar = ({ user, setUser, loadingInfo }) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	return (
		<div className="grid grid-cols-[300px_1fr] items-center justify-between text-slate-900 bg-white w-full shadow-slate-400 shadow-md  relative">
			<Logo />
			{loadingInfo ? (
				<div className="flex items-center justify-end py-3 px-4 mr-10 w-full">
					<ClipLoader color="blue" className="self-center" size={50} />
				</div>
			) : (
				<div className="flex items-center justify-end px-4 py-3 w-full">
					{user ? (
						<div>
							<div className="flex items-center gap-2 relative px-10 text-blue-700">
								<div className="font-bold font-serif">Hello, {user.firstName}!</div>
								<div className="w-[50px] aspect-square rounded-full bg-slate-300 border-slate-50 border-[1px] flex items-center text-sm">
									<img
										src={user.profileImg}
										alt={`${user.firstName}.jpg`}
										className="object-cover text-xs rounded-full aspect-square"
									/>
								</div>
								<Popover
									isPopoverOpen={isPopoverOpen}
									setIsPopoverOpen={setIsPopoverOpen}
									setUser={setUser}
								/>
								<FaChevronDown
									className="cursor-pointer text-xs font-bold"
									onClick={() => setIsPopoverOpen(!isPopoverOpen)}
								></FaChevronDown>
							</div>
						</div>
					) : (
						<NavButtons />
					)}
				</div>
			)}
		</div>
	);
};

export default Navbar;
