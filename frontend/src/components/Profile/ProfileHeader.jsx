import React, { useState } from "react";
import EditPhoto from "./EditPhoto";

const ProfileHeader = ({ user }) => {
	const [editPhoto, setEditPhoto] = useState(false);
	const [imgFile, setImgFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFileChange = (e) => {
		const formData = new FormData()
		formData.append('image',  e.target.files[0])
		setImgFile(formData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);

			const response = await fetch(
				`http:localhost:8000/api/v1/user/photo/${user._id}`,
				{
					method: "PUT",
					body: JSON.stringify({ profileImg: imgFile }),
					credentials: "include",
				}
			).then((res) => res.json());
			setLoading(false);
			setImgFile(response);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center py-10 bg-slate-100">
			<div className="flex flex-col text-center items-center justify-center gap-1">
				<img
					src={user.profileImg}
					alt={`${user.name}.jpg`}
					className="rounded-full h-[200px] w-[200px] object-cover  border-4 border-white shadow-md shadow-slate-400 self-center cursor-pointer hover:opacity-90 transition-opacity"
					title="Edit profile picture"
					onClick={() => {
						setEditPhoto(true);
					}}
				/>
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
					imgFile={imgFile}
				/>
			)}
		</div>
	);
};

export default ProfileHeader;
