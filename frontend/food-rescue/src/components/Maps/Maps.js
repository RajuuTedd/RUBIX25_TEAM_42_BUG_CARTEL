import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Maps = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // Fetch donors from the backend
    axios
      .get("/api/donors")
      .then((response) => setDonors(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <MapContainer
      center={[37.7749, -122.4194]} // Example center (San Francisco)
      zoom={10}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {donors.map((donor) => (
        <Marker key={donor._id} position={[donor.latitude, donor.longitude]}>
          <Popup>
            {donor.organizationName} <br /> {donor.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Maps;
