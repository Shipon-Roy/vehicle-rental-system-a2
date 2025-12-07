import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", bookingsControllers.createBookings);
router.get("/", auth("admin"), bookingsControllers.getAllBookings);
router.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookingsControllers.bookingUpdate
);

export const bookingsRoutes = router;
