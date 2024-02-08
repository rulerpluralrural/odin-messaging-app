import { FaGear } from "react-icons/fa6";

const circle = "h-[15px] w-[15px] rounded-full bg-transparent border-[1px] border-slate-200";

const Navbar = () => {
	return (
		<div className="flex justify-between bg-purple-700 py-3 px-4 text-white">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<div className={circle}></div>
					<div className={circle}></div>
					<div className={circle}></div>
				</div>
				<div>LOGO</div>
			</div>
			<div className="flex items-center gap-3">
				<FaGear className="cursor-pointer text-lg"></FaGear>
				<div>PROFILE</div>
			</div>
		</div>
	);
};

export default Navbar;
