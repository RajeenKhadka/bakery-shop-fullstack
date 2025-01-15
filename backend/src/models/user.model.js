import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";
import Cart from "./cart.model.js"; // Import Cart model to reference it

const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    // Add a reference to the Cart model
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password; // Remove password field from JSON output
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  //"this" is the user doc
  if (!this.isModified("password")) return next();
  // If the password has changed, we need to update the password with the computed hashed password
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

const User = mongoose.model("User", userSchema);

export default User;
