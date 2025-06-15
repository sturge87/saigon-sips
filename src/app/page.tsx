'use client';

import dynamic from 'next/dynamic';
import Search from '@/components/Search';
import { useState } from 'react';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-gray-100 flex items-center justify-center">Loading map...</div>
});

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Saigon Coffee Shops</h1>
        <Search onSearch={setSearchQuery} />
        <div className="h-[600px] w-full mt-4 rounded-lg overflow-hidden shadow-lg">
          <Map />
        </div>
      </div>
    </main>
  );
}
