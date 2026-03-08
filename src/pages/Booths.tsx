import { useState, useEffect, useMemo } from 'react';
import { MapPin, Clock, User, Search, Navigation, Package, Phone, Filter, BarChart3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/Navbar';
import { mockBooths, type Booth } from '@/lib/mock-data';
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

const getMarkerIcon = (ratio: number, isSelected: boolean) => {
  const color = ratio > 0.7 ? '#ef4444' : ratio > 0.4 ? '#f59e0b' : '#22c55e';
  const size = isSelected ? 36 : 28;
  const border = isSelected ? '4px solid hsl(180, 65%, 45%)' : '3px solid white';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background:${color};width:${size}px;height:${size}px;border-radius:50%;border:${border};box-shadow:0 2px 12px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;color:white;font-size:${isSelected ? 13 : 11}px;font-weight:bold;transition:all 0.2s;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

function FlyTo({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => { map.flyTo([lat, lon], 13, { duration: 1.2 }); }, [lat, lon, map]);
  return null;
}

type StatusFilter = 'all' | 'available' | 'moderate' | 'busy';

const getBoothStatus = (booth: Booth): StatusFilter => {
  const ratio = booth.current_parcels / booth.capacity;
  if (ratio > 0.7) return 'busy';
  if (ratio > 0.4) return 'moderate';
  return 'available';
};

const Booths = () => {
  const [search, setSearch] = useState('');
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filtered = useMemo(() =>
    mockBooths.filter(b => {
      const matchesSearch =
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.city.toLowerCase().includes(search.toLowerCase()) ||
        b.state.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || getBoothStatus(b) === statusFilter;
      return matchesSearch && matchesStatus;
    }),
    [search, statusFilter]
  );

  const selected = mockBooths.find(b => b.id === selectedBooth);

  const stats = useMemo(() => {
    const total = mockBooths.length;
    const totalParcels = mockBooths.reduce((s, b) => s + b.current_parcels, 0);
    const totalCapacity = mockBooths.reduce((s, b) => s + b.capacity, 0);
    const available = mockBooths.filter(b => getBoothStatus(b) === 'available').length;
    const busy = mockBooths.filter(b => getBoothStatus(b) === 'busy').length;
    return { total, totalParcels, totalCapacity, available, busy };
  }, []);

  const uniqueStates = useMemo(() => [...new Set(mockBooths.map(b => b.state))], []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Booth Network</h1>
          <p className="text-muted-foreground">
            {stats.total} booths across {uniqueStates.length} states · {stats.totalParcels} parcels in network
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Booths</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalParcels}</p>
                <p className="text-xs text-muted-foreground">Active Parcels</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.available}</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.busy}</p>
                <p className="text-xs text-muted-foreground">Near Capacity</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search + Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, city, or state..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              <Filter className="h-3.5 w-3.5 mr-1" /> All
            </Button>
            <Button
              variant={statusFilter === 'available' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('available')}
              className={statusFilter === 'available' ? '' : 'text-green-600 border-green-200 hover:bg-green-50'}
            >
              Available
            </Button>
            <Button
              variant={statusFilter === 'moderate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('moderate')}
              className={statusFilter === 'moderate' ? '' : 'text-amber-600 border-amber-200 hover:bg-amber-50'}
            >
              Moderate
            </Button>
            <Button
              variant={statusFilter === 'busy' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('busy')}
              className={statusFilter === 'busy' ? '' : 'text-destructive border-destructive/30 hover:bg-destructive/5'}
            >
              Busy
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[520px]">
                  <MapContainer
                    center={[22.5, 80]}
                    zoom={5}
                    className="h-full w-full"
                    scrollWheelZoom
                    zoomControl={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filtered.map(booth => {
                      const ratio = booth.current_parcels / booth.capacity;
                      const isSelected = selectedBooth === booth.id;
                      return (
                        <Marker
                          key={booth.id}
                          position={[booth.lat, booth.lon]}
                          icon={getMarkerIcon(ratio, isSelected)}
                          eventHandlers={{ click: () => setSelectedBooth(booth.id) }}
                        >
                          <Popup>
                            <div className="min-w-[180px]">
                              <p className="font-bold text-sm mb-1">{booth.name}</p>
                              <p className="text-xs text-gray-500 mb-2">{booth.address}, {booth.city}</p>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Capacity</span>
                                <span className="font-semibold">{booth.current_parcels}/{booth.capacity}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="h-1.5 rounded-full"
                                  style={{
                                    width: `${ratio * 100}%`,
                                    backgroundColor: ratio > 0.7 ? '#ef4444' : ratio > 0.4 ? '#f59e0b' : '#22c55e',
                                  }}
                                />
                              </div>
                              <p className="text-xs mt-2">🕐 {booth.opening_hours}</p>
                            </div>
                          </Popup>
                        </Marker>
                      );
                    })}
                    {selected && <FlyTo lat={selected.lat} lon={selected.lon} />}
                  </MapContainer>
                </div>
                <div className="px-4 py-2.5 flex items-center justify-between border-t bg-muted/30">
                  <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500" /> Available</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" /> Moderate</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500" /> Busy</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{filtered.length} booths shown</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booth List + Detail Panel */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {/* Selected Booth Detail */}
            {selected && (
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-base">{selected.name}</h3>
                      <p className="text-xs text-muted-foreground">{selected.city}, {selected.state}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelectedBooth(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{selected.address}, {selected.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>{selected.opening_hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4 shrink-0" />
                      <span>{selected.admin_name}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">Storage Capacity</span>
                      <span className="font-bold">{selected.current_parcels}/{selected.capacity}</span>
                    </div>
                    <Progress value={(selected.current_parcels / selected.capacity) * 100} className="h-2.5" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {selected.capacity - selected.current_parcels} slots available
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Package className="h-3.5 w-3.5 mr-1" /> Drop Parcel
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Navigation className="h-3.5 w-3.5 mr-1" /> Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Booth Cards */}
            {filtered.map(booth => {
              const ratio = booth.current_parcels / booth.capacity;
              const status = getBoothStatus(booth);
              return (
                <Card
                  key={booth.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBooth === booth.id ? 'ring-2 ring-primary shadow-md' : ''
                  }`}
                  onClick={() => setSelectedBooth(booth.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{booth.name}</h3>
                        <p className="text-xs text-muted-foreground">{booth.city}, {booth.state}</p>
                      </div>
                      <Badge
                        variant={status === 'busy' ? 'destructive' : status === 'moderate' ? 'secondary' : 'default'}
                        className="text-[10px] shrink-0 ml-2"
                      >
                        {status === 'busy' ? 'Busy' : status === 'moderate' ? 'Moderate' : 'Available'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Clock className="h-3 w-3" />{booth.opening_hours}
                    </div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{booth.current_parcels}/{booth.capacity} parcels</span>
                      <span>{Math.round(ratio * 100)}%</span>
                    </div>
                    <Progress value={ratio * 100} className="h-1.5" />
                  </CardContent>
                </Card>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <MapPin className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No booths found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booths;