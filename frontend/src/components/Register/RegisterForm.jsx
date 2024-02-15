import { Link } from "react-router-dom";
import {
	FaRegCircleUser,
	FaAddressCard,
	FaEnvelope,
	FaLock,
	FaEye,
} from "react-icons/fa6";

const formControl = "flex flex-col gap-1 text-lg relative";
const inputControl = "px-8 py-2 border-2 border-slate-400 rounded-md w-full text-base";
const iconStyle = "absolute top-[45px] left-2 text-xl opacity-50";

const RegisterForm = ({
	handleChange,
	handleSubmit,
	firstName,
	lastName,
	address,
	email,
	password,
	password2,
	showPassword1,
	showPassword2,
	setShowPassword1,
	setShowPassword2,
	errorMsg,
}) => {
	console.log(errorMsg)
	return (
		<div className="flex flex-col gap-5 bg-white px-8 py-7 w-[620px] shadow-md shadow-slate-800 rounded-md">
			<form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
				<h1 className="pb-5 text-4xl font-bold w-full text-center fons-serif underline">
					REGISTER
				</h1>
				<div className="flex justify-between">
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
				<div className="flex justify-between ">
					<div className={formControl}>
						<label htmlFor="password">Password</label>
						<FaLock className={iconStyle} />
						<input
							type={showPassword1 ? "text" : "password"}
							name="password"
							id="password"
							value={password}
							placeholder="Enter password"
							className={inputControl}
							onChange={handleChange}
						/>
						<FaEye
							className="absolute top-11 right-2 text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity"
							title="Show Password"
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
							placeholder="Confirm password"
							className={inputControl}
							onChange={handleChange}
						/>
						<FaEye
							className="absolute top-11 right-2 text-[1.4rem] cursor-pointer hover:opacity-70 transition-opacity"
							title="Show Password"
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
			{errorMsg.length > 0 && (
				<ul className="text-left rounded-sm bg-red-300 w-full px-5 py-3">
					{errorMsg.map((item, index) => {
						return (
							<li key={index} className=" list-disc list-inside">
								{item.msg}
							</li>
						);
					})}
				</ul>
			)}
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
	);
};

export default RegisterForm;
