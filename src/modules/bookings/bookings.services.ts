import { pool } from "../../config/connectDb";

const createBookings = async (
  customer_id: string,
  vehicle_id: string,
  rent_start_date: string,
  rent_end_date: string,
  total_price: number,
  status: string
) => {
  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );

  return result;
};

const getAllBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);

  return result;
};

const bookingUpdate = async (status: string, id: string) => {
  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, id]
  );
  return result;
};

export const bookingsServices = {
  createBookings,
  getAllBookings,
  bookingUpdate,
};
