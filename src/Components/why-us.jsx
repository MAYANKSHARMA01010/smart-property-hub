import React from 'react'
import '../styles/globals.css';
import '../styles/why-us.css';

function whyUs() {
  return (
    <div className='why-us'>
        <h2>Why Choose SmartProperty Hub?</h2>
        <div className="why-us-content">
          <div className="why-us-image">
            <img src="/images/why-us.jpg" alt="SmartProperty Hub Benefits" />
          </div>
          <div className="why-us-features">
            <ul>
              <li>🔍 Verified & Budget-Friendly Property Listings</li>
              <li>📊 Instant Rent vs Buy Smart Comparison Tool</li>
              <li>💾 Save Favorites, Shortlist & Compare Properties</li>
              <li>⚡ Lightning-Fast, Clean & Student-Friendly Interface</li>
              <li>📍 Localized Search with Smart Recommendations</li>
            </ul>
          </div>
        </div>
    </div>
  )
}

export default whyUs
