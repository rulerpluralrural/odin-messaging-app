import React, { useState } from "react";
import EditPhoto from "./EditPhoto";
import { PulseLoader } from "react-spinners";

const ProfileHeader = ({ user }) => {
	const [editPhoto, setEditPhoto] = useState(false);
	const [file, setFile] = useState(null);
	const [imgURL, setImgURL] = useState(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const fr = new FileReader();
	fr.onload = function (e) {
		setImgURL(e.target.result);
	};

	const handleFileChange = (e) => {
		setFile(e.target.files)
		fr.readAsDataURL(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("profileImg", file[0]);

		try {
			setLoading(true);

			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/user/upload/${user._id}`,
				{
					method: "PUT",
					body: formData,
					credentials: "include",
				}
			).then((res) => res.json());
			setLoading(false);
			if (response.msg) {
				setMessage(response.msg);
				setEditPhoto(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center py-10 bg-slate-100">
			<div className="flex flex-col text-center items-center justify-center gap-1">
				{loading ? (
					<PulseLoader />
				) : (
					<img
						src={user.profileImg}
						alt={`${user.name}.jpg`}
						className="rounded-full h-[200px] w-[200px] object-cover  border-4 border-white shadow-md shadow-slate-400 self-center cursor-pointer hover:opacity-90 transition-opacity"
						title="Edit profile picture"
						onClick={() => {
							setEditPhoto(true);
						}}
					/>
				)}

				<div className="w-[500px] ">
					<div className="flex gap-2 items-center justify-center">
						<h1 className="text-xl">
							{user.firstName} {user.lastName}
						</h1>
					</div>
					<div></div>
					<p className="text-2xl font-bold mt-1">{user.work}</p>
					<p>{user.about}</p>
				</div>
			</div>
			{editPhoto && (
				<EditPhoto
					setEditPhoto={setEditPhoto}
					handleFileChange={handleFileChange}
					handleSubmit={handleSubmit}
					imgURL={imgURL}
					userImg={user.profileImg}
				/>
			)}
		</div>
	);
};

export default ProfileHeader;
