'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import '../styles/PropertyCard.css';

export default function PropertyCard({ property }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/property/${property.id}`);
  };

  return (
    <div className="property-card" onClick={handleClick}>
      <img
        src={property.image || '/images/default.jpg'}
        alt={property.title}
        className="property-image"
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
      </div>
    </div>
  );
}
