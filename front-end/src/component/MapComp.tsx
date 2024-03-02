import { useEffect, useRef } from "react";
import L, { Map } from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Location } from "../types/Location";
import "../App.css";

interface PropTypes {
	locations: Location[];
}

const MapComp = ({ locations }: PropTypes) => {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const mapInstance = useRef<Map | null>(null);

	useEffect(() => {
		try {
			// Configure Leaflet to use the default marker icon
			const DefaultIcon = L.icon({
				iconUrl: icon,
				shadowUrl: iconShadow,
			});
			L.Marker.prototype.options.icon = DefaultIcon;

			// Only create a Leaflet map instance if it doesn't already exist
			if (!mapInstance.current && mapRef.current) {
				mapInstance.current = L.map(mapRef.current).setView(
					[51.505, -0.09],
					10
				);

				// Add a tile layer to the map
				L.tileLayer(
					"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
					{
						attribution: "© OpenStreetMap contributors",
					}
				).addTo(mapInstance.current);
			}

			// Add markers based on locations
			if (locations && locations.length > 0) {
				const bounds = L.latLngBounds(
					locations.map((location) =>
						L.latLng(location.lat, location.lng)
					)
				);

				// Fit map to the bounds of all markers
				if (mapInstance.current) {
					locations.forEach((location) => {
						L.marker([location.lat, location.lng]).addTo(
							mapInstance.current as Map
						);
					});
					mapInstance.current.fitBounds(bounds);
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				alert("Error: " + error.message);
				console.error(error);
			}
		}
	}, [locations]);

	return (
		<div className="map-container">
			<div id="map" ref={mapRef}></div>
		</div>
	);
};

export default MapComp;
