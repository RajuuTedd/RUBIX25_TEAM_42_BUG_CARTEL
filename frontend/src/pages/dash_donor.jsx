import React from 'react';

const Dash_donor = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <div className="flex items-center mb-8 border-b pb-4">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl">R</div>
          <div className="ml-4">
            <h2 className="text-lg font-bold">Restaurant Name</h2>
            <p className="text-sm text-gray-600">Food Management</p>
          </div>
        </div>
        <nav>
          <div className="flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer">
            <span>📦</span>
            <span className="ml-2">Inventory</span>
          </div>
          <div className="flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer">
            <span>📊</span>
            <span className="ml-2">Analytics</span>
          </div>
          <div className="flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer">
            <span>⚠️</span>
            <span className="ml-2">Alerts</span>
          </div>
          <div className="flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer">
            <span>⚙️</span>
            <span className="ml-2">Settings</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex p-6 gap-6">
        {/* Upload Form */}
        <div className="w-96 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add Food Item</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
              <input type="text" placeholder="Enter food name" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input type="number" placeholder="Enter quantity" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <select className="w-full p-2 border border-gray-300 rounded ">
                <option>kg</option>
                <option>liters</option>
                <option>pieces</option>
                <option>boxes</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
              <input type="date" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea placeholder="Add any additional notes" className="w-full p-2 border border-gray-300 rounded h-24"></textarea>
            </div>
            <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">Add Item</button>
          </form>
        </div>

        {/* Food Items List */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Food Inventory</h2>
            <select className="p-2 border border-gray-300 rounded">
              <option>All Items</option>
              <option>Expiring Soon</option>
              <option>High Urgency</option>
              <option>Low Stock</option>
            </select>
          </div>

          {/* Sample Food Items */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded">
              <div>
                <div className="font-semibold">Fresh Tomatoes</div>
                <div className="text-sm text-gray-500">Quantity: 50 kg | Expires: 2025-01-25</div>
              </div>
              <span className="bg-red-100 text-red-600 py-1 px-2 rounded text-xs">High Urgency</span>
            </div>

            <div className="flex justify-between items-center p-4 border border-gray-200 rounded">
              <div>
                <div className="font-semibold">Chicken Breast</div>
                <div className="text-sm text-gray-500">Quantity: 30 kg | Expires: 2025-01-28</div>
              </div>
              <span className="bg-yellow-100 text-yellow-600 py-1 px-2 rounded text-xs">Medium Urgency</span>
            </div>

            <div className="flex justify-between items-center p-4 border border-gray-200 rounded">
              <div>
                <div className="font-semibold">Rice</div>
                <div className="text-sm text-gray-500">Quantity: 100 kg | Expires: 2025-06-22</div>
              </div>
              <span className="bg-green-100 text-green-600 py-1 px-2 rounded text-xs">Low Urgency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash_donor;