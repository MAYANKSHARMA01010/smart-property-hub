'use client';

import React, { useEffect } from 'react';
import '../styles/globals.css';
import Homepage from '../components/homepage.jsx';
import { toast } from 'react-toastify';

export default function Page() {
  return (
    // useEffect(() => {
    //   toast.success('Welcome to SmartProperty Hub!');
    // }, []),

    <div className="Page">
      <Homepage />
    </div>
  );
}
