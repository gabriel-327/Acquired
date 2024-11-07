import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import CreateListingModal from "./components/CreateListingModal";
import ListingCard from "./components/ListingCard";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';

function App() {
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: ""
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setListings(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
    if (isAuthenticated) fetchListings(); 
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/products", formData);
      setListings([...listings, response.data.data]);
      setShowModal(false);
      setFormData({ name: "", price: "", image: "" });
    } catch (error) {
      console.error("Failed to create listing:", error);
    }
  };

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <Routes>
            <Route path="/signup" element={<Signup onRegister={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/signup" />} />
          </Routes>
        ) : (
          <div>
            <header className="App-header">
              <Navbar onOpenModal={() => setShowModal(true)} />
              
              <div className="listing-grid">
                {listings.map((listing, index) => (
                  <ListingCard key={index} listing={listing} />
                ))}
              </div>

              {showModal && (
                <CreateListingModal
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  onClose={() => setShowModal(false)}
                />
              )}
            </header>
            <Routes>
              <Route path="*" element={<Navigate to="/" />} /> 
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
