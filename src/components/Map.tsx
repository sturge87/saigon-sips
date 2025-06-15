'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons
const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Sample coffee shop data
const coffeeShops = [
  { id: 1, name: 'The Coffee House', position: [10.762622, 106.660172] },
  { id: 2, name: 'Highlands Coffee', position: [10.775658, 106.700423] },
  { id: 3, name: 'Cong Caphe', position: [10.776888, 106.700999] },
];

export default function Map() {
  return (
    <MapContainer
      center={[10.762622, 106.660172]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coffeeShops.map((shop) => (
        <Marker
          key={shop.id}
          position={shop.position as [number, number]}
          icon={icon}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{shop.name}</h3>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 