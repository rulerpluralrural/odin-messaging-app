import React from "react";

const Alert = ({ message }) => {
	return (
		<div className="fixed top-36 p-10 bg-white z-20 rounded-md shadow-md shadow-slate-700">
			<p className="text-lg font-serif">{message}</p>
		</div>
	);
};

export default Alert;
