import fs from "fs";

export type Vehicle = {
  make: string;
  model: string;
  trim: string;
  colour: string;
  price: number;
  co2_level: number;
  fuel_type: string;
  transmission: string;
  engine_size: number;
  date_first_reg: string;
  mileage: number;
};

class VehicleRepository {
  private _vehicles: Vehicle[];

  constructor() {
    const file = fs.readFileSync("./repositories/vehicles.json", "utf8");
    this._vehicles = JSON.parse(file);
    console.log(`${this._vehicles.length} vehicles loaded`);
  }

  getAll(): Vehicle[] {
    return this._vehicles;
  }

  getByMake(make: string): Vehicle[] {
    return this._vehicles.filter((vehicle) => vehicle.make.toLowerCase() === make.toLowerCase());
  }

  getAllGroupedByMake() {
    return this._vehicles.reduce((acc: { [key: string]: Vehicle[] }, vehicle) => {
      if (!acc[vehicle.make]) {
        acc[vehicle.make] = [];
      }
      acc[vehicle.make].push(vehicle);
      return acc;
    }, {});
  }

  getByModel(model: string): Vehicle[] {
    return this._vehicles.filter((vehicle) => vehicle.model.toLowerCase() === model.toLowerCase());
  }

  getAllGroupedByModel() {
    return this._vehicles.reduce((acc: { [key: string]: Vehicle[] }, vehicle) => {
      if (!acc[vehicle.model]) {
        acc[vehicle.model] = [];
      }
      acc[vehicle.model].push(vehicle);
      return acc;
    }, {});
  }
}

export default VehicleRepository;
