'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';

// Fix for default marker icons in Next.js + Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LocationMapProps {
  position: { lat: number; lng: number } | null;
  onPositionChange: (pos: { lat: number; lng: number }) => void;
}

function MapClickHandler({ onPositionChange }: { onPositionChange: (pos: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      onPositionChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function MapUpdater({ position }: { position: { lat: number; lng: number } | null }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], map.getZoom());
    }
  }, [map, position]);

  return null;
}

export default function LocationMap({ position, onPositionChange }: LocationMapProps) {
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 23.8103, lng: 90.4125 }); // Default Dhaka

  useEffect(() => {
    // If no position is provided, try to get user's current location via browser Geolocation API
    if (!position) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setMapCenter(newPos);
            onPositionChange(newPos);
          },
          () => {
            console.warn('Geolocation failed or denied. Using default center Dhaka.');
            onPositionChange({ lat: 23.8103, lng: 90.4125 });
          }
        );
      } else {
        onPositionChange({ lat: 23.8103, lng: 90.4125 });
      }
    } else {
      setMapCenter(position);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <div className="relative z-0 h-[300px] w-full overflow-hidden rounded-md border">
      <MapContainer
        center={position ? [position.lat, position.lng] : [mapCenter.lat, mapCenter.lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Marker position={[position.lat, position.lng]} />}
        <MapClickHandler onPositionChange={onPositionChange} />
        <MapUpdater position={position} />
      </MapContainer>
    </div>
  );
}
