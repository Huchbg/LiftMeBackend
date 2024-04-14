import express from "express";
import * as UserController from "../controllers/user";

const router = express.Router();

router.get("/validate", UserController.validateToken);

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/get/all", UserController.getAllusers);

// router.post("/logout", UserController.logout);

export default router;
