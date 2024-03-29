import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const AboutInput = ({ handleChange, about }) => {
	return (
		<>
			<div>
				<label htmlFor="about" className="block">
					About:
				</label>
				<textarea
					name="about"
					id="about"
					className="w-full h-28 border-2 border-slate-300 rounded-sm px-2 py-1"
					defaultValue={about}
					onChange={handleChange}
				></textarea>
			</div>
		</>
	);
};

export default AboutInput;
