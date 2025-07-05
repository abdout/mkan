"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountries";
import { Icon } from "leaflet";

interface MapProps {
  locationValue: string;
}

const customIcon = new Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function Map({ locationValue }: MapProps) {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng || [51.505, -0.09]; // Default to London

  return (
    <MapContainer
      center={coordinates as [number, number]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates as [number, number]} icon={customIcon} />
    </MapContainer>
  );
}
