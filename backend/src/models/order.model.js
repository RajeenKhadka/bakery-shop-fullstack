import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  items: [
    {
      cakeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Cake",
      },
      quantity: { type: Number, required: true },
      cakeName: { type: String, required: true }, // Store cake name in the order
    },
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  paymentMethod: { type: String, required: true }, // E.g., 'mock', 'creditCard', 'paypal'
  orderStatus: { type: String, default: "Pending" }, // Status: Pending, Confirmed, Shipped, Delivered, etc.
  createdAt: { type: Date, default: Date.now },
});

orderSchema.pre("save", async function (next) {
  // Populate cakeName before saving the order
  for (let item of this.items) {
    const cake = await mongoose.model("Cake").findById(item.cakeId);
    if (cake) {
      item.cakeName = cake.name; // Set the cakeName field dynamically from the Cake model
    }
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
