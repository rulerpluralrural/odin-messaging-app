import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Logo from "./Logo";
import NavButtons from "./NavButtons";
import Popover from "./Popover";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser, loadingSession }) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<nav className="flex items-center justify-between text-blue-800 border-b-[1px] border-slate-300 shadow-md shadow-slate-300 z-10 bg-white">
			<Logo />
			{loadingSession ? (
				<div className="flex items-center py-3 px-4 mr-10">
					<ClipLoader color="blue" className="self-center" size={50} />
				</div>
			) : (
				<div className="flex items-center justify-between px-4 py-3">
					{user ? (
						<div>
							<div className="flex items-center gap-2 relative">
								<div className="font-bold font-serif">Hello {user.name}!</div>
								<div
									className="w-[50px] aspect-square rounded-full bg-slate-300 flex items-center justify-center text-sm cursor-pointer"
									onClick={() => navigate("/profile")}
								>
									<img
										src={user.profileImg}
										alt={`${user.name} img`}
										className="object-fit text-xs text-center"
									/>
								</div>
								<Popover isPopoverOpen={isPopoverOpen} setIsPopoverOpen={setIsPopoverOpen} setUser={setUser}/>
								<FaChevronDown
									className="cursor-pointer text-sm"
									onClick={() => setIsPopoverOpen(!isPopoverOpen)}
								></FaChevronDown>
							</div>
						</div>
					) : (
						<NavButtons />
					)}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
