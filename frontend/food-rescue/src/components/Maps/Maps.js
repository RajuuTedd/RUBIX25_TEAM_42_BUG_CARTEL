import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Marker Icons
const customIcon1 = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png", // Red marker
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const customIcon2 = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png", // Green marker
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const Maps = () => {
  // Coordinates for two locations in Mumbai
  const marker1 = [19.076, 72.8777]; // Mumbai Central
  const marker2 = [18.975, 72.8258]; // Colaba, Mumbai

  // Calculate the bounding box that includes all markers
  const bounds = L.latLngBounds([marker1, marker2]);

  return (
    <MapContainer
      bounds={bounds} // Set the bounds to include all markers
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker 1 in Mumbai */}
      <Marker position={marker1} icon={customIcon1}>
        <Tooltip>Donor</Tooltip> {/* Tooltip for Donor */}
        <Popup>
          Marker 1: Mumbai Central <br /> A busy area in Mumbai.
        </Popup>
      </Marker>

      {/* Marker 2 in Mumbai */}
      <Marker position={marker2} icon={customIcon2}>
        <Tooltip>Recipient</Tooltip> {/* Tooltip for Recipient */}
        <Popup>
          Marker 2: Colaba <br /> A popular tourist spot in Mumbai.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Maps;
