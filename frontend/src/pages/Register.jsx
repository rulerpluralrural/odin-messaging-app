import React from "react";
import { Link } from "react-router-dom";
import {
	FaRegCircleUser,
	FaAddressCard,
	FaEnvelope,
	FaLock,
	FaEye
} from "react-icons/fa6";

const formControl = "flex flex-col gap-1 text-lg relative";
const inputControl = "px-8 py-2 border-b-2 border-slate-700 w-full text-base";
const iconStyle = "absolute top-[41px] left-1 text-xl ";

const Register = () => {
	return (
		<div className="flex flex-col items-center self-center mt-10 w-[550px] gap-3">
			<h1 className="pb-5 text-4xl font-bold w-full text-center fons-serif underline">
				REGISTER
			</h1>
			<form className="flex flex-col gap-5 w-full">
				<div className={formControl}>
					<label htmlFor="firstName">First Name</label>
					<FaRegCircleUser className={iconStyle} />
					<input
						type="text"
						name="firstName"
						id="firstName"
						placeholder="Enter your first name"
						className={inputControl}
					/>
				</div>
				<div className={formControl}>
					<label htmlFor="lastName">Last Name</label>
					<FaRegCircleUser className={iconStyle} />
					<input
						type="text"
						name="lastName"
						id="lastName"
						placeholder="Enter your last name"
						className={inputControl}
					/>
				</div>
				<div className={formControl}>
					<label htmlFor="address">Address</label>
					<FaAddressCard className={iconStyle} />
					<input
						type="text"
						name="address"
						id="address"
						placeholder="Enter your home address"
						className={inputControl}
					/>
				</div>
				<div className={formControl}>
					<label htmlFor="email">Email</label>
					<FaEnvelope className={iconStyle} />
					<input
						type="text"
						name="email"
						id="email"
						placeholder="Enter your email address"
						className={inputControl}
					/>
				</div>
				<div className="flex flex-col gap-5">
					<div className={formControl}>
						<label htmlFor="password">Password</label>
						<FaLock className={iconStyle} />
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter your password"
							className={inputControl}
						/>
							<FaEye
							className="absolute top-10 right-2 text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity"
							onClick={() => {
								setShowPassword(!showPassword);
							}}
						/>
					</div>
					<div className={formControl}>
						<label htmlFor="password2">Confirm Password</label>
						<FaLock className={iconStyle} />
						<input
							type="password"
							name="password2"
							id="password2"
							placeholder="Confirm your password"
							className={inputControl}
						/>
							<FaEye
							className="absolute top-10 right-2 text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity"
							onClick={() => {
								setShowPassword(!showPassword);
							}}
						/>
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
