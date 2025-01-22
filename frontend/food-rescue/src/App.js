import React from "react";
import Maps from "./components/Maps/Maps";
import "./App.css"; // Create this file for custom styles

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-title">Food Rescue Platform</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search location..."
              className="search-bar"
            />
            <button className="search-button">Search</button>
          </div>
          <div className="nav-buttons">
            <button className="nav-button">Home</button>
            <button className="nav-button">Donors</button>
            <button className="nav-button">Recipients</button>
            <button className="nav-button">Volunteers</button>
          </div>
        </div>
      </nav>

      {/* Full-Page Map */}
      <div className="map-container">
        <Maps />
      </div>
    </div>
  );
}

export default App;
