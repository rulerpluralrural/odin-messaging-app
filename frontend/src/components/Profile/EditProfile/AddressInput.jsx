import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const AddressInput = ({ user, handleChange }) => {
	return (
		<>
			<div>
				<label htmlFor="email" className="block">
					Email:
				</label>
				<input
					type="text"
					className={inputControl}
					defaultValue={user.email}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="address" className="block">
					Address:
				</label>
				<input
					type="text"
					className={inputControl}
					defaultValue={user.address}
					onChange={handleChange}
				/>
			</div>
		</>
	);
};

export default AddressInput;
