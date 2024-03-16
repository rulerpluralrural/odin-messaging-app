import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const OtherInputs = ({ handleChange, education, work }) => {
	return (
		<>
			<div>
				<label htmlFor="education" className="block">
					Education:
				</label>
				<input
					type="text"
					name="education"
					className={inputControl}
					defaultValue={education}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="work" className="block">
					Work:
				</label>
				<input
					type="text"
					name="work"
					className={inputControl}
					defaultValue={work}
					onChange={handleChange}
				/>
			</div>
		</>
	);
};

export default OtherInputs;
