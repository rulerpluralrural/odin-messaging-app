import React from "react";
import { Link } from "react-router-dom";

const LoggedIn = () => {
	return (
		<div className="py-10 h-full flex flex-col items-center">
			<div className="bg-white mt-28 p-10 rounded-md text-center flex flex-col justify-around shadow-lg shadow-slate-400">
				<h1 className="font-serif text-4xl">You are already logged in!</h1>
				<Link
					to="/"
					className="p-3 text-blue-600 hover:text-blue-700 hover:underline focus:text-blue-700 focus:underline"
				>
					Go back to home page...
				</Link>
			</div>
		</div>
	);
};

export default LoggedIn;
