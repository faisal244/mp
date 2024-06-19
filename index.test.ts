import request from "supertest";
import app from "./index";

// Mock VehicleRepository data
jest.mock("./repositories/vehicle-repository", () => {
  return jest.fn().mockImplementation(() => ({
    getAll: jest.fn().mockReturnValue([{ make: "MINI", model: "COOPER" }]),
    getByMake: jest.fn().mockReturnValue([{ make: "BMW", model: "1 SERIES" }]),
    getAllGroupedByMake: jest
      .fn()
      .mockReturnValue({ MITSUBISHI: [{ make: "MITSUBISHI", model: "OUTLANDER" }] }),
    getByModel: jest.fn().mockReturnValue([{ make: "MINI", model: "COOPER" }]),
    getAllGroupedByModel: jest
      .fn()
      .mockReturnValue({ NISSAN: [{ make: "NISSAN", model: "QASHQAI" }] }),
  }));
});

describe("Vehicle API", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });
  test("GET /cars - Get a list of all cars", async () => {
    const response = await request(app).get("/cars");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ make: "MINI", model: "COOPER" }]);
  });

  test("GET /cars - Get a list of all Makes", async () => {
    const response = await request(app).get("/cars/make");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ MITSUBISHI: [{ make: "MITSUBISHI", model: "OUTLANDER" }] });
  });

  test("GET /cars - Get a list of all Models", async () => {
    const response = await request(app).get("/cars/model");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ NISSAN: [{ make: "NISSAN", model: "QASHQAI" }] });
  });

  test("GET /cars/make/:make - Get a list of all BMW vehicles", async () => {
    const response = await request(app).get("/cars/make/bmw");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ make: "BMW" })])
    );
  });

  test("GET /cars/model/:model - Get a list of all Mini Cooper vehicles", async () => {
    const response = await request(app).get("/cars/model/COOPER");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ make: "MINI", model: "COOPER" }]);
  });
});
