import React from "react";
import {Link} from "react-router-dom"

const Register = () => {
	return (
		<div className="flex flex-col items-center self-center h-screen mt-20 w-[500px] gap-3">
			<h1 className="pb-5 text-4xl font-bold w-full text-center fons-serif underline">
				REGISTER
			</h1>
			<form className="flex flex-col gap-5 w-full">
				<div>
					<h1>Name</h1>
					<div>
						<input type="text" name="firstName" id="firstName" />
						<label htmlFor="firstName">First</label>
					</div>
					<div>
						<input type="text" name="lastName" id="lastName" />
						<label htmlFor="lastName">Last</label>
					</div>
				</div>
				<div>
					<label htmlFor="address">Address</label>
					<input type="text" name="address" id="address" />
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input type="text" name="email" id="email" />
				</div>
				<div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="password" name="password" id="password" />
					</div>
					<div>
						<label htmlFor="password2">Confirm Password</label>
						<input type="password" name="password2" id="password2" />
					</div>
				</div>
				<button
					type="submit"
					className="bg-slate-900 text-white p-2 rounded-sm text-lg hover:bg-slate-800 focus:bg-slate-800 transition-colors"
				>
					REGISTER
				</button>
			</form>
			<div className="w-full text-center">
				<p>Already have an account?</p>
				<Link
					to={"/login"}
					className="font-bold hover:underline hover:text-blue-500 focus:underline focus:text-blue-500 "
				>
					Login
				</Link>
			</div>
		</div>
	);
};

export default Register;
