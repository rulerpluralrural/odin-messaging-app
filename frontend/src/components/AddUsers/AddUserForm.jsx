import React, { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import UsersCard from "./UsersCard";
import { BarLoader, PulseLoader } from "react-spinners";

const AddUserForm = ({ setPopupAddUser, id }) => {
	const [loading, setLoading] = useState(false);
	const [usersFound, setUsersFound] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [notif, setNotif] = useState({});

	const searchUser = async (value) => {
		try {
			const response = await fetch(
				`http://localhost:8000/api/v1/users?search=${value}`,
				{
					credentials: "include",
				}
			).then((res) => res.json());

			setUsersFound(response);
		} catch (error) {
			console.log(error);
		}
	};

	const addUser = async () => {
		if (!selectedUser) {
			return;
		}

		try {
			setLoading(true);

			const response = await fetch(`http://localhost:8000/api/v1/user/${id}`, {
				method: "PUT",
				credentials: "include",
				body: JSON.stringify({ id: selectedUser }),
				headers: {
					["Content-Type"]: "application/json; charset=utf-8",
				},
			}).then((res) => res.json());
			setLoading(false);

			if (response.room) {
				setSelectedUser([]);
				setPopupAddUser(false);
			} else if (response.messages) {
				setSelectedUser([]);
				setNotif(response.messages);
			} else {
				setSelectedUser([]);
				setNotif(response.message);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 h-screen bg-slate-700 bg-opacity-80 flex items-center justify-center z">
			<div className="flex flex-col gap-3 bg-white p-10 relative shadow-sm shadow-slate-700 rounded-md overflow-scroll w-[500px]">
				<FaXmark
					onClick={() => {
						setPopupAddUser(false);
					}}
					className="absolute top-3 right-4 text-red-600 cursor-pointer text-xl font-bold hover:text-red-700"
				/>
				<div className="text-center ">
					<h1 className="text-2xl font-Roboto">Add User</h1>
				</div>
				<Searchbar searchUser={searchUser} />
				{loading ? (
					<div className="h-[150px] max-h-[150px] flex items-center justify-center">
						<PulseLoader size={15} color="#0D98BA" />
					</div>
				) : (
					<SearchResult
						usersFound={usersFound}
						selectedUser={selectedUser}
						setSelectedUser={setSelectedUser}
					/>
				)}
				{notif.length > 0 && (
					<ul className="bg-red-200 text-slate-800 font-sans rounded-sm p-2">
						{notif.map((item, index) => {
							return <li key={index} className=" list-inside list-disc">{item.msg}</li>;
						})}
					</ul>
				)}
				<button
					type="button"
					className="w-full self-center flex items-end justify-center gap-2 bg-blue-500 text-white cursor-pointer p-3 rounded-md focus:bg-blue-600 hover:bg-blue-600 transition-colors"
					onClick={addUser}
				>
					Add <FaRegPlusSquare className="text-2xl" />
				</button>
			</div>
		</div>
	);
};

const Searchbar = ({ searchUser }) => {
	return (
		<div className="relative w-full">
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
	);
};

const SearchResult = ({ usersFound, selectedUser, setSelectedUser }) => {
	return (
		<div
			className={`flex flex-col gap-2 px-4  ${
				usersFound.length > 0
					? "py-2 h-[300px] max-h-[300px]"
					: "justify-center h-[150px] max-h-[150px]"
			} overflow-scroll w-full transition-all`}
		>
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
				<p className="text-center text-slate-600 self-center text-xl font-Roboto w-full">
					No users found!
				</p>
			)}
		</div>
	);
};

export default AddUserForm;
