'user client'

import React from 'react'
import '../styles/HomePage.css'
import '../styles/globals.css'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhyUs from '@/components/why-us' 
import ContactUs from '@/components/contactUs'
import CalculatorForm from '@/components/CalculatorForm'
import PropertyCard from '@/components/PropertyCard'
import properties from '@/data/properties.json'
import { useRouter } from 'next/navigation'


export default function HomePage() {

  // it will give me top 4 properties from the properties.json file
  const trending = properties.slice(0, 4); 
  const router = useRouter();

  return (
    <div className='HomePage'>

        <Navbar />

        {/* Hero Section with calculator page button */}
        <section className="hero">
          <h1>Welcome to SmartProperty Hub 🏠</h1>
          <p>Your one-stop solution to decide smartly: Rent or Buy?</p>
          <button onClick={() => router.push('/calculatorpage')}>Start Rent vs Buy Calculator</button>
        </section>

        {/* Mini Calculator to renting cost and buying cost properties.json and display in home */}
        <section className="mini-calculator">
          <h2>Quick Calculator</h2>
          <CalculatorForm isMini={true} />
        </section>

        {/* Trending Listings wiht bring data from properties.json and display top 3 in home 
        it will have a listing button which will show all properties with lots of filter */}
        <section className="trending">
          <h2>Trending Properties</h2>
          <div className="property-grid">
            {trending.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <button onClick={() => window.location.href = '/listings'}>
            View All Listings
          </button>
        </section>

        <WhyUs />
        <ContactUs />
        <Footer />

    </div>
  )
}