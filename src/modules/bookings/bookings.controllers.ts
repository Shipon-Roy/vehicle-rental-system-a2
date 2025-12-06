import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";

const createBookings = async (req: Request, res: Response) => {
  try {
    // const result = await  bookingsServices.createBookings()
    //     res.status(201).json({
    //       success: true,
    //       message: "Booking created successfully",
    //       data: result.rows[0],
    //     });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingsControllers = {
  createBookings,
};
