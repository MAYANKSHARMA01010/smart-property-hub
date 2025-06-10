'use client';

import React, { useState } from 'react';
import '../styles/CalculatorForm.css';
import calculateRentVsBuy from '@/utility/calculatorLogic.js';
import CalculatorResult from './CalculatorResult.jsx';

export default function CalculatorForm({ isMini = false }) {
  const [rent, setRent] = useState('');
  const [price, setPrice] = useState('');
  const [years, setYears] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculation = calculateRentVsBuy({
      rent: parseFloat(rent),
      price: parseFloat(price),
      years: parseFloat(years),
      interest: parseFloat(interest),
    });
    setResult(calculation);
  };

  return (
    <div className={`calculator-form ${isMini ? 'mini' : 'full'}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Monthly Rent (₹)"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Property Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Loan Tenure (years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
        />
        <button type="submit">Calculate</button>
      </form>

      {result && <CalculatorResult result={result} />}
    </div>
  );
}
