import React from "react";

const inputControl = "w-full border-2 border-slate-300 rounded-sm p-2";

const EditProfile = ({ user, setEditProfile }) => {
	const handleForm = async (e) => {
		return () => {
			e.preventDefault();

			setEditProfile(false);
		};
	};
	return (
		<>
			<form className="flex flex-col w-full gap-3" onSubmit={handleForm}>
				<div className="flex justify-between">
					<div>
						<label htmlFor="firstName" className="block">
							First Name:
						</label>
						<input
							type="text"
							className={inputControl}
							value={user.firstName}
						/>
					</div>
					<div>
						<label htmlFor="lastName" className="block">
							Last Name:
						</label>
						<input type="text" className={inputControl} value={user.lastName} />
					</div>
				</div>
				<div className="flex justify-between">
					<div>
						<label htmlFor="age" className="block">
							Age
						</label>
						<input type="number" className={inputControl} value={user.age} />
					</div>
					<div>
						<label htmlFor="birthday" className="block">
							Birthday:
						</label>
						<input type="Date" className={inputControl} />
					</div>
					<div>
						<label htmlFor="gender" className="block">
							Gender:
						</label>
						<select
							name="gender"
							id="gender"
							className="p-[10px] bg-transparent border-slate-300 border-2 rounded-sm"
						>
							<option value="Male" selected>
								Male
							</option>
							<option value="Female">Female</option>
							<option value="LGBTQ">LGBTQ</option>
						</select>
					</div>
				</div>
				<div>
					<label htmlFor="email" className="block">
						Email:
					</label>
					<input type="text" className={inputControl} value={user.email} />
				</div>
				<div>
					<label htmlFor="address" className="block">
						Address:
					</label>
					<input type="text" className={inputControl} value={user.address} />
				</div>
				<div>
					<label htmlFor="education" className="block">
						Education:
					</label>
					<input type="text" className={inputControl} value={user.education} />
				</div>

				<div>
					<label htmlFor="work" className="block">
						Work:
					</label>
					<input type="text" className={inputControl} value={user.work} />
				</div>
				<div>
					<label htmlFor="about" className="block">
						About:
					</label>
					<textarea
						name="about"
						id="about"
						className="w-full h-28 border-2 border-slate-300 rounded-sm px-2 py-1"
						value={user.about}
					></textarea>
				</div>
				<div className="flex flex-col gap-2">
					<button
						type="submit"
						className="py-1 mt-2 w-full bg-blue-600 text-white text-lg font-Roboto rounded-sm hover:bg-blue-700 transition-colors"
					>
						Confirm
					</button>
					<button
						type="button"
						className="py-1 w-full bg-red-600 text-white text-lg font-Roboto rounded-sm hover:bg-red-700 transition-colors"
						onClick={() => setEditProfile(false)}
					>
						Cancel
					</button>
				</div>
			</form>
		</>
	);
};

export default EditProfile;
