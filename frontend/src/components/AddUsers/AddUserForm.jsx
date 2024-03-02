import React, { useEffect, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { PulseLoader } from "react-spinners";
import UsersCard from "./UsersCard";

const AddUserForm = ({ setPopupAddUser }) => {
	const [loading, setLoading] = useState(false);
	const [usersFound, setUsersFound] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);

	const searchUser = async (value) => {
		try {
			setLoading(true);

			const response = await fetch(
				`http://localhost:8000/api/v1/users?search=${value}`,
				{
					credentials: "include",
				}
			).then((res) => res.json());

			setUsersFound(response);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 h-screen bg-slate-700 bg-opacity-80 flex items-center justify-center z">
			<div className="flex flex-col gap-3 bg-white p-10 w-[500px] aspect-square relative shadow-sm shadow-slate-700 rounded-md overflow-scroll">
				<FaXmark
					onClick={() => {
						setPopupAddUser(false);
					}}
					className="absolute top-3 right-4 text-red-600 cursor-pointer text-xl font-bold hover:text-red-700"
				/>
				<div className="text-center ">
					<h1 className="font-bold text-lg">Add a User</h1>
				</div>
				<div className="relative w-full mt-2">
					<FaMagnifyingGlass className="absolute top-3 left-3 text-slate-600 text-lg" />
					<input
						type="text"
						className="border-2 border-slate-400 rounded-md px-10 py-2 w-full"
						placeholder="Search..."
						onChange={(e) => {
							searchUser(e.target.value);
						}}
					></input>
				</div>
				<div className="flex flex-col gap-2">
					{usersFound.length > 0 ? (
						usersFound.map((user, index) => {
							return (
								<UsersCard
									key={index}
									user={user}
									selectedUser={selectedUser}
									setSelectedUser={setSelectedUser}
								/>
							);
						})
					) : (
						<div className="flex-1 h-full self-center">
							<p className="text-center text-slate-600 py-10 text-xl font-Roboto">No users found!</p>
						</div>
					)}
				</div>
				<button
					type="button"
					className="w-[200px] self-center flex items-end justify-center gap-2 bg-blue-500 text-white cursor-pointer p-3 rounded-md focus:bg-blue-600 hover:bg-blue-600 transition-colors"
				>
					Add <FaRegPlusSquare className="text-2xl" />
				</button>
			</div>
		</div>
	);
};

export default AddUserForm;
