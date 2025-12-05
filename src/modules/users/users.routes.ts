import { Router } from "express";
import { usersControllers } from "./users.controllers";

const router = Router();

router.post("/signup", usersControllers.userSignup);

export const userRoutes = router;
