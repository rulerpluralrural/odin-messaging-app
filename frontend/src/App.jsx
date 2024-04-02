import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import { useEffect, useState } from "react";
import ChatBox from "./components/Messages/ChatBox";
import { PulseLoader } from "react-spinners";

function App() {
	const [userSession, setUserSession] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [loadingSession, setLoadingSession] = useState(true);
	const [loadingInfo, setLoadingInfo] = useState(true);
	const [refreshKey, setRefreshKey] = useState(0);
	const [popupAddUser, setPopupAddUser] = useState(false);
	const [popupDeleteRoom, setPopupDeleteRoom] = useState(false);

	useEffect(() => {
		const getSession = async () => {
			try {
				setLoadingSession(true);

				const response = await fetch("http://localhost:8000/api/v1/session", {
					credentials: "include",
				}).then((res) => res.json());

				setUserSession(response.user);
				setLoadingSession(false);
			} catch (error) {
				console.log(error);
				setLoadingSession(false);
			}
		};

		const getUserInfo = async () => {
			try {
				setLoadingInfo(true);

				const response = await fetch("http://localhost:8000/api/v1/user", {
					credentials: "include",
				}).then((res) => res.json());

				setUserInfo(response.user);
				setLoadingInfo(false);
			} catch (error) {
				console.log(error);
				setLoadingInfo(false);
			}
		};

		getSession();
		getUserInfo();
	}, [refreshKey]);

	if (loadingSession) {
		return (
			<div className="flex items-center justify-center h-screen bg-slate-100">
				<PulseLoader size={15} color="#0D98BA" />
			</div>
		);
	}

	return (
		<div className="flex flex-col h-screen">
			<div>
				<Navbar
					userInfo={userInfo}
					userSession={userSession}
					setUserSession={setUserSession}
					setUserInfo={setUserInfo}
					loadingInfo={loadingInfo}
					setLoadingInfo={setLoadingInfo}
				></Navbar>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route
						path="/profile"
						element={<Profile user={userInfo} loadingInfo={loadingInfo} />}
					></Route>
					<Route path="/messages" element={<Messages user={userSession} />}>
						<Route index element={<div></div>}></Route>
						<Route
							path=":id"
							element={
								<div>
									<ChatBox
										user={userSession}
										popupAddUser={popupAddUser}
										setPopupAddUser={setPopupAddUser}
										refreshKey={refreshKey}
										setRefreshKey={setRefreshKey}
										popupDeleteRoom={popupDeleteRoom}
										setPopupDeleteRoom={setPopupDeleteRoom}
									/>
								</div>
							}
						></Route>
					</Route>
					<Route
						path="/login"
						element={
							<Login
								setUser={setUserSession}
								user={userSession}
								setRefreshKey={setRefreshKey}
							/>
						}
					></Route>
					<Route path="/register" element={<Register />}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
