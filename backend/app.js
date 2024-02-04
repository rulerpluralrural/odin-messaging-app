import dotenv from "dotenv";
dotenv.config();

import express, { urlencoded } from "express";
import connectDB from "./database/db";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

const PORT = process.env.PORT || 5500;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log("App is connected to the database...");

		app.listen(PORT, () => {
			console.log(`Server is listening on port: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
