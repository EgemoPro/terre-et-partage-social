
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';

interface MapLocation {
  lat: number;
  lng: number;
  address: string;
}

interface InteractiveMapProps {
  onLocationSelect: (location: MapLocation) => void;
  selectedLocation?: MapLocation;
}

const InteractiveMap = ({ onLocationSelect, selectedLocation }: InteractiveMapProps) => {
  const [searchAddress, setSearchAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const mockLocations = [
    { lat: 43.5263, lng: 5.4454, address: 'Aix-en-Provence, France' },
    { lat: 49.1829, lng: -0.3707, address: 'Caen, Normandie' },
    { lat: 45.7640, lng: 4.8357, address: 'Lyon, France' },
    { lat: 44.8378, lng: -0.5792, address: 'Bordeaux, France' }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulation d'une recherche
    setTimeout(() => {
      const mockResult = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      onLocationSelect({
        ...mockResult,
        address: searchAddress || mockResult.address
      });
      setIsSearching(false);
    }, 1000);
  };

  const handleMapClick = (location: MapLocation) => {
    onLocationSelect(location);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Localisation de votre terrain
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="flex space-x-2">
          <Input
            placeholder="Rechercher une adresse..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
            className="earth-gradient text-white"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Map Simulation */}
        <div className="relative bg-green-50 border-2 border-green-200 rounded-lg h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
            {/* Mock map with clickable locations */}
            {mockLocations.map((location, index) => (
              <div
                key={index}
                className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all ${
                  selectedLocation?.lat === location.lat && selectedLocation?.lng === location.lng
                    ? 'bg-red-500 ring-4 ring-red-200'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${30 + index * 15}%`
                }}
                onClick={() => handleMapClick(location)}
                title={location.address}
              />
            ))}
            
            {/* Map grid lines for realism */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute border-gray-400" style={{
                  left: `${i * 12.5}%`,
                  top: 0,
                  bottom: 0,
                  borderLeft: '1px solid'
                }} />
              ))}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute border-gray-400" style={{
                  top: `${i * 16.66}%`,
                  left: 0,
                  right: 0,
                  borderTop: '1px solid'
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Selected Location Display */}
        {selectedLocation && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center text-green-800">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="font-medium">Localisation sélectionnée :</span>
            </div>
            <p className="text-green-700 mt-1">{selectedLocation.address}</p>
            <p className="text-sm text-green-600">
              Coordonnées : {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
