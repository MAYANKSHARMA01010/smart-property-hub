'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import '../styles/CalculatorPage.css';

export default function CalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [propertyTax, setPropertyTax] = useState('');
  const [maintenanceCost, setMaintenanceCost] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loanAmount = parseFloat(propertyPrice) - parseFloat(downPayment);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseInt(loanTerm) * 12;

    const monthlyMortgagePayment =
      loanAmount *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const monthlyPropertyTax = parseFloat(propertyTax) / 12;
    const totalMonthlyBuyingCost =
      monthlyMortgagePayment + monthlyPropertyTax + parseFloat(maintenanceCost);

    const totalMonthlyRentCost = parseFloat(monthlyRent);
    const costDifference = totalMonthlyBuyingCost - totalMonthlyRentCost;

    setResult({
      totalMonthlyBuyingCost,
      totalMonthlyRentCost,
      costDifference,
    });

    setTimeout(() => {
      document.querySelector('.result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="calculator-page">
      <Navbar />
      <main className="calculator-container">
        <h1 className="calculator-title">🏠 Rent vs Buy Calculator</h1>
        <form onSubmit={handleSubmit} className="calculator-form">
          <div className="form-group">
            <label>Property Price (₹)</label>
            <input type="number" value={propertyPrice} onChange={(e) => setPropertyPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Down Payment (₹)</label>
            <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Loan Term (Years)</label>
            <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Interest Rate (%)</label>
            <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Monthly Rent (₹)</label>
            <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Annual Property Tax (₹)</label>
            <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Monthly Maintenance (₹)</label>
            <input type="number" value={maintenanceCost} onChange={(e) => setMaintenanceCost(e.target.value)} required />
          </div>
          <button type="submit" className="calculate-btn">💡 Calculate</button>
        </form>

        {result && (
          <div className="result">
            <h2>📊 Results</h2>
            <p><strong>Monthly Buying Cost:</strong> ₹{result.totalMonthlyBuyingCost.toFixed(2)}</p>
            <p><strong>Monthly Renting Cost:</strong> ₹{result.totalMonthlyRentCost.toFixed(2)}</p>
            <p><strong>Cost Difference:</strong> ₹{result.costDifference.toFixed(2)}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
