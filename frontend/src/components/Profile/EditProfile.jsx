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
import Popup from "./EditProfile/Popup";

const EditProfile = ({ user, setEditProfile }) => {
	const [message, setMessage] = useState({});
	const [formData, setFormData] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		age: user.age,
		email: user.email,
		birthday: user.birthday,
		gender: user.gender,
		address: user.address,
		education: user.education,
		work: user.work,
		about: user.about,
		phoneNumber: user.phoneNumber,
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

	const handleForm = async (e) => {
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

			if (response.user) {
				setMessage("You have successfully edit your profile!");
				setEditProfile(false);
			} else if (response.messages) {
				setMessage(response.messages);
			} else {
				setMessage(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			<form
				className="flex flex-col w-full gap-3 relative"
				onSubmit={handleForm}
			>
				<div className="flex justify-between">
					<NameInput
						handleChange={handleChange}
						firstName={firstName}
						lastName={lastName}
					/>
				</div>
				<div className="flex justify-between">
					<AgeInput handleChange={handleChange} age={age} />
					<BirthdayInput handleChange={handleChange} birthday={birthday} />
					<GenderInput handleChange={handleChange} gender={gender} />
				</div>
				<PhoneNumber handleChange={handleChange} phoneNumber={phoneNumber} />
				<AddressInput
					handleChange={handleChange}
					address={address}
					email={email}
				/>
				<OtherInputs
					handleChange={handleChange}
					education={education}
					work={work}
				/>
				<AboutInput handleChange={handleChange} about={about} />
				<Buttons setEditProfile={setEditProfile} />
				{message && message.length > 0 && (
					<Popup setMessage={setMessage} message={message} />
				)}
			</form>
		</>
	);
};

export default EditProfile;
