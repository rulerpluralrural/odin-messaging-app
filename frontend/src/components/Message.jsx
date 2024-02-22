import React from "react";

const Message = ({ message, sender, profileImg }) => {
	return (
		<div className="flex gap-2 items-center">
			<div className="rounded-full border-[1px] border-slate-800 aspect-square flex items-center"><img src={profileImg} alt={`${sender} image`} className="object-fit"/></div>
			<div className="flex flex-col">
				<p>{sender}</p>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Message;
