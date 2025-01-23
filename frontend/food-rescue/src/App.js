import React, { useState } from "react";
import GoogleMap from "./components/Maps/GoogleMap";
import "./App.css";

function App() {
  const [markers, setMarkers] = useState([
    { lat: 19.076, lng: 72.8777, title: "Mumbai Central" },
    { lat: 18.975, lng: 72.8258, title: "Colaba" },
  ]);

  // Geocoding function
  const geocodeAddress = async (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() }); // Return coordinates
        } else {
          reject("Geocoding failed: " + status);
        }
      });
    });
  };

  // Directions function
  const showDirections = (start, end) => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(window.mapInstance); // Use the global map instance

    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response); // Display the route
        } else {
          console.error("Directions request failed: " + status);
        }
      }
    );
  };

  // Handle search submission
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const address = event.target.elements.search.value; // Get search input

    try {
      const coordinates = await geocodeAddress(address);
      console.log("Coordinates:", coordinates);

      // Add a new marker for the searched location
      setMarkers([
        ...markers,
        { lat: coordinates.lat, lng: coordinates.lng, title: address },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle showing directions
  const handleShowDirections = () => {
    const start = { lat: 19.076, lng: 72.8777 }; // Example: Mumbai Central
    const end = { lat: 18.975, lng: 72.8258 }; // Example: Colaba
    showDirections(start, end);
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-title">Food Rescue Platform</h1>
          <div className="search-container">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search location..."
                className="search-bar"
                name="search"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>
          <div className="nav-buttons">
            <button className="nav-button">Home</button>
            <button className="nav-button">Donors</button>
            <button className="nav-button">Recipients</button>
            <button className="nav-button">Volunteers</button>
            <button onClick={handleShowDirections} className="nav-button">
              Show Directions
            </button>
          </div>
        </div>
      </nav>

      {/* Google Map */}
      <div className="map-container">
        <GoogleMap markers={markers} />
      </div>
    </div>
  );
}

export default App;
