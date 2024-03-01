import React from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

const AddUserForm = ({ setPopupAddUser }) => {
	return (
		<div className="fixed inset-0 h-screen bg-slate-700 bg-opacity-80 flex items-center justify-center z">
			<form className="flex flex-col gap-3 bg-white p-10 w-[400px] aspect-square relative shadow-sm shadow-slate-700 rounded-md">
				<FaXmark
					onClick={() => {
						setPopupAddUser(false);
					}}
                    className="absolute top-3 right-4 text-red-600 cursor-pointer text-xl font-bold hover:text-red-700"
				/>
				<div className="text-center ">
					<h1 className="font-bold text-lg">Add a user to the chat room</h1>
				</div>
				<div className="relative w-full mt-2">
					<FaMagnifyingGlass className="absolute top-3 left-3 text-slate-600 text-lg" />
					<input
						type="text"
						className="border-2 border-slate-400 rounded-md px-10 py-2 w-full"
						placeholder="Search..."
					></input>
				</div>

				<button
					type="submit"
					className="w-[200px] self-center flex items-end justify-center gap-2 bg-blue-500 text-white cursor-pointer p-3 rounded-md focus:bg-blue-600 hover:bg-blue-600 transition-colors"
				>
					Add <FaRegPlusSquare className="text-2xl" />
				</button>
			</form>
		</div>
	);
};

export default AddUserForm;
