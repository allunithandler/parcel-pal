import { useState, useEffect } from 'react';
import { MapPin, Clock, User, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/Navbar';
import { mockBooths } from '@/lib/mock-data';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const getMarkerIcon = (ratio: number) => {
  const color = ratio > 0.7 ? '#ef4444' : ratio > 0.4 ? '#f59e0b' : '#22c55e';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background:${color};width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:bold;"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

function FlyTo({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => { map.flyTo([lat, lon], 12, { duration: 1 }); }, [lat, lon, map]);
  return null;
}

const Booths = () => {
  const [search, setSearch] = useState('');
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);

  const filtered = mockBooths.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.city.toLowerCase().includes(search.toLowerCase()) ||
    b.state.toLowerCase().includes(search.toLowerCase())
  );

  const selected = mockBooths.find(b => b.id === selectedBooth);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Booth Directory</h1>
          <p className="text-muted-foreground">Find nearby booths for drop-off and pickup</p>
        </div>

        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, city, or state..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  Booth Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px]">
                  <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full rounded-b-lg" scrollWheelZoom>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filtered.map(booth => {
                      const ratio = booth.current_parcels / booth.capacity;
                      return (
                        <Marker key={booth.id} position={[booth.lat, booth.lon]} icon={getMarkerIcon(ratio)}
                          eventHandlers={{ click: () => setSelectedBooth(booth.id) }}>
                          <Popup>
                            <div className="text-sm font-semibold">{booth.name}</div>
                            <div className="text-xs">{booth.city}, {booth.state}</div>
                            <div className="text-xs mt-1">{booth.current_parcels}/{booth.capacity} parcels</div>
                          </Popup>
                        </Marker>
                      );
                    })}
                    {selected && <FlyTo lat={selected.lat} lon={selected.lon} />}
                  </MapContainer>
                </div>
                <div className="px-4 py-2 flex gap-3 text-xs border-t">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500" /> Available</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500" /> Moderate</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500" /> Busy</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map(booth => {
              const ratio = booth.current_parcels / booth.capacity;
              return (
                <Card key={booth.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedBooth === booth.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedBooth(booth.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm">{booth.name}</h3>
                      <Badge variant={ratio > 0.7 ? 'destructive' : ratio > 0.4 ? 'secondary' : 'default'} className="text-[10px]">
                        {ratio > 0.7 ? 'Busy' : ratio > 0.4 ? 'Moderate' : 'Available'}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{booth.address}, {booth.city}</div>
                      <div className="flex items-center gap-1"><Clock className="h-3 w-3" />{booth.opening_hours}</div>
                      <div className="flex items-center gap-1"><User className="h-3 w-3" />Admin: {booth.admin_name}</div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Capacity</span>
                        <span>{booth.current_parcels}/{booth.capacity}</span>
                      </div>
                      <Progress value={ratio * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booths;
