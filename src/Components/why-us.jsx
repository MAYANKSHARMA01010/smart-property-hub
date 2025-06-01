import React from 'react';
import '../styles/globals.css';
import '../styles/why-us.css';

function WhyUs() {
  return (
    <section className='why-us'>
      <div className='why-us-header'>
        <h2>Why Choose SmartProperty Hub?</h2>
        <p>Discover why thousands of users trust us to find their dream property!</p>
      </div>
      <div className='why-us-content'>
        <div className='why-us-image'>
          <img
            src='/images/why-us.jpg'
            alt='Benefits of using SmartProperty Hub'
            loading='lazy'
          />
        </div>
        <div className='why-us-features'>
          <ul>
            <li>🔍 Verified & Budget-Friendly Property Listings</li>
            <li>📊 Instant Rent vs Buy Smart Comparison Tool</li>
            <li>💾 Save Favorites, Shortlist & Compare Properties</li>
            <li>⚡ Lightning-Fast, Clean & Student-Friendly Interface</li>
            <li>📍 Localized Search with Smart Recommendations</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
