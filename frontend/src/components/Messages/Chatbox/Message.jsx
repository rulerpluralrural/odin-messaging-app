import React, { useState } from "react";
import PopupDeleteMessage from "../Popups/ChatboxMessage/PopupDeleteMessage";

const Message = ({
	message,
	senderID,
	senderName,
	profileImg,
	dateSent,
	user,
}) => {
	const [popup, togglePopup] = useState(false);

	return (
		<div className="flex items-center">
			{user._id === senderID ? (
				<UserMessage
					dateSent={dateSent}
					message={message}
					profileImg={profileImg}
					senderName={senderName}
					popup={popup}
					togglePopup={togglePopup}
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

const UserMessage = ({
	dateSent,
	message,
	profileImg,
	senderName,
	popup,
	togglePopup,
}) => {
	
	return (
		<div className="flex gap-2 py-5 relative">
			{popup && <PopupDeleteMessage />}
			<div className="rounded-full aspect-square w-[50px] flex items-center self-start">
				<img
					src={`${import.meta.env.VITE_BACKEND_URL}${profileImg}`}
					alt={`${senderName} .jpeg`}
					className="object-cover rounded-full aspect-square text-xs text-center"
				/>
			</div>
			<div className="flex flex-col justify-between gap-1">
				<p className="font-bold font-Roboto">You</p>
				<div
					className="bg-blue-600 text-white font-sans tracking-wide px-5 py-3 rounded-xl rounded-tl-none cursor-pointer hover:bg-blue-500 transition-colors"
					onClick={() => {
						togglePopup(!popup);
					}}
				>
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
			<div className="rounded-full aspect-square w-[50px] border-[1px] border-slate-50 flex items-center self-start">
				<img
					src={`${import.meta.env.VITE_BACKEND_URL}${profileImg}`}
					alt={`${senderName} .jpeg`}
					className="object-cover rounded-full aspect-square text-xs text-center"
				/>
			</div>
			<div className="flex flex-col justify-between gap-1">
				<p className="font-bold font-Roboto self-end">{senderName}</p>
				<div className="bg-slate-100 text-slate-900 font-sans tracking-wide px-5 py-3 rounded-xl rounded-tr-none">
					<p>{message}</p>
				</div>
			</div>
			<small className="text-sm text-slate-500 self-end">{dateSent}</small>
		</div>
	);
};

export default Message;
