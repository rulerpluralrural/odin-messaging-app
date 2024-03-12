import React from "react";
import NameInput from "./EditProfile/NameInput";
import AgeInput from "./EditProfile/AgeInput";
import BirthdayInput from "./EditProfile/BirthdayInput";
import GenderInput from "./EditProfile/GenderInput";
import OtherInputs from "./EditProfile/OtherInputs";
import AboutInput from "./EditProfile/AboutInput";
import Buttons from "./EditProfile/Buttons";

const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const EditProfile = ({ user, setEditProfile }) => {
	const handleForm = (e) => {
		return async () => {
			e.preventDefault();
			try {
				const response = await fetch(
					`http://localhost:8000/api/v1/user/profile/${user._id}`,
					{
						method: "PUT",
						credentials: "include",
					}
				).then((res) => res.json());
			} catch (error) {
				console.log(error);
			}
			setEditProfile(false);
		};
	};

	return (
		<>
			<form className="flex flex-col w-full gap-3" onSubmit={handleForm}>
				<div className="flex justify-between">
					<NameInput user={user} />
				</div>
				<div className="flex justify-between">
					<AgeInput user={user} />
					<BirthdayInput user={user} />
					<GenderInput user={user} />
				</div>
				<OtherInputs user={user} />
				<AboutInput user={user} />
				<Buttons setEditProfile={setEditProfile} />
			</form>
		</>
	);
};

export default EditProfile;
