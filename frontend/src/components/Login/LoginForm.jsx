import { FaRegCircleUser, FaLock, FaEye } from "react-icons/fa6";
import {Link} from "react-router-dom"

const inputControl = "px-8 py-2 border-b-2 border-slate-700 w-full";

const LoginForm = ({handleChange, handleSubmit, email, password, showPassword, setShowPassword, errorMsg}) => {
	return (
		<div className="w-[500px] bg-white mt-20 px-8 py-10 rounded-md shadow-md shadow-slate-800 flex flex-col gap-5">
			<form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
				<h1 className="pb-5 text-4xl font-bold w-full text-center fons-serif underline">
					LOGIN
				</h1>
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
				<ul className="bg-red-300 w-full text-left px-5 py-2 rounded-sm">
					<li className="list-disc list-inside">{errorMsg}</li>
				</ul>
			)}
			<div className="w-full text-center text-blue-950">
				<p className="text-sm">Don't have an account yet?</p>
				<Link
					to={"/register"}
					className="font-bold hover:underline focus:underline "
				>
					Sign up
				</Link>
			</div>
		</div>
	);
};

export default LoginForm;
