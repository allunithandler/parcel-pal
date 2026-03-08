import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package, Clock, User, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NotificationPanel } from '@/components/NotificationPanel';
import { mockBooths } from '@/lib/mock-data';

const Booths = () => {
  const [search, setSearch] = useState('');
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);

  const filtered = mockBooths.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.city.toLowerCase().includes(search.toLowerCase()) ||
    b.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Take2Earn</span>
          </Link>
          <div className="flex items-center gap-2">
            <NotificationPanel />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Booth Directory</h1>
          <p className="text-muted-foreground">Find nearby booths for drop-off and pickup</p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, city, or state..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Visual */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  Booth Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* SVG India map with booth markers */}
                <div className="relative bg-muted/30 rounded-lg h-[500px] overflow-hidden">
                  <svg viewBox="0 0 500 600" className="w-full h-full">
                    {/* India outline simplified */}
                    <path
                      d="M200 50 L280 50 L320 80 L340 120 L350 180 L360 220 L380 260 L370 300 L350 340 L330 380 L310 420 L280 460 L260 500 L240 530 L220 540 L200 520 L180 480 L160 440 L140 400 L130 360 L120 320 L130 280 L140 240 L150 200 L160 160 L170 120 L180 80 Z"
                      fill="hsl(var(--muted))"
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
                    />
                    {/* Booth markers */}
                    {filtered.map(booth => {
                      // Map lat/lon to SVG coords (approximate)
                      const x = ((booth.lon - 72) / (89 - 72)) * 300 + 100;
                      const y = ((32 - booth.lat) / (32 - 8)) * 500 + 50;
                      const isSelected = selectedBooth === booth.id;
                      const capacityRatio = booth.current_parcels / booth.capacity;
                      return (
                        <g key={booth.id} onClick={() => setSelectedBooth(booth.id)} className="cursor-pointer">
                          <circle
                            cx={x} cy={y}
                            r={isSelected ? 14 : 10}
                            fill={capacityRatio > 0.7 ? 'hsl(var(--destructive))' : capacityRatio > 0.4 ? 'hsl(var(--secondary))' : 'hsl(var(--primary))'}
                            opacity={isSelected ? 1 : 0.8}
                            stroke="hsl(var(--background))"
                            strokeWidth="2"
                          />
                          <circle cx={x} cy={y} r={isSelected ? 18 : 0} fill="none"
                            stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
                          <text x={x} y={y + 4} textAnchor="middle" fontSize="8" fill="hsl(var(--primary-foreground))" fontWeight="bold">
                            {booth.current_parcels}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 flex gap-3 text-xs">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary" /> Low</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-secondary" /> Medium</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-destructive" /> High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booth List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map(booth => {
              const ratio = booth.current_parcels / booth.capacity;
              return (
                <Card
                  key={booth.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedBooth === booth.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedBooth(booth.id)}
                >
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
