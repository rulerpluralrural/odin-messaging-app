import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Chats from "./pages/Chats";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";

function App() {
	return (
		<div className="flex flex-col">
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/chats" element={<Chats />}></Route>
				<Route path="/groups" element={<Groups />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
			</Routes>
		</div>
	);
}

export default App;
