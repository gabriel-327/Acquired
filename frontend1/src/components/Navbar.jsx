import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar({ onOpenModal }) {
  return (
    <div className="navbar">
      <button onClick={onOpenModal}>Create Listing</button>
      <button>Message Inbox</button>
      <button>Your Listing</button>
      <FontAwesomeIcon icon={faUser} className="login-icon" />
    </div>
  );
}

export default Navbar;