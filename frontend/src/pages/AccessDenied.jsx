import React from "react";
import { Link } from "react-router-dom";
import { FaFrown } from "react-icons/fa";

const AccessDenied = () => {
	return (
		<div className="h-screen flex items-center  mt-20 flex-col gap-5">
			<div className=" bg-white p-10 flex flex-col items-center w-[500px] h-[350px] rounded-sm shadow-md shadow-slate-400 justify-around">
				<FaFrown className="text-6xl text-slate-600" />
				<div className="text-center">
					<h1 className="text-2xl font-sans font-bold">Access denied!</h1>
					<p className="text-slate-500">You need to login to view this page</p>
				</div>

				<Link
					to={"/login"}
					className="bg-blue-600 rounded-sm text-white px-10 py-1 text-center hover:bg-blue-700 focus:bg-blue-700"
				>
					Login
				</Link>
			</div>
		</div>
	);
};

export default AccessDenied;
