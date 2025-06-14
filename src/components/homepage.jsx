'use client'

import React from 'react'
import '../styles/homePage.css'
import '../styles/globals.css'

import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import WhyUs from '@/components/why-us.jsx'
import ContactUs from '@/components/contactUs.jsx'
import CalculatorForm from '@/components/CalculatorForm.jsx'
import PropertyCard from '@/components/PropertyCard.jsx'
import properties from '@/data/properties.json'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const trending = properties.slice(0, 3);
  const router = useRouter();

  return (
    <div className="HomePage">

      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <h1>Welcome to <span className="highlight">SmartProperty Hub</span> 🏠</h1>
          <p>Your one-stop solution to decide smartly: Rent or Buy?</p>
          <button
            className="btn btn-primary hero-button"
            onClick={() => router.push('/calculatorpage')}
          >
            Start Rent vs Buy Calculator
          </button>
        </div>
      </section>

      {/* Mini Calculator */}
      <section className="mini-calculator section-padding">
        <div className="container mini-calculator-container">
          <div className="mini-calculator-left">
            <h2 className="section-heading">Quick Calculator</h2>
            <CalculatorForm isMini={true} />
          </div>
          <div className="mini-calculator-right">
            <img
              src="/miniCalculator.png"
              alt="Calculator Illustration"
              className="mini-calculator-image"
            />
          </div>
        </div>
      </section>

      {/* Trending Listings */}
      <section className="trending section-padding">
        <div className="container">
          <h2 className="section-heading">Trending Properties</h2>
          <div className="property-grid">
            {trending.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="view-all">
            <button
              className="btn btn-secondary view-all-button"
              onClick={() => router.push('/all-listing')}
            >
              View All Listings
            </button>
          </div>
        </div>
      </section>

      <WhyUs />
      <ContactUs />
      <Footer />

    </div>
  )
}
