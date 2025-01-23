import React, { useState } from 'react';
import { Map, User, Settings, Phone, Search } from 'lucide-react';

const Dashboard = () => {
  const [searchRadius, setSearchRadius] = useState(3);
  const [nearbyUsers] = useState([
    { id: 1, name: 'John Doe', distance: '0.5 km' },
    { id: 2, name: 'Jane Smith', distance: '1.2 km' },
    { id: 3, name: 'Mike Johnson', distance: '2.1 km' },
    { id: 4, name: 'Sarah Williams', distance: '2.8 km' },
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <div>
              <h2 className="font-semibold">John Smith</h2>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          
          <nav className="space-y-4">
            <button className="flex items-center gap-3 w-full p-3 rounded hover:bg-gray-100">
              <Map size={20} />
              <span>Map View</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded hover:bg-gray-100">
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded hover:bg-gray-100">
              <Phone size={20} />
              <span>Contact</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Nearby Users List */}
        <div className="w-80 bg-white shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Nearby Users</h2>
          <div className="space-y-4">
            {nearbyUsers.map(user => (
              <div key={user.id} className="p-4 border rounded hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.distance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex-1 bg-gray-200 rounded-lg mb-6">
            <div className="h-full flex items-center justify-center text-gray-500">
              Map View
            </div>
          </div>

          {/* Search Controls */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Radius (km)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg pl-10"
                    min="0"
                    max="10"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;