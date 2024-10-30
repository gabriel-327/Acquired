import React from 'react';

function ListingCard({ listing }) {
  return (
    <div className="listing-card">
      <img src={listing.image} alt="Listing" />
      <p>{listing.name}</p>
      <p>${listing.price}</p>
    </div>
  );
}

export default ListingCard;
