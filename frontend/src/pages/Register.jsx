import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import RegisterForm from "../components/Register/RegisterForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState({});
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
	const navigate = useNavigate()

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

			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/register`, {
				method: "POST",
				body: JSON.stringify(formData),
				credentials: "include",
				headers: {
					["Content-Type"]: "application/json; charset=utf-8",
				},
			}).then((res) => res.json());
			setLoading(false);

			if (response.token) {
				navigate("/login");
			} else if (response.messages) {
				setErrorMsg(response.messages)
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

	return (
		<div className="flex flex-col items-center self-center w-full flex-1 gap-3 bg-slate-100 py-10">
			<RegisterForm
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				firstName={firstName}
				lastName={lastName}
				address={address}
				email={email}
				password={password}
				password2={password2}
				showPassword1={showPassword1}
				showPassword2={showPassword2}
				setShowPassword1={setShowPassword1}
				setShowPassword2={setShowPassword2}
				errorMsg={errorMsg}
			/>
		</div>
	);
};

export default Register;
