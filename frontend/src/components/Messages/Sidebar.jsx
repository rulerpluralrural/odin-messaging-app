import React, { useState } from "react";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
	const [activeButton, setActiveButton] = useState(5);
	const buttons = [
		{
			id: 1,
			name: "Dashboard",
		},
		{
			id: 2,
			name: "Projects",
		},
		{
			id: 3,
			name: "Tasks",
		},
		{
			id: 4,
			name: "Clients",
		},
		{
			id: 5,
			name: "Chat",
		},
		{
			id: 6,
			name: "Activity",
		},
		{
			id: 7,
			name: "Calendar",
		},
		{
			id: 8,
			name: "Settings",
		},
		{
			id: 9,
			name: "Help",
		},
	];

	return (
		<div className="flex flex-col pt-28 text-lg font-Roboto text-slate-600 bg-white border-r-[1px]  border-slate-300">
			{buttons.map((button, index) => {
				return (
					<SidebarButton
						key={index}
						button={button}
						setActiveButton={setActiveButton}
						activeButton={activeButton}
					/>
				);
			})}
		</div>
	);
};

export default Sidebar;
