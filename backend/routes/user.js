import express from "express";
const router = express.Router();

import userController from "../controllers/user.js";
import authenticateUser from "../middlewares/auth.js";

// GET Route for getting a single user
router.get("/user/:id", authenticateUser, userController.user_get);

// GET Route for getting all users
router.get("/users", authenticateUser, userController.users_get);

// GET Route for session
router.get("/session", authenticateUser, userController.check_user_session);

// POST Route for login
router.post("/login", userController.login);

// POST Route for register
router.post("/register", userController.register);

// POST Route for logout
router.post("/logout", authenticateUser, userController.logout);

export default router;
