import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router();

router.post("/signup", authControllers.userSignup);
router.post("/signin", authControllers.userSignin);

export const authRoutes = router;
