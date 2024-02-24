import { Link } from "react-router-dom";
import { FaSquareEnvelope } from "react-icons/fa6";

const Home = () => {
	return (
		<div className="flex justify-center">
			<div className="flex flex-col bg-white text-2xl rounded-md items-center px-5 py-10 shadow-lg shadow-slate-400 mt-28">
				<div className="text-center flex flex-col gap-1 px-3 pb-5 items-center justify-center w-full  border-b-2 border-blue-500 font-CroissantOne">
					<h1 className="text-4xl font-bold text-blue-800">ChatS</h1>
					<FaSquareEnvelope className="text-5xl text-blue-800" />
				</div>
				<div className="flex flex-col items-center">
					<p className="font-serif p-3">
						Discover new friends or catch up with your old ones!
					</p>
					<div className="flex gap-2 items-center justify-center text-center text-yellow-300 font-bold font-Roboto w-full">
						<Link to={"/login"} className="bg-blue-800 text-white w-full rounded-md p-2 hover:bg-blue-900 focus:bg-blue-900 transition-colors">LOGIN</Link>
						<Link to={"/register"} className="bg-red-800 w-full rounded-md p-2 hover:bg-red-900 focus:bg-red-900 transition-colors">REGISTER</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
