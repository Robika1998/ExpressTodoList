import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { AuthService } from "../services/AuthService";

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/register", authController.registerUser.bind(authController));
router.post("/login", authController.loginUser.bind(authController));

export default router;
