import React, { useEffect, useRef, useCallback } from "react";

const GoogleMap = ({ markers, onGeocodeAddress, onShowDirections }) => {
  const mapRef = useRef(null); // Reference to the map container
  const mapInstance = useRef(null); // Reference to the map instance
  const markersRef = useRef(markers); // Store markers in a ref to avoid re-renders

  // Initialize Places search box
  const initSearch = useCallback((map) => {
    const input = document.querySelector(".search-bar");
    const searchBox = new window.google.maps.places.SearchBox(input);

    // Bias the search box to the map's current bounds
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    // Listen for when a place is selected
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Add new markers for the searched location
      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) return;

        const marker = new window.google.maps.Marker({
          map,
          position: place.geometry.location,
          title: place.name,
        });
        markersRef.current.push(marker);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      // Adjust the map bounds to fit the new markers
      map.fitBounds(bounds);
    });
  }, []);

  // Add markers to the map
  useEffect(() => {
    if (window.google) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 19.076, lng: 72.8777 }, // Default center (Mumbai)
        zoom: 12, // Default zoom level
      });

      // Initialize the search box
      initSearch(mapInstance.current);

      // Add existing markers
      markersRef.current = markers.map((marker) => {
        return new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: mapInstance.current,
          title: marker.title,
        });
      });
    }
  }, [markers, initSearch]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
};

export default GoogleMap;
