import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      console.log("Response data:", response.data); // Log the response for debugging
      if (response.data && response.data.success) {
        setMessage("Login successful!");
        onLogin(); // Update isAuthenticated state in App.js
        navigate("/"); // Redirect to main page
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error); // Log the exact error
      // Display a more specific error message if available
      setMessage(error.response?.data?.message || "An error occurred during login.");
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Login</button>
        
        {message && <p>{message}</p>}
        
        {/* Link to Signup Page */}
        <p>Don’t have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
