import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Create a new user
async function create(req, res) {
  try {
    console.log(req.body);
    const createdUser = await User.create(req.body);
    const token = createJWT(createdUser);
    res.status(200).json(token);
  } catch (err) {
    console.error("Error creating user:", err); // Log the full error
    res.status(400).json({ error: err.message });
  }
}

// User login
async function login(req, res) {
  try {
    // Query the database to find a user with the email provided
    const user = await User.findOne({ email: req.body.email });

    // If the email does not exist, throw an error
    if (!user) throw new Error("User Not Found");

    // Compare the password (remember it's stored encrypted)
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Bad password");

    // Create a JWT token
    const token = createJWT(user);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

//====================== Helper Function ========================

// Helper function to create JWT
function createJWT(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret key is missing");
  }

  return jwt.sign(
    // Data payload
    { userId: user._id }, // Only pass userId for security purposes
    process.env.JWT_SECRET, // Use the secret from the environment variable
    { expiresIn: "24h" } // Set the expiration time for the token
  );
}

export default { create, login };
