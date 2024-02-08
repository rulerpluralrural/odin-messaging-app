import React from "react";
import { FaRegCircleUser, FaLock, FaEye } from "react-icons/fa6";

const inputControl = "px-8 py-2 border-b-2 border-slate-700";

const Login = () => {
	return (
		<div className="flex flex-col items-center justify-center self-center">
			<h1>LOGIN</h1>
			<form className="flex flex-col">
				<label htmlFor="email" className="text-lg">
					Email
				</label>
				<div className="relative">
					<FaRegCircleUser className="absolute top-2 left-1 text-2xl " />
					<input
						type="text"
						name="email"
						id="email"
						placeholder="Enter your email"
						className={inputControl}
					/>
				</div>
				<label htmlFor="password" className="text-lg">
					Password
				</label>
				<div className="relative">
					<FaLock className="absolute top-2 left-1 text-xl " />
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Enter your password"
						className={inputControl}
					/>
					<FaEye className="absolute top-2 right-2 text-xl cursor-pointer"/>
				</div>

				<button type="submit">LOGIN</button>
			</form>
			<div>
				<p>No account yet?</p>
				<button>SIGN UP</button>
			</div>
		</div>
	);
};

export default Login;
