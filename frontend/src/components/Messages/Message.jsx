import React from "react";

const Message = ({
	message,
	senderID,
	senderName,
	profileImg,
	dateSent,
	user,
}) => {
	return (
		<div className="flex items-center">
			{user._id === senderID ? (
				<UserMessage
					dateSent={dateSent}
					message={message}
					profileImg={profileImg}
					senderName={senderName}
				/>
			) : (
				<OtherMessage
					dateSent={dateSent}
					message={message}
					senderName={senderName}
					profileImg={profileImg}
				/>
			)}
		</div>
	);
};

const UserMessage = ({ dateSent, message, profileImg, senderName }) => {
	return (
		<div className="flex gap-2 py-5">
			<div className="rounded-full border-[1px] border-slate-800 aspect-square w-[50px] flex items-center self-start">
				<img
					src={profileImg}
					alt={`${senderName} .jpeg`}
					className="object-fit text-xs text-center"
				/>
			</div>
			<div className="flex flex-col justify-between gap-1">
					<p className="font-bold font-Roboto">You</p>
				<div className="bg-blue-500 text-white font-sans tracking-wide px-5 py-3 rounded-md rounded-tl-none">
					<p>{message}</p>
				</div>
			</div>
			<small className="text-sm  text-slate-500 self-end">{dateSent}</small>
		</div>
	);
};

const OtherMessage = ({ dateSent, message, senderName, profileImg }) => {
	return (
		<div className=" flex flex-row-reverse gap-2 self-start w-full py-5">
			<div className="rounded-full border-[1px] border-slate-800 aspect-square w-[50px] flex items-center self-end">
				<img
					src={profileImg}
					alt={`${senderName} .jpeg`}
					className="object-fit text-xs text-center"
				/>
			</div>
			<div className="flex flex-col justify-between gap-1">
				<div className="bg-slate-100 text-slate-900 font-sans tracking-wide px-5 py-3 rounded-md rounded-br-none">
					<p>{message}</p>
				</div>
				<p className="font-bold font-Roboto self-end">{senderName}</p>
			</div>
			<small className="text-sm text-slate-500 self-start">{dateSent}</small>
		</div>
	);
};

export default Message;
