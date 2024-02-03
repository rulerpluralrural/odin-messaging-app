import dotenv from "dotenv";
dotenv.config();

import express, { urlencoded } from "express";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
	console.log(`Server is listening on port: ${PORT}`);
});
