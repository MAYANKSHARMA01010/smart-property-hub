'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PropertyCard from '@/components/PropertyCard.jsx';
import propertiesData from '@/data/properties.json';
import '../styles/AllListing.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const AllListing = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const propertiesPerPage = 60;

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleCityChange = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } 
    else if (selectedCities.length < 8) {
      setSelectedCities([...selectedCities, city]);
    }
    if (selectedCities.length === 8) {
      toast.error('You can select a maximum of 8 cities.');
    }
  };

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } 
    else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
    if (selectedTags.length === 5) {
      toast.error('You can select a maximum of 5 tags.');
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredProperties = propertiesData
    .filter(p =>
      (selectedCities.length === 0 || selectedCities.includes(p.city)) &&
      (selectedTags.length === 0 || (p.tags && p.tags.some(tag => selectedTags.includes(tag))))
    )
    .sort((a, b) => {
      if (sortOption === 'price-low-high') {
        return a.price - b.price;
      }
      if (sortOption === 'price-high-low') {
        return b.price - a.price;
      }
      if (sortOption === 'city-az') {
        return a.city.localeCompare(b.city);
      }
      if (sortOption === 'city-za') {
        return b.city.localeCompare(a.city);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className="all-listing-page">
        <div className="filter-toggle" onClick={toggleFilter}>
          {filterVisible ? '▲ Hide Filters' : '▼ Show Filters'}
        </div>
        
        {filterVisible && (
          <div className="filters">

             <div className="filter-section">
              <h3>Sort By</h3>
              <select value={sortOption} onChange={handleSortChange}>
                <option value="">-- Select Sort --</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="city-az">City: A-Z</option>
                <option value="city-za">City: Z-A</option>
              </select>
            </div>

            <div style={{color: '#ffffff'}}>-</div>

            <div className="filter-section">
              <h3>Select Cities</h3>
              <div className="options">
                {[
                  "Noida", "Delhi", "Gurugram", "Ghaziabad", "Faridabad", "Greater Noida",
                  "Mumbai", "Pune", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
                  "Lucknow", "Jaipur", "Indore", "Bhopal", "Ahmedabad", "Chandigarh",
                  "Surat", "Nagpur"
                ].map(city => (
                  <label key={city}>
                    <input
                      type="checkbox"
                      checked={selectedCities.includes(city)}
                      onChange={() => handleCityChange(city)}
                    />
                    {city}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Select Tags</h3>
              <div className="options">
                {[
                  "Affordable", "New Construction", "Budget", "Govt Scheme", "Luxury",
                  "Near Metro", "Ready to Move", "Furnished", "Park Facing", "Smart Home",
                  "Gated Society", "High ROI", "Near School", "Near Hospital",
                  "Swimming Pool", "Gym", "Clubhouse", "Open Green Space", "Kids Play Area",
                  "24x7 Security", "Power Backup", "Corner Flat", "Low Maintenance",
                  "Premium Location", "Vaastu Compliant", "Pet Friendly", "EV Charging",
                  "Terrace Access", "Private Garden", "Eco-Friendly"
                ].map(tag => (
                  <label key={tag}>
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>

          </div>
        )}

        <div className="properties-grid">
          {currentProperties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <button className="scroll-to-top" onClick={handleScrollTop}>↑</button>
      </div>
      <Footer />
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </>
  );
};

export default AllListing;
