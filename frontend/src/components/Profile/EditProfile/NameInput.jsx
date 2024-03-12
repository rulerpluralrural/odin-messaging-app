import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const NameInput = ({ user }) => {
	return (
		<>
			<div>
				<label htmlFor="firstName" className="block">
					First Name:
				</label>
				<input type="text" className={inputControl} value={user.firstName} />
			</div>
			<div>
				<label htmlFor="lastName" className="block">
					Last Name:
				</label>
				<input type="text" className={inputControl} value={user.lastName} />
			</div>
		</>
	);
};

export default NameInput;
