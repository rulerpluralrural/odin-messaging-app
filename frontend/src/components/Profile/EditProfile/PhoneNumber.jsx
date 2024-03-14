import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const PhoneNumber = ({ user, handleChange }) => {
	return (
		<>
			<div>
				<label htmlFor="phoneNumber">Phone Number:</label>
				<input
					type="text"
					className={inputControl}
					defaultValue={user.phoneNumber}
					onChange={handleChange}
				/>
			</div>
		</>
	);
};

export default PhoneNumber;
