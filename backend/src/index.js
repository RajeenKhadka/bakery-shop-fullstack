import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
dotenv.config();

//Imports

const PORT = process.env.PORT || 5000;
const app = express();

//Middleware
app.use(cors());
// app.use(logger("dev"));
app.use(express.json());

//Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//Route
app.get("/", (req, res) => {
  res.send("<h1>Cake Bakery Server</h1>");
});

//default, catch all routes
app.get("/*", (req, res) => {
  res.redirect("/");
});

//Globar handling error
// Global error handling after the routes
app.use((err, _req, res, next) => {
  res.status(500).send("there was an issue on the server");
});
