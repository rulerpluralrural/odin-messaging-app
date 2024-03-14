import React, { useState } from "react";
import NameInput from "./EditProfile/NameInput";
import AgeInput from "./EditProfile/AgeInput";
import BirthdayInput from "./EditProfile/BirthdayInput";
import GenderInput from "./EditProfile/GenderInput";
import OtherInputs from "./EditProfile/OtherInputs";
import AboutInput from "./EditProfile/AboutInput";
import Buttons from "./EditProfile/Buttons";
import AddressInput from "./EditProfile/AddressInput";
import PhoneNumber from "./EditProfile/PhoneNumber";

const EditProfile = ({ user, setEditProfile }) => {
	const [message, setMessage] = useState([]);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		age: "",
		email: "",
		birthday: "",
		gender: "",
		address: "",
		education: "",
		work: "",
		about: "",
		phoneNumber: "",
	});

	const {
		firstName,
		lastName,
		age,
		email,
		birthday,
		gender,
		address,
		education,
		work,
		about,
		phoneNumber,
	} = formData;

	const handleForm = (e) => {
		return async () => {
			e.preventDefault();
			try {
				const response = await fetch(
					`http://localhost:8000/api/v1/user/profile/${user._id}`,
					{
						method: "PUT",
						body: JSON.stringify(formData),
						credentials: "include",
						headers: {
							["Content-Type"]: "application/json; charset=utf-8",
						},
					}
				).then((res) => res.json());
				setMessage(response.user);
			} catch (error) {
				console.log(error);
			}
			setEditProfile(false);
		};
	};

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			<form className="flex flex-col w-full gap-3" onSubmit={handleForm}>
				<div className="flex justify-between">
					<NameInput user={user} handleChange={handleChange} />
				</div>
				<div className="flex justify-between">
					<AgeInput user={user} handleChange={handleChange} />
					<BirthdayInput user={user} handleChange={handleChange} />
					<GenderInput />
				</div>
				<PhoneNumber user={user} handleChange={handleChange} />
				<AddressInput user={user} handleChange={handleChange} />
				<OtherInputs user={user} handleChange={handleChange} />
				<AboutInput user={user} about={about} handleChange={handleChange} />
				<Buttons setEditProfile={setEditProfile} />
			</form>
		</>
	);
};

export default EditProfile;
