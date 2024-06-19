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
  }

  getAll(): Vehicle[] {
    return this._vehicles;
  }
}

export default VehicleRepository;
