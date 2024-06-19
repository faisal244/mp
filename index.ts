import express, { Express, Request, Response } from "express";
import VehicleRepository from "./repositories/vehicle-repository";

const app: Express = express();
const port = 3000;

const vehicleRepo = new VehicleRepository();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Endpoint to list all cars
app.get("/cars", (req, res) => {
  try {
    const vehicles = vehicleRepo.getAll();
    res.json(vehicles);
  } catch (error) {
    res.status(500).send("Error retrieving vehicles");
  }
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
