import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const AgeInput = ({ user, handleChange }) => {
	return (
		<>
			<div>
				<label htmlFor="age" className="block">
					Age
				</label>
				<input type="number" className={inputControl} defaultValue={user.age} onChange={handleChange}/>
			</div>
		</>
	);
};

export default AgeInput;
