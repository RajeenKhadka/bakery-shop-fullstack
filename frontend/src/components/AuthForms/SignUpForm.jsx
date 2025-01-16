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
    console.log(formData);

    try {
      const submitData = { ...formData };
      delete submitData.confirm;
      console.log(submitData);
      const user = await signUp(submitData);
      setError("Successful!");
    } catch (err) {
      console.error("Error during sign-up:", err);
      setError(`Sign up failed - ${err.message || "Try again"}`);
    }
  };

  return (
    <>
      <h1>Sign up</h1>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            required
          />
          <br />
          <label>Email (needs to be unique) : </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address will be your login"
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
          <label>Confirm Password (needs to be same) : </label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            placeholder="must match password"
            required
          />
          <br />
          <button
            type="submit"
            disabled={formData.password !== formData.confirm}
          >
            Sign Up
          </button>
        </form>
        <p>{error}</p>
      </div>
    </>
  );
}

export default SignUpForm;
