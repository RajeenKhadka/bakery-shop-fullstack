import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
dotenv.config();

// Connection to mongoose
import db from "./db/conn.js";

// Route Imports
import cakeEntries from "./routes/cake.route.js";
import cartRoutes from "./routes/cart.route.js"; // Import the cart routes

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Route for home page
app.get("/", (req, res) => {
  res.send("<h1>Cake Bakery Server</h1>");
});

// Endpoints
app.use("/api/cakes", cakeEntries); // Cakes route
app.use("/api/cart", cartRoutes); // Cart route

// Default, catch-all routes (optional)
app.get("/*", (req, res) => {
  res.redirect("/");
});

// Global error handling after the routes
app.use((err, _req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).send("There was an issue on the server");
});
