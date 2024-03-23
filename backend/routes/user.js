import express from "express";
const router = express.Router();
import multer from "multer";

import userController from "../controllers/user.js";
import authenticateUser from "../middlewares/auth.js";

const storage = multer.diskStorage({
	destination: "./public/images/profile-images",
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

// GET Route for getting a single user
router.get("/user", authenticateUser, userController.user_get);

// GET Route for getting all users
router.get("/users", authenticateUser, userController.users_get);

// PUT Route for adding user to a room
router.put("/user/:id", authenticateUser, userController.add_user_put);

// PUT Route for editing user profile
router.put("/user/profile/:id", authenticateUser, userController.edit_user_put);

// PUT Route for editing profile picture
router.put(
	"/user/upload/:id",
	authenticateUser,
	upload.single('profileImg'),
	userController.edit_photo_put
);

// AUTHENTICATION

// GET Route for session
router.get("/session", authenticateUser, userController.check_user_session);

// POST Route for login
router.post("/login", userController.login);

// POST Route for register
router.post("/register", userController.register);

// POST Route for logout
router.post("/logout", authenticateUser, userController.logout);

export default router;
