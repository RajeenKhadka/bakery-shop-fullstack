import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Nav from "./components/NavBar/Nav";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Checkout from "./pages/checkout/Checkout.jsx";
import Cart from "./pages/cart/Cart";
import AuthPage from "./pages/authpage/AuthPage.jsx";
import { useCart } from "./utilities/cart-functions.js";
import { getUser } from "./utilities/users-services.js";

function App() {
  const [user, setUser] = useState(getUser());
  const {
    cart,
    fetchCart,
    loading,
    addToCart,
    removeItem,
    updateQuantity,
    deleteCart,
  } = useCart(user?._id); // Handle potential null user

  return (
    <>
      <Nav user={user} setUser={setUser} deleteCart={deleteCart} />
      <h1>Hello {user ? user.name + "!" : "!"}</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={<Menu addToCart={addToCart} user={user} />} // Pass user to Menu
        />

        <Route path="/checkout" element={<Checkout user={user} />} />
        <Route
          path="/cart"
          element={
            <Cart
              userId={user?._id} // Pass userId explicitly
              cart={cart} // Pass cart state to the Cart component
              removeItem={removeItem}
              updateQuantity={updateQuantity}
              fetchCart={fetchCart}
              loading={loading}
            />
          }
        />
        <Route
          path="/authentication"
          element={<AuthPage setUser={setUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
