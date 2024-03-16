import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const AgeInput = ({ user, handleChange, age }) => {
	return (
		<>
			<div>
				<label htmlFor="age" className="block">
					Age
				</label>
				<input
					type="number"
					name="age"
					className={inputControl}
					defaultValue={age}
					onChange={handleChange}
				/>
			</div>
		</>
	);
};

export default AgeInput;
