import React from "react";

const Message = ({ message, sender, profileImg, dateSent, user }) => {
	return (
		<div className="flex gap-2 items-center">
			<div className="rounded-full border-[1px] border-slate-800 aspect-square w-[50px] flex items-center self-end">
				<img src={profileImg} alt={`${sender} .jpeg`} className="object-fit text-xs text-center" />
			</div>
			{user.name === sender ? (
				<UserMessage dateSent={dateSent} message={message} />
			) : (
				<OtherMessage dateSent={dateSent} message={message} sender={sender} />
			)}
		</div>
	);
};

const UserMessage = ({ dateSent, message }) => {
	return (
		<div className="flex flex-col gap-1 bg-blue-500 text-white font-sans tracking-wide px-3 py-1 rounded-lg rounded-bl-none">
			<p className="font-bold font-Roboto">You</p>
			<p>{message}</p> <small className="text-xs self-end text-white">{dateSent}</small>
		</div>
	);
};

const OtherMessage = ({ dateSent, message, sender }) => {
	return (
		<div className="flex flex-col gap-1 bg-white text-slate-900 font-sans tracking-wide px-3 py-1 rounded-lg rounded-bl-none">
			<p className="font-bold font-Roboto">{sender}</p>
			<p>{message}</p> <small className="text-xs self-end text-slate-700">{dateSent}</small>
		</div>
	);
};

export default Message;
