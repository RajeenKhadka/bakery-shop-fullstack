import { useState } from "react";
import { useNavigate } from "react-router";
import userService from "../../utilities/users-services.js";

function LoginForm({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = { ...formData };
    try {
      // The promise returned by the login service method will resolve to the user object
      const user = await userService.logIn(credentials);
      setUser(user); // Set user state after successful login
      navigate("/"); // Redirect to the home page after login
    } catch (err) {
      setError("Login Failed - Try Again");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email : </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          required
        />
        <br />
        <label>Password : </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
          required
        />
        <br />
        <button type="submit">Log In</button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default LoginForm;
