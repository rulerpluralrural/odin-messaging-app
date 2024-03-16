import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const PhoneNumber = ({ phoneNumber, handleChange }) => {
	return (
		<>
			<div>
				<label htmlFor="phoneNumber">Phone Number:</label>
				<input
					type="tel"
					name="phoneNumber"
					className={inputControl}
					defaultValue={phoneNumber}
					onChange={handleChange}
				/>
			</div>
		</>
	);
};

export default PhoneNumber;
