import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const NameInput = ({ handleChange, firstName, lastName }) => {
	return (
		<>
			<div>
				<label htmlFor="firstName" className="block">
					First Name:
				</label>
				<input
					type="text"
					name="firstName"
					className={inputControl}
					defaultValue={firstName}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="lastName" className="block">
					Last Name:
				</label>
				<input
					type="text"
					name="lastName"
					className={inputControl}
					defaultValue={lastName}
					onChange={handleChange}
					required
				/>
			</div>
		</>
	);
};

export default NameInput;
