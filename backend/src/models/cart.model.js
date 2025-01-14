import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Change ObjectId to String
  items: [
    {
      cakeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cake",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
