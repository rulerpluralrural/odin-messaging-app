import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const OtherInputs = ({ user, handleChange }) => {
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
				/>
			</div>
			<div>
				<label htmlFor="phoneNumber">Phone Number:</label>
				<input
					type="text"
					className={inputControl}
					defaultValue={user.phoneNumber}
					onChange={handleChange}
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
			<div>
				<label htmlFor="education" className="block">
					Education:
				</label>
				<input
					type="text"
					className={inputControl}
					defaultValue={user.education}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label htmlFor="work" className="block">
					Work:
				</label>
				<input
					type="text"
					className={inputControl}
					defaultValue={user.work}
					onChange={handleChange}
				/>
			</div>
		</>
	);
};

export default OtherInputs;
