import React from "react";

const Buttons = ({ setEditProfile }) => {
	return (
		<>
			<div className="flex flex-col gap-2">
				<button
					type="submit"
					className="py-1 mt-2 w-full bg-blue-600 text-white text-lg font-Roboto rounded-sm hover:bg-blue-700 transition-colors"
				>
					Confirm
				</button>
				<button
					type="button"
					className="py-1 w-full bg-red-600 text-white text-lg font-Roboto rounded-sm hover:bg-red-700 transition-colors"
					onClick={() => setEditProfile(false)}
				>
					Cancel
				</button>
			</div>
		</>
	);
};

export default Buttons;
