import React from "react";

const FriendsList = () => {
	return (
		<div className="flex flex-col self-start gap-1 w-full">
			<button className="bg-slate-200 p-2 rounded-md">Friend A</button>
			<button className="bg-slate-200 p-2 rounded-md">Friend B</button>
			<button className="bg-slate-200 p-2 rounded-md">Friend C</button>
		</div>
	);
};

export default FriendsList;
