import React, { useState } from "react";
import { FaRegCircleUser, FaLock, FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import LoggedIn from "../components/Login/LoggedIn";
import { ClipLoader } from "react-spinners";

const inputControl = "px-8 py-2 border-b-2 border-slate-700 w-full";

const Login = ({ setUser, user }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	const [errorMsg, setErrorMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const response = await fetch("http://localhost:8000/api/v1/login", {
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
			} else {
				setErrorMsg(response.message);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	if (user) {
		return <LoggedIn />;
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<ClipLoader size={100} color="purple" />
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center self-center h-screen mt-20 w-[500px] gap-3">
			<h1 className="pb-5 text-4xl font-bold w-full text-center fons-serif underline">
				LOGIN
			</h1>
			<form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-1">
					<label htmlFor="email" className="text-xl">
						Email
					</label>
					<div className="relative">
						<FaRegCircleUser className="absolute top-[11px] left-1 text-xl " />
						<input
							type="text"
							name="email"
							id="email"
							placeholder="Enter your email"
							value={email}
							className={inputControl}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="password" className="text-xl">
						Password
					</label>
					<div className="relative">
						<FaLock className="absolute top-[11px] left-1 text-lg " />
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							placeholder="Enter your password"
							value={password}
							className={inputControl}
							onChange={handleChange}
						/>
						<FaEye
							className="absolute top-3 right-2 text-[1.5rem] cursor-pointer hover:opacity-70 transition-opacity"
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
					LOGIN
				</button>
			</form>
			{errorMsg && (
				<div className="bg-red-300 w-full text-center p-2 font-bold rounded-sm">
					<p>{errorMsg}</p>
				</div>
			)}
			<div className="w-full text-center">
				<p>Don't have an account yet?</p>
				<Link
					to={"/register"}
					className="font-bold hover:underline hover:text-blue-500 focus:underline focus:text-blue-500 "
				>
					Sign up
				</Link>
			</div>
		</div>
	);
};

export default Login;
