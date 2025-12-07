import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_string}`,
});

const initDb = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL CHECK (email = LOWER(email)),
        password TEXT NOT NULL CHECK (char_length(password) >= 6),
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN('admin', 'customer'))
        )
        `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name TEXT NOT NULL,
        type VARCHAR(150)  NOT NULL CHECK(type IN ('car', 'bike', 'van', 'SUV')),
        registration_number TEXT UNIQUE NOT NULL,
        daily_rent_price NUMERIC NOT NULL CHECK(daily_rent_price > 0),
        availability_status TEXT NOT NULL CHECK(availability_status IN ('available', 'booked'))
        )
      `);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date TEXT NOT NULL,
        rent_end_date TEXT NOT NULL,
        total_price NUMERIC NOT NULL CHECK(total_price > 0),
        status TEXT NOT NULL CHECK(status IN ('active', 'cancelled', 'returned'))
        )
        `);
};

export default initDb;
