"use client";
import React, { useEffect, useRef } from "react";
import "../styles/why-us.css";

const features = [
  {
    title: "AI-Powered Recommendations",
    description: "Get smart property suggestions tailored to your preferences, budget, and lifestyle.",
    image: "/AI-Powered Recommendations.png",
  },
  {
    title: "Verified Property Listings",
    description: "Only 100% verified and authentic listings—no spam, no scams.",
    image: "/Verified Property Listings.png",
  },
  {
    title: "Rent vs. Buy Calculator",
    description: "Compare renting vs. buying based on your finances.",
    image: "/Rent vs. Buy Calculator.png",
  },
  {
    title: "Live Bidding System",
    description: "Bid on properties in real-time and get the best deal transparently.",
    image: "/Live Bidding System.png",
  },
  {
    title: "Instant Alerts & Updates",
    description: "Stay informed about new listings, price drops, and trends.",
    image: "/Instant Alerts & Updates.png",
  },
  {
    title: "Intuitive & Clean UI",
    description: "Seamless and simple design that makes property hunting stress-free.",
    image: "/Intuitive & Clean UI.png",
  },
  {
    title: "Expert Guidance",
    description: "Access real estate professionals for personalized advice.",
    image: "/Expert Guidance.png",
  },
  {
    title: "Secure & Transparent Transactions",
    description: "No hidden charges. Full clarity in pricing and deals.",
    image: "/Secure & Transparent Transactions.png",
  },
  {
    title: "Community Reviews & Ratings",
    description: "Read honest feedback from previous buyers/renters.",
    image: "/Community Reviews & Ratings.png",
  },
  {
    title: "Smart Search Filters",
    description: "Narrow options by location, price, amenities, schools, etc.",
    image: "/Smart Search Filters.png",
  },
  {
    title: "Save & Compare Favorites",
    description: "Bookmark listings, compare features, and revisit picks.",
    image: "/Save & Compare Favorites.png",
  },
  {
    title: "Trusted by Thousands",
    description: "Join a growing community of happy users.",
    image: "/Trusted by Thousands.png",
  },
];


export default function WhyUs() {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const bubbleRef = useRef(null);
  let currentIndex = 0;

  const scrollToIndex = (index) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.firstChild.offsetWidth + 20;
    sliderRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    const bubbles = bubbleRef.current.children;
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].classList.remove("active");
    }
    bubbles[index].classList.add("active");
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % features.length;
      scrollToIndex(currentIndex);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="whyus-section">
      <h2 className="whyus-heading">Why Choose SmartProperty Hub?</h2>
      <div className="whyus-slider-container">
        <div className="whyus-slider" ref={sliderRef}>
          {features.map((feature, index) => (
            <div className="whyus-card" key={index}>
              <img src={feature.image} alt={feature.title} className="whyus-img" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="whyus-bubbles" ref={bubbleRef}>
          {features.map((_, i) => (
            <span key={i} className={i === 0 ? "active" : ""}></span>
          ))}
        </div>
      </div>
    </section>
  );
}
