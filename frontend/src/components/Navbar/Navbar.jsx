import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { Popover } from "react-tiny-popover";
import Logo from "./Logo";
import NavButtons from "./NavButtons";
import Tooltip from "./Tooltip";
import { ClipLoader } from "react-spinners";

const Navbar = ({ user, setUser, loadingSession }) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	return (
		<div className="flex items-center justify-between bg-purple-700 py-2 px-4 text-white">
			<Logo />
			{loadingSession ? (
				<ClipLoader color="#FBEC5D"/>
			) : (
				<div>
					{user ? (
						<div className="flex items-center gap-3">
							<FaGear className="cursor-pointer text-lg"></FaGear>
							<Popover
								isOpen={isPopoverOpen}
								positions={["bottom"]}
								padding={5}
								align="end"
								content={<Tooltip setUser={setUser} />}
							>
								<div
									onClick={() => setIsPopoverOpen(!isPopoverOpen)}
									className="w-[50px] aspect-square cursor-pointer bg-slate-300"
								></div>
							</Popover>
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
