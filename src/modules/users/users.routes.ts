import { Router } from "express";
import { usersControllers } from "./users.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.get("/", auth("admin"), usersControllers.getAllUser);
router.put("/:userId", auth("admin", "customer"), usersControllers.userUpdate);
router.delete("/:userId", auth("admin"), usersControllers.userDelete);

export const userRoutes = router;
