import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";

const createBookings = async (req: Request, res: Response) => {
  try {
    const {
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      daily_rent_price,
    } = req.body;

    const total_price = daily_rent_price * (rent_end_date - rent_start_date);
    const status = "active";

    const result = await bookingsServices.createBookings(
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status
    );
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.getAllBookings();
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const bookingUpdate = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const result = await bookingsServices.bookingUpdate(
      status,
      bookingId as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
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

export const bookingsControllers = {
  createBookings,
  getAllBookings,
  bookingUpdate,
};
