import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";

const router = Router();

router.post("/", vehiclesControllers.createVehicles);
router.get("/", vehiclesControllers.getALlVehicles);
router.get("/:vehicleId", vehiclesControllers.getSingleVehicle);
router.put("/:vehicleId", vehiclesControllers.vehicleUpdate);
router.delete("/:vehicleId", vehiclesControllers.vehicleDelete);

export const vehiclesRoutes = router;
