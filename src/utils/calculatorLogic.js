'use client';

export default function calculateRentVsBuy({ rent, price, years, interest }) {
    const renting = rent * 12 * years;
    const buying = price + ((price * interest * years) / 100);
    const recommendation = buying < renting ? 'Buy' : 'Rent';
    return { renting, buying, recommendation };
}