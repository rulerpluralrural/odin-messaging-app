import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const NameInput = ({ user, handleChange }) => {
	return (
		<>
			<div>
				<label htmlFor="firstName" className="block">
					First Name:
				</label>
				<input
					type="text"
					className={inputControl}
					defaultValue={user.firstName}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="lastName" className="block">
					Last Name:
				</label>
				<input
					type="text"
					className={inputControl}
					defaultValue={user.lastName}
					onChange={handleChange}
				/>
			</div>
		</>
	);
};

export default NameInput;
