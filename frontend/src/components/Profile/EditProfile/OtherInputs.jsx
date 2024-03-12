import React from "react";
const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const OtherInputs = ({ user }) => {
	return (
		<>
			<div>
				<label htmlFor="email" className="block">
					Email:
				</label>
				<input type="text" className={inputControl} value={user.email} />
			</div>
			<div>
				<label htmlFor="address" className="block">
					Address:
				</label>
				<input type="text" className={inputControl} value={user.address} />
			</div>
			<div>
				<label htmlFor="education" className="block">
					Education:
				</label>
				<input type="text" className={inputControl} value={user.education} />
			</div>

			<div>
				<label htmlFor="work" className="block">
					Work:
				</label>
				<input type="text" className={inputControl} value={user.work} />
			</div>
		</>
	);
};

export default OtherInputs;
