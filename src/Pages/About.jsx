import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import '../styles/globals.css'
import '../styles/about.css'

function About() {
  return (
    <div className='about'>
      <Navbar />
      <div className="about-container">
        <h1>About Us</h1>
        <p>Welcome to SmartProperty Hub, your trusted partner in real estate decisions. We are dedicated to helping you make informed choices about renting or buying properties.</p>
        <p>Our mission is to provide you with the tools and information you need to navigate the real estate market with confidence. Whether you're a first-time homebuyer or a seasoned investor, we have the resources to assist you.</p>
        <p>Join us on this journey to find your dream property!</p>
        <h2>Our Team</h2>
        <p>We are a team of passionate real estate professionals, data analysts, and tech enthusiasts committed to revolutionizing the way you approach property decisions.</p>
      </div>
      <Footer />
    </div>
  )
}

export default About
 