import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Nav from "./components/NavBar/Nav";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import AuthPage from "./pages/authpage/AuthPage.jsx";

import { useCart } from "./utilities/cart-functions.js";
import { getUser } from "./utilities/users-services.js";

function App() {
  const [user, setUser] = useState(getUser());
  const { cart, addToCart, removeItem, updateQuantity } = useCart(user?._id); // Handle potential null user

  return (
    <>
      {user ? (
        <>
          <Nav user={user} /> {/* Pass user to Nav for dynamic updates */}
          <h1>Hello {user.name}</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/order" element={<Order />} />
            <Route
              path="/cart"
              element={
                <Cart
                  userId={user._id} // Pass userId explicitly
                  removeItem={removeItem}
                  updateQuantity={updateQuantity}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </>
  );
}

export default App;
