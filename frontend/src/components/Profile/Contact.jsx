import React from "react";

const Contact = ({ user }) => {
	return (
		<>
			<div className="flex justify-between">
				<div className="w-[250px]">
					<p>Address: </p>
				</div>
				<div className="w-full">
					<p>{user.address}</p>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="w-[250px]">
					<p>Phone Number: </p>
				</div>
				<div className="w-full text-blue-800">
					<p>{user.phoneNumber}</p>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="w-[250px]">
					<p>Email: </p>
				</div>
				<div className="w-full text-blue-800">
					<p>{user.email}</p>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="w-[250px]">
					<p>Socials:</p>
				</div>
				<div className="w-full text-blue-800">
					<a
						className="text-blue-800 cursor-pointer hover:text-blue-950 hover:underline"
						href="https://twitter.com/"
						target="_blank"
					>
						{user.handle}
					</a>
				</div>
			</div>
		</>
	);
};

export default Contact;
