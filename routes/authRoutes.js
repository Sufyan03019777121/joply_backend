import express from "express";
import { signup, login, getProfile } from "../controllers/authController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", verifyAuth, getProfile);


export default router;
