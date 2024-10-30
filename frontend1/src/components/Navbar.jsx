import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"; // Import Link

function Navbar({ onOpenModal }) {
  return (
    <div className="navbar">
      <button onClick={onOpenModal}>Create Listing</button>
      <button>Message Inbox</button>
      <button>Your Listing</button>
      {/* Use Link to navigate to the login page */}
      <Link to="/signup">
        <FontAwesomeIcon icon={faUser} className="login-icon" />
      </Link>
    </div>
  );
}

export default Navbar;
