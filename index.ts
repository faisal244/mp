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

// Endpoint to list cars by make or all cars grouped by make if no specific make is provided
app.get("/cars/make/:make?", (req, res) => {
  const { make } = req.params;
  try {
    let vehicles;
    if (make) {
      // If a specific make is provided, filter vehicles by that make
      vehicles = vehicleRepo.getByMake(make);
    } else {
      // If no specific make is provided, return all vehicles grouped by make
      vehicles = vehicleRepo.getAllGroupedByMake();
    }
    res.json(vehicles);
  } catch (error) {
    console.error("Error processing vehicles:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint  to list cars by model or all cars grouped by model if no specific model is provided
app.get("/cars/model/:model?", (req, res) => {
  const { model } = req.params;
  try {
    let vehicles;
    if (model) {
      // If a specific model is provided, filter vehicles by that model
      vehicles = vehicleRepo.getByModel(model);
    } else {
      // If no specific model is provided, return all vehicles grouped by model
      vehicles = vehicleRepo.getAllGroupedByModel();
    }
    res.json(vehicles);
  } catch (error) {
    console.error("Error processing vehicles:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

export default app;
