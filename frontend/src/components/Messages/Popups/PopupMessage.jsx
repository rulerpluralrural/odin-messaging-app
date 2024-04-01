import React from "react";
import { FaXmark } from "react-icons/fa6";

const PopupMessage = ({ message, setMessage }) => {
	return (
		<div className="fixed w-full h-full inset-0 bg-black bg-opacity-90 flex items-center justify-center z-10">
			<div className="bg-white pb-8 pt-5 px-5 rounded-md shadow-sm shadow-slate-500 flex flex-col items-center justify-center gap-3 w-[350px] relative">
				<FaXmark
					className="absolute cursor-pointer text-red-700 hover:text-red-800 top-2 right-2 text-lg"
					onClick={() => {
						setMessage("");
					}}
				/>
        <p className="mt-3 font-bold">{message}</p>
			</div>
		</div>
	);
};

export default PopupMessage;
