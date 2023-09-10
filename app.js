"use strict";

// Import Modules
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const { API_KEY } = process.env;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello from backend to frontend!");
});

// app.get("/weather", (req, res) => {
//   res.status(200).send("Hello from backend to frontend!");
// });

app.post("/weather", async (req, res) => {
  const { cityName: city } = req.body;
  let apiResponse;
  let data;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;
  try {
    apiResponse = await fetch(apiUrl);
    data = await apiResponse.json();
    const { description, icon: iconCode, main } = data.weather[0];
    const currentTemp = `${Math.round(data.main.temp)}°F`;

    res
      .status(200)
      .send(`Current weather for ${city} is ${currentTemp} and ${description}`);

    //  if the city name is not found, we want to send to the client a response with a message that the city isn't found.
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(404).send("City not found!"); // Send a 404 response for not found
  }
});

export default app;
