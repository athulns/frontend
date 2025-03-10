import { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Actual authentication with backend
    axios.post('https://backend-1-yaoz.onrender.com/api/auth/login', { email, password })
      .then(response => {
        const token = response.data.token; // Assuming the response contains a token
        localStorage.setItem("token", token); // Store the token
        alert("Login successful!");
        navigate("/home"); // Redirect to homepage
      })
      .catch(error => {
        alert("Invalid email or password.");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-primary">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
