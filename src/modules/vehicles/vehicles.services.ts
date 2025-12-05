import { pool } from "../../config/connectDb";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number,daily_rent_price , availability_status) VALUES($1, $2,$3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};

const getALlVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getSingleVehicle = async (vehicleId: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);

  return result;
};

const vehicleUpdate = async (payload: Record<string, unknown>) => {
  const { id, vehicle_name, daily_rent_price, availability_status } = payload;

  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1,  daily_rent_price=$2, availability_status=$3 WHERE id=$4 RETURNING *`,
    [vehicle_name, daily_rent_price, availability_status, id]
  );

  return result;
};

const vehicleDelete = async (vehicleId: string) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);

  return result;
};

export const vehiclesServices = {
  createVehicles,
  getALlVehicles,
  getSingleVehicle,
  vehicleUpdate,
  vehicleDelete,
};
