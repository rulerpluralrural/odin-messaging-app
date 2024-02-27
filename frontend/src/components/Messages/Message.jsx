import React from "react";

const Message = ({ message, sender, profileImg, dateSent, user }) => {
	return (
		<div className="flex gap-2 items-center">
			<div className="rounded-full border-[1px] border-slate-800 aspect-square w-[50px] flex items-center self-start">
				<img
					src={profileImg}
					alt={`${sender} .jpeg`}
					className="object-fit text-xs text-center"
				/>
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
		<div className="flex flex-col justify-between gap-1">
			<div className="flex items-center gap-2">
				<p className="font-bold font-Roboto">You</p>
				<small className="text-xs  text-slate-500">{dateSent}</small>
			</div>
			<div  className="bg-blue-500 text-white font-sans tracking-wide px-5 py-3 rounded-md rounded-tl-none">
				<p>{message}</p>
			</div>
		</div>
	);
};

const OtherMessage = ({ dateSent, message, sender }) => {
	return (
		<div className="flex flex-col justify-between gap-1">
			<div className="flex items-center gap-2">
				<p className="font-bold font-Roboto">{sender}</p>
				<small className="text-xs  text-slate-500">{dateSent}</small>
			</div>
			<div  className="bg-blue-500 text-white font-sans tracking-wide px-5 py-3 rounded-md rounded-tl-none">
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Message;
