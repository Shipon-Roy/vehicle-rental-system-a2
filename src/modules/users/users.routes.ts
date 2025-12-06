import { Router } from "express";
import { usersControllers } from "./users.controllers";

const router = Router();

router.get("/", usersControllers.getAllUser);
router.put("/:userId", usersControllers.userUpdate);
router.delete("/:userId", usersControllers.userDelete);

export const userRoutes = router;
