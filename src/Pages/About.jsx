'use client'

import React from 'react'
import '../styles/globals.css'
import '../styles/about.css'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

function About() {
  return (
    <div className='about'>
      <Navbar />
      <main className="aboutContainer">
        <h1>About SmartProperty Hub</h1>
        <p>
          At <strong>SmartProperty Hub</strong>, we believe that finding the perfect property should be simple, transparent, and empowering. Whether you're looking to rent, buy, or invest, our platform provides you with cutting-edge tools, data-driven insights, and personalized recommendations to guide your journey.
        </p>

        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            To revolutionize real estate decisions by delivering innovative, reliable, and user-friendly solutions that put you in control of your property choices.
          </p>
        </section>

        <section className="vision">
          <h2>Our Vision</h2>
          <p>
            To be the go-to destination for real estate seekers across the nation, fostering a transparent, accessible, and intelligent property market for everyone.
          </p>
        </section>

        <section className="values">
          <h2>What Makes Us Different</h2>
          <ul>
            <li><strong>Data-Driven Insights:</strong> We harness advanced analytics and real-time data to help you spot the best opportunities.</li>
            <li><strong>Comprehensive Listings:</strong> Access a curated and diverse selection of properties tailored to your preferences.</li>
            <li><strong>Innovative Tools:</strong> Our rent vs buy calculator, bidding platform, and personalized filters make decision-making effortless.</li>
            <li><strong>User-Centric Design:</strong> A sleek, intuitive interface ensures your property search is smooth and enjoyable.</li>
            <li><strong>Trusted Expertise:</strong> Backed by real estate professionals and tech experts dedicated to your success.</li>
          </ul>
        </section>

        <section className="team">
          <h2>Meet Our Team</h2>
          <p>
            We are a passionate group of real estate professionals, data scientists, and technology enthusiasts committed to transforming your property journey. With a blend of industry knowledge and innovative technology, we strive to create the smartest property hub on the web.
          </p>
        </section>

        <section className="community">
          <h2>Join Our Community</h2>
          <p>
            Whether you're a buyer, seller, renter, or investor, we invite you to explore SmartProperty Hub and be part of our growing community. Stay connected with the latest trends, insights, and property opportunities tailored just for you.
          </p>
          <p>
            Follow us on social media, subscribe to our newsletter, or reach out to our support team — we're here to help every step of the way.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About
