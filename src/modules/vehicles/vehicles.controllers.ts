import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.services";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehicles(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getALlVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getALlVehicles();

    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehiclesServices.getSingleVehicle(vehicleId as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const vehicleUpdate = async (req: Request, res: Response) => {
  try {
    const vehicleId = Number(req.params.vehicleId);
    const payload = { id: vehicleId, ...req.body };
    const result = await vehiclesServices.vehicleUpdate(payload);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const vehicleDelete = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehiclesServices.vehicleDelete(vehicleId as string);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesControllers = {
  createVehicles,
  getALlVehicles,
  getSingleVehicle,
  vehicleUpdate,
  vehicleDelete,
};
