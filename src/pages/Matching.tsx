import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, Star, Clock, IndianRupee, MapPin, CheckCircle, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NotificationPanel } from '@/components/NotificationPanel';
import { mockParcels, mockBooths, getBoothById } from '@/lib/mock-data';
import { matchCarriers, type MatchResult } from '@/lib/matching';
import { toast } from 'sonner';

const Matching = () => {
  const [selectedParcel, setSelectedParcel] = useState('');
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const pendingParcels = mockParcels.filter(p => p.status === 'at_pickup_booth' || p.status === 'created');

  const findMatches = () => {
    const parcel = mockParcels.find(p => p.id === selectedParcel);
    if (!parcel) return;
    setSearching(true);
    // Simulate async
    setTimeout(() => {
      setMatches(matchCarriers(parcel));
      setSearching(false);
    }, 800);
  };

  const assignCarrier = (match: MatchResult) => {
    toast.success(`Carrier ${match.offer.carrier_name} assigned! ETA: ${match.eta}`);
  };

  return (
    <div className="min-h-screen bg-background">
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Carrier Matching</h1>
        <p className="text-muted-foreground mb-8">Find the best carrier for your parcel based on route, timing, and rating</p>

        {/* Select parcel */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Select Parcel</h2>
            <div className="flex gap-3">
              <Select value={selectedParcel} onValueChange={setSelectedParcel}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Choose a parcel to match..." />
                </SelectTrigger>
                <SelectContent>
                  {pendingParcels.map(p => {
                    const pickup = getBoothById(p.pickup_booth_id);
                    const drop = getBoothById(p.drop_booth_id);
                    return (
                      <SelectItem key={p.id} value={p.id}>
                        {p.tracking_code} — {pickup?.city} → {drop?.city} ({p.weight})
                      </SelectItem>
                    );
                  })}
                  {/* Also allow matching in-transit for demo */}
                  {mockParcels.filter(p => p.status === 'in_transit').map(p => {
                    const pickup = getBoothById(p.pickup_booth_id);
                    const drop = getBoothById(p.drop_booth_id);
                    return (
                      <SelectItem key={p.id} value={p.id}>
                        {p.tracking_code} — {pickup?.city} → {drop?.city} ({p.weight})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button onClick={findMatches} disabled={!selectedParcel || searching} className="gap-2">
                <Search className="h-4 w-4" />
                {searching ? 'Searching...' : 'Find Carriers'}
              </Button>
            </div>

            {/* Selected parcel details */}
            {selectedParcel && (() => {
              const p = mockParcels.find(x => x.id === selectedParcel);
              if (!p) return null;
              const pickup = getBoothById(p.pickup_booth_id);
              const drop = getBoothById(p.drop_booth_id);
              return (
                <div className="mt-4 p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{pickup?.name}, {pickup?.city}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span>{drop?.name}, {drop?.city}</span>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Category: {p.category}</span>
                    <span>Weight: {p.weight}</span>
                    <span>Value: ₹{p.value}</span>
                    {p.insurance && <Badge variant="outline" className="text-[10px]">Insured</Badge>}
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        {/* Match results */}
        {matches.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              {matches.length} Carrier{matches.length > 1 ? 's' : ''} Found
            </h2>
            {matches.map((m, i) => (
              <Card key={m.offer.id} className={`transition-all hover:shadow-md ${i === 0 ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {i === 0 && <Badge className="bg-primary text-primary-foreground text-[10px]">Best Match</Badge>}
                        <h3 className="font-semibold">{m.offer.carrier_name}</h3>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {m.offer.origin_city} → {m.offer.destination_city}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          ETA: {m.eta}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <IndianRupee className="h-3 w-3" />
                          ₹{m.estimatedCost}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Star className="h-3 w-3 text-secondary" />
                          {m.offer.carrier_name === 'Rajesh Kumar' ? '4.8' : '4.7'}
                        </div>
                      </div>
                      {/* Score bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Match Score</span>
                          <span className="font-medium">{Math.round(m.score * 100)}%</span>
                        </div>
                        <Progress value={m.score * 100} className="h-1.5" />
                      </div>
                      <div className="flex gap-2 mt-2">
                        {m.offer.accepts_fragile && <Badge variant="outline" className="text-[10px]">Fragile OK</Badge>}
                        {m.offer.accepts_food && <Badge variant="outline" className="text-[10px]">Food OK</Badge>}
                        <Badge variant="outline" className="text-[10px]">Route overlap: {Math.round(m.routeOverlap * 100)}%</Badge>
                      </div>
                    </div>
                    <Button onClick={() => assignCarrier(m)} className="gap-1 shrink-0">
                      <CheckCircle className="h-4 w-4" /> Assign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {matches.length === 0 && selectedParcel && !searching && (
          <Card className="text-center p-8">
            <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Click "Find Carriers" to search for matching carriers</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Matching;
