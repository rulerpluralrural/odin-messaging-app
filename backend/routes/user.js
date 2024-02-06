import express from "express";
const router = express.Router();

import userController from "../controllers/user.js";

// GET Route for getting a single user
router.get("/user/:id", userController.user_get);

// GET Route for getting all users
router.get("/users", userController.users_get);

// POST Route for login
router.post("/login", userController.login);

// POST Route for register
router.post("/register", userController.register);

export default router;
