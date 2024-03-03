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
		<div className="h-full flex flex-col py-10 pt-24 text-lg font-Roboto text-slate-600 bg-white border-r-2 border-slate-300 shadow-lg shadow-slate-400">
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
