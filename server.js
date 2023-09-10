"use strict";

// Import Modules
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
console.log(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
