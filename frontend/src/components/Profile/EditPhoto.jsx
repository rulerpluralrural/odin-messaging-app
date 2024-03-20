import React from "react";
import { FaUpload } from "react-icons/fa";

const EditPhoto = () => {
	return (
		<div className="absolute top-12 bg-white pb-8 pt-5 px-5 rounded-md shadow-sm shadow-slate-500 flex flex-col gap-3 w-[350px]">
			<h1 className="text-xl font-serif self-center">
				Change your profile picture
			</h1>
			<div className="flex flex-col gap-2">
				<div>
					<label
						htmlFor="image"
						className="cursor-pointer border-[1px] border-slate-700 px-3 py-2 flex items-center gap-2 justify-center"
					>
						<FaUpload /> Upload photo
					</label>
					<input type="file" name="image" id="image" className="hidden" />
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 rounded-sm py-2 text-white hover:bg-blue-600 transition-colors font-Roboto text-lg"
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default EditPhoto;
