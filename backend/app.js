import dotenv from "dotenv";
dotenv.config();

import express, { urlencoded } from "express";
import connectDB from "./database/db.js";
import errorHandler from "./middlewares/error-handler.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

// Routers
import indexRouter from "./routes/index.js";

// MIDDLEWARES
app.use(
	session({
		secret: process.env.SECRET,
		saveUninitialized: true,
		cookie: {
			signed: true,
			maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
		},
	})
);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
		allowedHeaders: ["Content-Type"],
	})
);

// Routes
app.get("/", (req, res) => {
	res.redirect("/api/v1/users");
});
app.use("/api/v1", indexRouter);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/", express.static(resolve(__dirname, "./public")));

// Error Handler
app.use(errorHandler);

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
