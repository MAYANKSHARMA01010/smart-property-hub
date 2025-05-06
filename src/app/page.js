'use client';

import React from 'react';
import '../styles/HomePage.css';
import '../styles/globals.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CalculatorForm from '@/components/CalculatorForm';
import PropertyCard from '@/components/PropertyCard';

import { useRouter } from 'next/navigation';
import properties from '@/data/properties.json';

export default function Home() {
  const trending = properties.slice(0, 3); // Pick top 3 for homepage
  const router = useRouter();

  return (
    <div className="HomePage">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to SmartProperty Hub 🏠</h1>
        <p>Your one-stop solution to decide smartly: Rent or Buy?</p>
        <button onClick={() =>  router.push('/calculatorpage')}>Start Rent vs Buy Calculator</button>
        <button onClick={() => router.push('/listings')}>Explore Listings</button>
      </section>

      {/* Mini Calculator */}
      <section className="mini-calculator">
        <h2>Quick Calculator</h2>
        {/* <CalculatorForm isMini={true} /> */}
      </section>

      {/* Trending Listings */}
      <section className="trending">
        <h2>Trending Properties</h2>
        {/* <div className="property-grid">
          {trending.map((property) => (
            // <PropertyCard key={property.id} property={property} />
          ))}
        </div> */}
        <button onClick={() => window.location.href = '/listings'}>
          View All Listings
        </button>
      </section>

      {/* Why Us Section */}
      <section className="why-us">
        <h2>Why SmartProperty Hub?</h2>
        <ul>
          <li>🔍 Discover verified affordable homes</li>
          <li>📊 Compare Rent vs Buy instantly</li>
          <li>💸 Save & shortlist your favorites</li>
          <li>⚡ Fast, simple, student-friendly design</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
}
