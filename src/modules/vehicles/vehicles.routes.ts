import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), vehiclesControllers.createVehicles);
router.get("/", vehiclesControllers.getALlVehicles);
router.get("/:vehicleId", vehiclesControllers.getSingleVehicle);
router.put("/:vehicleId", auth("admin"), vehiclesControllers.vehicleUpdate);
router.delete("/:vehicleId", auth("admin"), vehiclesControllers.vehicleDelete);

export const vehiclesRoutes = router;
