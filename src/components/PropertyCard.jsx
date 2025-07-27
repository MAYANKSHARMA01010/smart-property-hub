'use client';

import React from 'react';
// import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import '../styles/PropertyCard.css';
import { Heart } from 'lucide-react';

export default function PropertyCard({ property }) {
  // const router = useRouter();

  // const handleClick = () => {
  //   router.push(`/property/${property.id}`);
  // };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toast.success('💖 Added to wishlist (feature will be added soon😅)');
  };

  return (
    <div
      className="property-card"
      // onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="image-container">
        <img
          src={property.image || '/images/default.jpg'}
          alt={property.title}
          className="property-image"
          loading="lazy"
        />
        <button
          className="wishlist-button"
          onClick={handleWishlistClick}
          aria-label="Add to Wishlist"
        >
          <Heart size={18} /> Wishlist
        </button>
      </div>

      <div className="property-info">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-city">{property.city}</p>
        <p className="property-price">₹{property.price.toLocaleString()}</p>

        <div className="property-meta">
          <span>{property.bedrooms} 🛏️</span>
          <span>{property.bathrooms} 🛁</span>
          <span>{property.sizeSqFt} sqft 📐</span>
        </div>

        <div className="tags-scroll">
          {property.amenities?.slice(0, 5).map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
