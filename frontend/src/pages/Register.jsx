import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	FaRegCircleUser,
	FaAddressCard,
	FaEnvelope,
	FaLock,
	FaEye,
} from "react-icons/fa6";
import { ClipLoader } from "react-spinners";

const formControl = "flex flex-col gap-1 text-lg relative";
const inputControl = "px-8 py-2 border-b-2 border-slate-700 w-full text-base";
const iconStyle = "absolute top-[41px] left-1 text-xl ";

const Register = ({ setUser, user }) => {
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState([]);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		address: "",
		email: "",
		password: "",
		password2: "",
	});
	const { firstName, lastName, address, email, password, password2 } = formData;
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: [e.target.value],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);

			const response = await fetch("http://localhost:8000/api/v1/register", {
				method: "POST",
				body: JSON.stringify(formData),
				credentials: "include",
				headers: {
					["Content-Type"]: "application/json; charset=utf-8",
				},
			}).then((res) => res.json());
			setLoading(false);

			if (response.token) {
				setUser(response.user);
				navigate("/");
			} else if (response.messages) {
				response.messages.forEach((message) => {
					setErrorMsg((prevState) => [...prevState, message.msg]);
				});
			} else {
				setErrorMsg(response.message);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen bg-slate-100">
				<ClipLoader size={100} color="purple" />
			</div>
		);
	}
	console.log(errorMsg);

	return (
		<div className="flex flex-col items-center self-center w-full flex-1 gap-3 bg-slate-100 py-10">
			<div className="flex flex-col gap-5 bg-white px-8 py-7 w-[550px] shadow-md shadow-slate-800 rounded-md">
				<form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
					<h1 className="pb-5 text-4xl font-bold w-full text-center fons-serif underline">
						REGISTER
					</h1>
					<div className={formControl}>
						<label htmlFor="firstName">First Name</label>
						<FaRegCircleUser className={iconStyle} />
						<input
							type="text"
							name="firstName"
							id="firstName"
							value={firstName}
							placeholder="Enter your first name"
							className={inputControl}
							onChange={handleChange}
						/>
					</div>
					<div className={formControl}>
						<label htmlFor="lastName">Last Name</label>
						<FaRegCircleUser className={iconStyle} />
						<input
							type="text"
							name="lastName"
							id="lastName"
							value={lastName}
							placeholder="Enter your last name"
							className={inputControl}
							onChange={handleChange}
						/>
					</div>
					<div className={formControl}>
						<label htmlFor="address">Address</label>
						<FaAddressCard className={iconStyle} />
						<input
							type="text"
							name="address"
							id="address"
							value={address}
							placeholder="Enter your home address"
							className={inputControl}
							onChange={handleChange}
						/>
					</div>
					<div className={formControl}>
						<label htmlFor="email">Email</label>
						<FaEnvelope className={iconStyle} />
						<input
							type="text"
							name="email"
							id="email"
							value={email}
							placeholder="Enter your email address"
							className={inputControl}
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col gap-5">
						<div className={formControl}>
							<label htmlFor="password">Password</label>
							<FaLock className={iconStyle} />
							<input
								type={showPassword1 ? "text" : "password"}
								name="password"
								id="password"
								value={password}
								placeholder="Enter your password"
								className={inputControl}
								onChange={handleChange}
							/>
							<FaEye
								className="absolute top-10 right-2 text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity"
								onClick={() => {
									setShowPassword1(!showPassword1);
								}}
							/>
						</div>
						<div className={formControl}>
							<label htmlFor="password2">Confirm Password</label>
							<FaLock className={iconStyle} />
							<input
								type={showPassword2 ? "text" : "password"}
								name="password2"
								id="password2"
								value={password2}
								placeholder="Confirm your password"
								className={inputControl}
								onChange={handleChange}
							/>
							<FaEye
								className="absolute top-10 right-2 text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity"
								onClick={() => {
									setShowPassword2(!showPassword2);
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
				<ul>
					{errorMsg.map((item, index) => {
						return (
							<li
								key={index}
								className="bg-red-300 w-full text-center p-2 font-bold rounded-sm"
							>
								{item}
							</li>
						);
					})}
				</ul>

				<div className="w-full text-center text-blue-950">
					<p className="text-sm">Already have an account?</p>
					<Link
						to={"/login"}
						className="font-bold hover:underline focus:underline"
					>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
