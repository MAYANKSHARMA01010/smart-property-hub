'use client';

import React, { useState, useEffect } from 'react';
import '../styles/AllListing.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
  const itemsPerPage = 30;

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
    if (filters.readyToMove) result = result.filter(p => p.amenities?.includes("Ready to Move"));

    switch (filters.sort) {
      case 'lowToHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'AtoZ':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'ZtoA':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

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

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            className={i === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        );
      } else if (
        i === currentPage - 2 ||
        i === currentPage + 2
      ) {
        pages.push(<span key={i}>...</span>);
      }
    }

    return pages;
  };

  return (
    <div className="page">
      <Navbar />

      <div className="all-listing">
        <h1 className="title">All Property Listings</h1>

        {/* Filters */}
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
            <option value="AtoZ">Name: A to Z</option>
            <option value="ZtoA">Name: Z to A</option>
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
          <button className="reset" onClick={resetFilters}>Reset</button>
        </div>

        {/* Properties Grid */}
        <div className="property-grid">
          {currentItems.length > 0 ? currentItems.map(property => (
            <div className="property-card" key={property.id}>
              <img
                className="property-image"
                src={property.image || '/default-property.jpg'}
                alt={property.title}
              />

              <div className="property-details">
                <h2 className="property-title">{property.title}</h2>
                <p className="property-meta">
                  {property.city}, {property.location.state} | {property.propertyType}
                </p>

                <div className="cards">
                  <div className="card">₹{property.price.toLocaleString()}</div>
                  <div className="card">{property.sizeSqFt} sqft</div>
                  <div className="card">{property.bedrooms} Bed / {property.bathrooms} Bath</div>
                </div>

                <div className="badges">
                  {property.amenities.slice(0, 3).map((a, i) => (
                    <span className="badge" key={i}>{a}</span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="badge">+{property.amenities.length - 3} more</span>
                  )}
                  {property.amenities.includes("Ready to Move") && (
                    <span className="badge highlight">Ready to Move</span>
                  )}
                </div>

                <p className="agent-info">
                  <strong>Agent:</strong> {property.agent.name} | {property.agent.phone}
                </p>
              </div>
            </div>
          )) : (
            <p className="no-results">No properties match your filters.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(currentPage - 1)}>‹ Prev</button>
          )}
          {renderPagination()}
          {currentPage < totalPages && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next ›</button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
