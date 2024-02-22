import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import { useEffect, useState } from "react";

function App() {
	const [user, setUser] = useState(null);
	const [loadingSession, setLoadingSession] = useState(false);

	useEffect(() => {
		const getSession = async () => {
			try {
				setLoadingSession(true);

				const response = await fetch("http://localhost:8000/api/v1/session", {
					credentials: "include",
				}).then((res) => res.json());

				setUser(response.user);
				setLoadingSession(false);
			} catch (error) {
				console.log(error);
				setLoadingSession(false);
			}
		};
		getSession();
	}, []);
	console.log(user);
	return (
		<div className="flex flex-col bg-slate-100 h-screen">
			<Navbar
				user={user}
				setUser={setUser}
				loadingSession={loadingSession}
			></Navbar>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
				<Route path="/messages" element={<Messages user={user}/>}></Route>
				<Route
					path="/login"
					element={<Login setUser={setUser} user={user} />}
				></Route>
				<Route
					path="/register"
					element={<Register setUser={setUser} user={user} />}
				></Route>
			</Routes>
		</div>
	);
}

export default App;
