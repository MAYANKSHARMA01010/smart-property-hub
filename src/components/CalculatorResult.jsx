'use client';

import React from 'react';
import '../styles/CalculatorResult.css';

export default function CalculatorResult({ result }) {
  return (
    <div className="calculator-result">
      <h3>Result:</h3>
      <p className='restCost'>Total Renting Cost: ₹{result.renting.toLocaleString()}</p>
      <p className='buyCost'>Total Buying Cost: ₹{result.buying.toLocaleString()}</p>
      <p className='buyOrNot'><strong>You should: {result.recommendation}</strong></p>
    </div>
  );
}