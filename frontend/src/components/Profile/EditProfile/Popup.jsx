import React from "react";
import { FaXmark } from "react-icons/fa6";

const Popup = ({ setMessage, message }) => {
	return (
		<div className="absolute bg-white border-[1px] border-slate-300 rounded-md w-[550px] self-center top-52 py-10 px-5 shadow-sm shadow-slate-400">
			<FaXmark
				className="text-red-800 absolute top-2 right-2 cursor-pointer hover:text-red-950"
				onClick={() => {
					setMessage({});
				}}
			/>
			<ul className="text-left rounded-sm bg-red-300 w-full px-5 py-3">
				{message.map((item, index) => {
					return (
						<li key={index} className="list-disc list-inside">
							{item.msg}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Popup;
