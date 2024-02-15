import React from "react";
import { FaSearch } from "react-icons/fa";

const Messages = () => {
	return (
		<div className="grid grid-cols-[300px_1fr] h-screen text-white">
			<div className="bg-slate-950 p-3 flex flex-col gap-1">
				<h1 className="text-lg font-bold">Conversations</h1>
				<div className="relative">
					<input
						type="search"
						placeholder="Search here"
						className="px-8 py-1 bg-transparent border-[1px] border-purple-600 rounded-sm w-full text-white"
					/>
                    <FaSearch className="absolute text-slate-200 top-2 left-2"/>
				</div>
                <p className="mt-5">Friends List</p>
			</div>
			<div className="bg-slate-100"></div>
		</div>
	);
};

export default Messages;
