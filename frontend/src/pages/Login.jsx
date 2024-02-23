import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedIn from "../components/Login/LoggedIn";
import { ClipLoader } from "react-spinners";
import LoginForm from "../components/Login/LoginForm";

const Login = ({ setUser, user, setRefreshKey }) => {
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
				setRefreshKey((prev) => prev + 1);
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
			<div className="flex items-center justify-center h-screen bg-slate-100">
				<ClipLoader size={100} color="purple" />
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center self-center gap-3 bg-slate-100 w-full h-screen">
			<LoginForm
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				email={email}
				password={password}
				showPassword={showPassword}
				setShowPassword={setShowPassword}
				errorMsg={errorMsg}
			/>
		</div>
	);
};

export default Login;
