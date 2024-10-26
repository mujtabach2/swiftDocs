"use client"

import React, { useState } from 'react';
import InputForm from '../components/InputForm'; // Ensure the correct path 
import SankeyChart from './analytics'; // Ensure the correct path
import Sidebar from '../components/Sidebar';

const AnalyticsPage = () => {
  // Initialize state with default values
  const [formData, setFormData] = useState({
    jobsApplied: 0,
    rejected: 0,
    interviews: 0,
    hired: 0,
    offers: 0,
    rejectedOffers: 0, 
  });

  // Handle form submission and update state
  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Job Application Analytics</h1>
        
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mb-8">
          <InputForm onSubmit={handleFormSubmit} />
        </div>

        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
          <SankeyChart data={formData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
