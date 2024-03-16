import React from "react";

const GenderInput = ({ handleChange, gender }) => {
	return (
		<>
			<div>
				<label htmlFor="gender" className="block">
					Gender:
				</label>
				<select
					name="gender"
					id="gender"
					className="p-[10px] bg-transparent border-slate-300 border-2 rounded-sm"
					defaultValue={gender}
					onChange={handleChange}
				>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="LGBTQ">LGBTQ</option>
				</select>
			</div>
		</>
	);
};

export default GenderInput;
