import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./App.css";

function App() {
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "" // Change from imageUrl to image to match backend
  });

  useEffect(() => {
    // Fetch existing listings from the backend on page load
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setListings(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        setListings([]);
      }
    };

    fetchListings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Log formData to ensure it's correctly formatted before sending
      console.log("Form data being sent:", formData);
  
      // Send the formData to the backend
      const response = await axios.post("http://localhost:5000/api/products", formData);
  
      // Log response for debugging
      console.log("Response from backend:", response);
  
      // Check if the response was successful
      if (response.status === 201 && response.data.success) {
        // Add the new listing to the listings state to display it on the frontend
        setListings([...listings, response.data.data]);
  
        // Close the modal and reset the form fields
        setShowModal(false);
        setFormData({ name: "", price: "", image: "" });
      } else {
        console.error("Failed to create listing:", response.data.message);
      }
    } catch (error) {
      console.error("Error while creating listing:", error);
    }
  };
  


  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <button onClick={() => setShowModal(true)}>Create Listing</button>
          <button>Message Inbox</button>
          <button>Your Listing</button>
          <FontAwesomeIcon icon={faUser} className="login-icon" />
        </div>

        <div className="listing-grid">
          {listings && listings.map((listing, index) => (
            <div key={index} className="listing-card">
              <img src={listing.image} alt="Listing" />
              <p>{listing.name}</p>
              <p>${listing.price}</p>
            </div>
          ))}
        </div>

        {/* Modal for Create Listing */}
        {showModal && (
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  name="image" 
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Create</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
