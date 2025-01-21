import "./auth.css";
import { useState } from "react";
import { signUp } from "../../utilities/users-services.js";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = { ...formData };
      delete submitData.confirm;
      await signUp(submitData);
      setError("Successful!");
    } catch (err) {
      setError(`Sign up failed - ${err.message || "Try again"}`);
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
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
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          placeholder="Confirm password"
          required
        />
        <button type="submit" disabled={formData.password !== formData.confirm}>
          Sign Up
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignUpForm;
