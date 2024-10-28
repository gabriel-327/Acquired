import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: ''
  });

  // Open and close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Send a POST request to the backend API with form data
    const response = await axios.post('http://localhost:5000/api/products', {
      name: formData.name,
      price: formData.price,
      image: formData.image
    });
    setMessage("Product created successfully!");
    setFormData({ name: '', price: '', image: '' }); // Clear form fields after submission
    closeModal(); // Close modal
  } catch (error) {
    setMessage("Failed to create product.");
    console.error("There was an error creating the product:", error);
  }
};


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>

        {/* Open Modal Button */}
        <button onClick={openModal}>Create a post here</button>

        {/* Status Message */}
        {message && <p>{message}</p>}

        {/* Modal for User Input */}
        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Create New Product</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Image URL:
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </label>
                <button type="submit">Submit</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
