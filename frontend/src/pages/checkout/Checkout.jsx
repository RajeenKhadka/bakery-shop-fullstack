import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import "./checkout.css";

function Checkout({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: user.email,
    address: "",
    phoneNumber: "",
  });

  const [orderSummary, setOrderSummary] = useState({
    cart: location.state.cart || [],
    totalPrice: location.state.totalPrice || 0,
  });

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard"); // Default to credit card

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock payment success
      const paymentSuccess = mockPayment(paymentMethod);

      if (paymentSuccess) {
        const orderData = {
          userId: formData.email, // Using email as userId for now, but this should be a valid user ID (adjust accordingly)
          items: orderSummary.cart.map((item) => ({
            cakeId: item.cakeId._id, // Ensure cakeId is an ObjectId string, not an object
            quantity: item.quantity,
          })),
          totalPrice: orderSummary.totalPrice,
          shippingAddress: formData.address,
          email: formData.email,
          phone: formData.phoneNumber,
          paymentMethod: paymentMethod,
          date: new Date().toISOString(),
        };

        await axios.post(
          "https://bakery-shop-fullstack.onrender.com/api/orders/create",
          orderData
        );
        setLoading(false);
        alert(
          "Your order has been placed. Confirmation has been sent to your email."
        );
        navigate("/"); // Redirect to home or another page after successful order
      } else {
        setLoading(false);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the order:", error);
      setLoading(false);
    }
  };

  const mockPayment = (method) => {
    // Simulate a successful payment for now
    if (method === "creditCard") {
      return true; // Mock success for credit card
    } else if (method === "paypal") {
      return true; // Mock success for PayPal
    } else if (method === "mockPayment") {
      return true; // Mock success for mock payment
    }
    return false; // Payment failed for other methods
  };

  useEffect(() => {
    if (!orderSummary.cart.length) {
      navigate("/cart");
    }
  }, [orderSummary.cart, navigate]);

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <ul className="checkout-items">
          {orderSummary.cart.map((item) => (
            <li key={item._id} className="checkout-item">
              <div className="checkout-item-details">
                <img
                  src={item.cakeId?.imageUrl}
                  alt={item.cakeId?.name}
                  className="checkout-item-img"
                />
                <span className="checkout-item-name">{item.cakeId?.name}</span>
                <span className="checkout-item-quantity">
                  ${item.cakeId?.price} x {item.quantity}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="checkout-total">
          Total: <span>${orderSummary.totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="checkout-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="checkout-form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="checkout-form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="checkout-form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            required
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="mockPayment">Mock Payment (Test)</option>
          </select>
        </div>

        <div className="checkout-buttons">
          <button type="submit" className="checkout-btn" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
