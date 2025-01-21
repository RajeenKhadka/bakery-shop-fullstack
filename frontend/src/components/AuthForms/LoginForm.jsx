import "./auth.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import userService from "../../utilities/users-services.js";

function LoginForm({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await userService.logIn({ ...formData });
      setUser(user);
      navigate("/");
    } catch (err) {
      setError("Login Failed - Try Again");
    }
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;
