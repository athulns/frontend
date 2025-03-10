import { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Registration with backend
    if (name && email && password) {
      axios.post('https://backend-1-yaoz.onrender.com/api/auth/register', { username: name, email, password })
        .then(response => {
          console.log("Registration response:", response); // Log the response for debugging
          alert("Registration successful! You can now log in.");
          navigate("/login"); // Redirect to Login Page
        })
        .catch(error => {
          alert("Registration failed. Please try again.");
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      <form className="w-50 mx-auto card p-4 shadow-sm" onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
