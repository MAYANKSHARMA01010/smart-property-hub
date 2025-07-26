'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import '../styles/PropertyCard.css';

export default function PropertyCard({ property }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/property/${property.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Prevent card click
    toast('💖 Wishlist feature coming soon!');
  };

  return (
    <div
      className="property-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <img
        src={property.image || '/images/default.jpg'}
        alt={property.title}
        className="property-image"
        loading="lazy"
      />
      <div className="property-info">
        <h3>{property.title}</h3>
        <p className="city">{property.city}</p>
        <p className="price">₹{property.price.toLocaleString()}</p>
        <div className="tags">
          {property.tags?.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <button className="wishlist-button" onClick={handleWishlistClick}>
          ❤️ Add to Wishlist
        </button>
      </div>
    </div>
  );
}
