import React from "react";

const About = ({ user }) => {
	return (
		<>
			<div className="flex justify-between">
				<div className="w-[250px]">
					<p>Age: </p>
				</div>
				<div className="w-full">
					<p>{user.age} yrs. old</p>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="w-[250px]">
					<p>Birthday: </p>
				</div>
				<div className="w-full">
					<p>{user.birthday_formatted}</p>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="w-[250px]">
					<p>Gender: </p>
				</div>
				<div className="w-full">
					<p
						className={`${
							user.gender === "Female" ? "text-pink-800" : "text-green-800"
						}`}
					>
						{user.gender}
					</p>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="w-[250px]">
					<p>Education: </p>
				</div>
				<div className="w-full">
					<p>{user.education}</p>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="w-[250px]">
					<p>Work: </p>
				</div>
				<div className="w-full">
					<p>{user.work}</p>
				</div>
			</div>
		</>
	);
};

export default About;
