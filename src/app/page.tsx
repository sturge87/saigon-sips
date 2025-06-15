'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
  iconUrl: 'leaflet/dist/images/marker-icon.png',
  shadowUrl: 'leaflet/dist/images/marker-shadow.png',
});

interface CoffeeShop {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string | null;
  rating: number;
}

export default function Home() {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const { data, error } = await supabase.from('coffee_shops').select('*');
        if (error) {
          throw error;
        }
        setCoffeeShops(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeShops();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading coffee shops...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Saigon Sips Map</h1>
      <MapContainer center={[10.762622, 106.660172]} zoom={13} scrollWheelZoom={false} className="h-[600px] w-full max-w-4xl rounded-lg shadow-lg">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coffeeShops.map((shop) => (
          <Marker key={shop.id} position={[shop.latitude, shop.longitude]}>
            <Popup>
              <h2 className="font-bold">{shop.name}</h2>
              <p>{shop.address}</p>
              {shop.description && <p>{shop.description}</p>}
              <p>Rating: {shop.rating}/5</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
