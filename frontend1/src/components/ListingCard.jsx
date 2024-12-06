// import React from 'react';

// function ListingCard({ listing }) {
//   return (
//     <div className="listing-card">
//       <img src={listing.image} alt="Listing" />
//       <p>{listing.name}</p>
//       <p>${listing.price}</p>
//     </div>
//   );
// }

// export default ListingCard;

import React from 'react';

function ListingCard({ listing, onMessage}) {
  return (
    <div className="listing-card">
      <img src={listing.image} alt="Listing" />
      <p>{listing.name}</p>
      <p>${listing.price}</p>
      {/* Add Message button */}
      <button onClick = {() => onMessage(listing.creatorId)}>Message Seller</button>
    </div>
  );
}

export default ListingCard;





