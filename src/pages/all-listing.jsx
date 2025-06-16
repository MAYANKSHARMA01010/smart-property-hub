'use client';

import React, { useState, useEffect } from 'react';
import '../styles/AllListing.css';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import propertiesData from '../data/properties.json';

export default function AllListing() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    sort: '',
    readyToMove: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 28;

  useEffect(() => {
    setProperties(propertiesData);
    setFiltered(propertiesData);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFilters({ ...filters, [name]: newValue });
  };

  const applyFilters = () => {
    let result = [...propertiesData];

    if (filters.city) result = result.filter(p => p.city === filters.city);
    if (filters.type) result = result.filter(p => p.propertyType === filters.type);
    if (filters.readyToMove) result = result.filter(p => p.amenities.includes("Ready to Move"));
    if (filters.sort === 'lowToHigh') result.sort((a, b) => a.price - b.price);
    if (filters.sort === 'highToLow') result.sort((a, b) => b.price - a.price);
    if (filters.sort === 'AtoZ') result.sort((a, b) => a.title.localeCompare(b.title));
    if (filters.sort === 'ZtoA') result.sort((a, b) => b.title.localeCompare(a.title));

    setFiltered(result);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      city: '',
      type: '',
      sort: '',
      readyToMove: false,
    });
    setFiltered(propertiesData);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="page">
      <Navbar />
      <div className='all-listing'>
        <h1 className="title">All Property Listings</h1>

        <div className="filters">
          <select name="city" value={filters.city} onChange={handleFilterChange}>
            <option value="">All Cities</option>
            {[...new Set(properties.map(p => p.city))].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All Types</option>
            {[...new Set(properties.map(p => p.propertyType))].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select name="sort" value={filters.sort} onChange={handleFilterChange}>
            <option value="">Sort by</option>
            <option value='AtoZ'>Name: A to Z</option>
            <option value='ZtoA'>Name: Z to A</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>

          <label className="ready-filter">
            <input
              type="checkbox"
              name="readyToMove"
              checked={filters.readyToMove}
              onChange={handleFilterChange}
            />
            Ready to Move
          </label>

          <button onClick={applyFilters}>Apply</button>
          <button onClick={resetFilters} className="reset">Reset Filters</button>
        </div>

        <div className="property-grid">
          {currentItems.map(property => (
            <div className="property-card" key={property.id}>
              <img src={property.image || '/default-property.jpg'} alt={property.title} />
              <h2>{property.title}</h2>
              <p><strong>Location:</strong> {property.location.city}, {property.location.state}</p>
              <p><strong>Type:</strong> {property.propertyType}</p>
              <div className="cards">
                <div className="card">₹{property.price.toLocaleString()}</div>
                <div className="card">{property.sizeSqFt} sqft</div>
                <div className="card">{property.bedrooms} Bed / {property.bathrooms} Bath</div>
              </div>
              <div className="badges">
                {property.amenities.slice(0, 3).map((a, i) => (
                  <span className="badge" key={i}>{a}</span>
                ))}
                {property.amenities.includes("Ready to Move") && (
                  <span className="badge highlight">Ready to Move</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {currentPage > 3 && (
            <button onClick={() => setCurrentPage(1)}>⏮ First</button>
          )}
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(currentPage - 1)}>‹ Prev</button>
          )}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            if (
              page === currentPage ||
              page === currentPage - 2 ||
              page === currentPage - 1 ||
              page === currentPage + 1 ||
              page === currentPage + 2
            ) {
              return (
                <button
                  key={page}
                  className={page === currentPage ? 'active' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            }
            return null;
          })}
          {currentPage < totalPages && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next ›</button>
          )}
          {currentPage < totalPages - 2 && (
            <button onClick={() => setCurrentPage(totalPages)}>Last ⏭</button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
