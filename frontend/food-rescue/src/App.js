import React from "react";
import Maps from "./components/Maps/Maps";
import "./App.css"; // Create this file for custom styles

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1>Food Rescue Platform</h1>
        <div className="nav-buttons">
          <button className="nav-button">Home</button>
          <button className="nav-button">Donors</button>
          <button className="nav-button">Recipients</button>
          <button className="nav-button">Volunteers</button>
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
