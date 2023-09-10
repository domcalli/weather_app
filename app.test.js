import supertest from "supertest";
import app from "./app.js";
const request = supertest(app);

describe("GET /", () => {
  it('responds with "Hello from backend to frontend!"', async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello from backend to frontend!");
  });
});

describe("POST /weather", () => {
  it("responds with weather information for a valid city", async () => {
    const cityName = "New York";
    const response = await request.post("/weather").send({ cityName });

    expect(response.status).toBe(200);
    expect(response.text).toMatch(/Current weather for .* is .* and .*/);
  });

  it("handles city not found and responds with an error message", async () => {
    const cityName = "NonExistentCity";
    const response = await request.post("/weather").send({ cityName });

    expect(response.status).toBe(404); // Assuming the server sends a 200 response even for not found
    expect(response.text).toContain("City not found!");
  });
});
