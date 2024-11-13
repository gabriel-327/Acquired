import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

function Signup({ onRegister }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@ufl.edu")) { //checks to ensure email is ufl.edu
      setMessage("Invalid Email, UFL email required"); 
      return; 
    }
    try {
      const response = await axios.post("http://localhost:5001/api/users/register", formData);
      if (response.data.success) {
        setMessage("User registered successfully!");
        onRegister(); 
        navigate("/"); 
      } else {
        setMessage(response.data.msg || "User already exists");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>ACQUIRED</h1>
        <h2>Sign Up</h2>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Register</button>
        
        {/* Link to Login Page */}
        <p>Already have an account? <Link to="/login">Log In</Link></p>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Signup;
