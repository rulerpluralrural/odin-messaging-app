import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const GenderInput = () => {
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
				>
					<option selected disabled>
						Select
					</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="LGBTQ">LGBTQ</option>
				</select>
			</div>
		</>
	);
};

export default GenderInput;
