import React, { useEffect, useState } from 'react';

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donations from the backend
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:5000/donations'); // Update the URL if necessary
        if (!response.ok) {
          throw new Error('Failed to fetch donations');
        }
        const data = await response.json();
        setDonations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return <p>Loading donations...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Donation List</h1>
        {donations.length === 0 ? (
          <p>No donations found.</p>
        ) : (
          <ul className="space-y-4">
            {donations.map((donation) => (
              <li
                key={donation._id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
              >
                <h2 className="text-lg font-semibold">{donation.name}</h2>
                <p className="text-gray-700">
                  <strong>Food Type:</strong> {donation.foodType}
                </p>
                <p className="text-gray-700">
                  <strong>Quantity:</strong> {donation.quantity}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {donation.address}
                </p>
                <p className="text-gray-700">
                  <strong>Contact:</strong> {donation.contact}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DonationList;
