import React from "react";
import { FaRegCircleUser, FaLock, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const inputControl = "px-8 py-2 border-b-2 border-slate-700 w-full";

const Login = () => {
	return (
		<div className="flex flex-col items-center self-center h-screen mt-20 w-[500px] gap-3">
			<h1 className="pb-5 text-4xl font-bold w-full text-center fons-serif underline">
				LOGIN
			</h1>
			<form className="flex flex-col gap-5 w-full">
				<div>
					<label htmlFor="email" className="text-xl">
						Email
					</label>
					<div className="relative">
						<FaRegCircleUser className="absolute top-2 left-1 text-xl " />
						<input
							type="text"
							name="email"
							id="email"
							placeholder="Enter your email"
							className={inputControl}
						/>
					</div>
				</div>
				<div>
					<label htmlFor="password" className="text-xl">
						Password
					</label>
					<div className="relative">
						<FaLock className="absolute top-3 left-1 text-lg " />
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter your password"
							className={inputControl}
						/>
						<FaEye className="absolute top-3 right-2 text-xl cursor-pointer hover:opacity-70 transition-opacity" />
					</div>
				</div>
				<button type="submit" className="bg-slate-900 text-white p-2 rounded-sm text-lg hover:bg-slate-800 focus:bg-slate-800 transition-colors">
					LOGIN
				</button>
			</form>
			<div className="w-full text-center">
				<p>Don't have an  account yet?</p>
				<Link to={"/register"} className="font-bold hover:underline hover:text-blue-500 focus:underline focus:text-blue-500 ">Sign up</Link>
			</div>
		</div>
	);
};

export default Login;
