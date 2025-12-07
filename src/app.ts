import express from "express";
import initDb from "./config/connectDb";
import { userRoutes } from "./modules/users/users.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { bookingsRoutes } from "./modules/bookings/bookings.routes";

const app = express();
app.use(express.json());

//initializing DB
initDb();

app.get("/", (req, res) => {
  res.send("server worked successfully");
});

//users
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

//vehicles
app.use("/api/v1/vehicles", vehiclesRoutes);

//bookings
app.use("/api/v1/bookings", bookingsRoutes);

export default app;
