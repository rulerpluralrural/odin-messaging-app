import React from "react";
import { FaTrash } from "react-icons/fa";

const PopupDeleteMessage = () => {
	return (
		<button
			className="absolute top-4 right-10 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition-colors"
			type="button"
			title="Delete Message?"
		>
			<FaTrash />
		</button>
	);
};

export default PopupDeleteMessage;
