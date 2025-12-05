import express from "express";
import config from "./config";
import initDb from "./config/connectDb";
import { userRoutes } from "./modules/users/users.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";

const app = express();
app.use(express.json());

//initializing DB
initDb();

app.get("/", (req, res) => {
  res.send("server worked successfully");
});

//users
app.use("/api/v1/auth", userRoutes);

//vehicles
app.use("/api/v1/vehicles", vehiclesRoutes);

const port = config.port;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
