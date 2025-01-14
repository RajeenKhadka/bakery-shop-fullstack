import { Routes, Route } from "react-router";
import "./App.css";
import Nav from "./components/NavBar/Nav";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import { useCart } from "./utilities/cart-functions.js";

const mockUser = {
  userId: "mock12345", // Ensure this is valid
  name: "John Doe",
  email: "johndoe@example.com",
};

console.log("User ID being passed to Cart:", mockUser.userId);

function App() {
  const { cart, addToCart, removeItem, updateQuantity } = useCart(
    mockUser.userId
  );

  return (
    <>
      <Nav user={mockUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={<Menu user={mockUser} addToCart={addToCart} />}
        />
        <Route path="/order" element={<Order user={mockUser} />} />
        <Route
          path="/cart"
          element={
            <Cart
              userId={mockUser.userId} // Pass userId explicitly
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
