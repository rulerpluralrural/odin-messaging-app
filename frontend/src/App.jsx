import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import { useEffect, useState } from "react";
import ChatBox from "./components/Messages/ChatBox";

function App() {
	const [user, setUser] = useState(null);
	const [loadingSession, setLoadingSession] = useState(true);
	const [refreshKey, setRefreshKey] = useState(0);
	const [popupAddUser, setPopupAddUser] = useState(false);

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
	}, [refreshKey]);

	return (
		<div className="flex flex-col bg-slate-100 h-screen">
			<div>
				<Navbar
					user={user}
					setUser={setUser}
					loadingSession={loadingSession}
				></Navbar>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/profile" element={<Profile />}></Route>
					<Route path="/messages" element={<Messages user={user} />}>
						<Route index element={<div></div>}></Route>
						<Route
							path=":id"
							element={
								<div>
									<ChatBox
										user={user}
										popupAddUser={popupAddUser}
										setPopupAddUser={setPopupAddUser}
									/>
								</div>
							}
						></Route>
					</Route>
					<Route
						path="/login"
						element={
							<Login
								setUser={setUser}
								user={user}
								setRefreshKey={setRefreshKey}
							/>
						}
					></Route>
					<Route
						path="/register"
						element={<Register />}
					></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
