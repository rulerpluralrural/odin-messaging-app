import React from "react";
import { FaUpload, FaUser } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const EditPhoto = ({
	setEditPhoto,
	handleFileChange,
	handleSubmit,
	imgFile,
}) => {
	console.table(imgFile)
	return (
		<div className="fixed w-full h-full inset-0 bg-black bg-opacity-90 flex items-center justify-center z-10">
			<div className="bg-white pb-8 pt-5 px-5 rounded-md shadow-sm shadow-slate-500 flex flex-col gap-3 w-[350px] relative">
				<FaXmark
					className="absolute cursor-pointer text-red-700 hover:text-red-800 top-2 right-2 text-lg"
					onClick={() => {
						setEditPhoto(false);
					}}
				/>
				<h1 className="text-xl font-serif self-center py-1">
					Change your profile picture
				</h1>
				<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						{imgFile ? (
							<img
								src={`/images/profile-images/${imgFile.name}`}
								alt={imgFile.name}
								className="w-[200px] aspect-square rounded-full object-cover border-[2px] border-slate-50 mb-3 self-center"
							/>
						) : (
							<FaUser className="w-[200px] h-[200px] rounded-full text-xl p-10 bg-slate-200 text-slate-600 mb-3 self-center"/>
						)}
						<label
							htmlFor="profileImg"
							className="cursor-pointer border-[1px] border-slate-700 px-3 py-2 flex items-center gap-2 justify-center"
						>
							<FaUpload /> Upload photo
						</label>
						<input
							type="file"
							name="profileImg"
							id="profileImg"
							className="hidden"
							onChange={handleFileChange}
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 rounded-sm py-2 text-white hover:bg-blue-600 transition-colors font-Roboto text-lg"
					>
						Save
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditPhoto;
