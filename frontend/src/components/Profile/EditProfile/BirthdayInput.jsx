import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const BirthdayInput = ({ handleChange, birthday }) => {

    const birthdayFormatted = () => {
		const date = new Date(birthday);
		const year = date.getFullYear().toString().padStart(4, "0");
		let month = date.getMonth().toString().padStart(2, "0");
		let day = date.getDay().toString().padStart(2, "0");

		return `${year}-${month}-${day}`;
	};
    
	return (
		<>
			<div>
				<label htmlFor="birthday" className="block">
					Birthday:
				</label>
				<input
					type="Date"
					name="birthday"
					className={inputControl}
					defaultValue={birthdayFormatted()}
					onChange={handleChange}
				/>
			</div>
		</>
	);
};

export default BirthdayInput;
