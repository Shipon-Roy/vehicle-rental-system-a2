import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";

const router = Router();

router.post("/", bookingsControllers.createBookings);

export const bookingsRoutes = router;
