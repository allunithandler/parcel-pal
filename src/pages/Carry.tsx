import { Link } from "react-router-dom";
import { Plane, MapPin, Calendar, Briefcase, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { mockRouteOffers } from "@/lib/mock-data";

const Carry = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Earn ₹200-500 per trip</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Earn by Carrying Parcels</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Already traveling? Make your journey profitable by carrying verified parcels along your route.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Offer Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-secondary" />
                  Create Route Offer
                </CardTitle>
                <CardDescription>
                  Tell us about your journey and we'll match you with parcels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin City / Booth</Label>
                  <Select>
                    <SelectTrigger id="origin">
                      <SelectValue placeholder="Where are you starting from?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi">New Delhi</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="kolkata">Kolkata</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination City / Booth</Label>
                  <Select>
                    <SelectTrigger id="destination">
                      <SelectValue placeholder="Where are you going?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="kolkata">Kolkata</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departure">Departure Date</Label>
                    <Input id="departure" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrival">Arrival Date</Label>
                    <Input id="arrival" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Carrying Capacity (kg)</Label>
                  <Select>
                    <SelectTrigger id="capacity">
                      <SelectValue placeholder="How much can you carry?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 kg</SelectItem>
                      <SelectItem value="5-10">5-10 kg</SelectItem>
                      <SelectItem value="10-20">10-20 kg</SelectItem>
                      <SelectItem value="20+">20+ kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Your Price per kg (₹)</Label>
                  <Input id="price" type="number" placeholder="e.g., 30" />
                  <p className="text-xs text-muted-foreground">Platform suggested: ₹25-40/kg</p>
                </div>

                <div className="space-y-2">
                  <Label>Parcel Types You Accept</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Documents & Light Items</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Electronics</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Fragile Items (requires extra care)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Food & Perishables</span>
                    </label>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Plane className="w-4 h-4 mr-2" />
                  Create Offer & Find Parcels
                </Button>
              </CardContent>
            </Card>

            {/* Info & Benefits */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-secondary" />
                    Why Carry with Take2Earn?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Earn Extra Income</h4>
                      <p className="text-sm text-muted-foreground">Make ₹200-500 per trip on routes you're already taking</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Flexible Schedule</h4>
                      <p className="text-sm text-muted-foreground">Choose when and where you want to carry parcels</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Verified & Safe</h4>
                      <p className="text-sm text-muted-foreground">All parcels verified at booths, photo proof required at every step</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How Carrying Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Create Route Offer</h4>
                      <p className="text-sm text-muted-foreground">Tell us your origin, destination, and capacity</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Get Matched with Parcels</h4>
                      <p className="text-sm text-muted-foreground">We'll show you parcels along your route that match your capacity</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Pick Up at Origin Booth</h4>
                      <p className="text-sm text-muted-foreground">Visit booth, verify parcel, take photo, and start journey</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Drop & Get Paid</h4>
                      <p className="text-sm text-muted-foreground">Drop at destination booth, take photo, receiver confirms, you get paid!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary-light border-primary/20">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <strong>KYC Required:</strong> To become a verified carrier, you'll need to complete KYC verification with government ID at a booth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Available Parcels Section */}
          <Card>
            <CardHeader>
              <CardTitle>Available Route Offers</CardTitle>
              <CardDescription>Active carriers looking for parcels to carry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRouteOffers.filter(offer => offer.status === 'active').map((offer) => (
                <Card key={offer.id} className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                            {offer.carrier_name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold">{offer.carrier_name}</p>
                            <p className="text-sm text-muted-foreground">Verified Carrier</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Route</p>
                            <p className="font-medium text-sm">{offer.origin_city} → {offer.destination_city}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Travel Dates</p>
                            <p className="font-medium text-sm">{new Date(offer.departure_date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Capacity</p>
                            <p className="font-medium text-sm">{offer.capacity_kg} kg</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Price</p>
                            <p className="font-medium text-sm">₹{offer.price_per_kg}/kg</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {offer.accepts_fragile && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Fragile OK</span>
                      )}
                      {offer.accepts_food && (
                        <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">Food OK</span>
                      )}
                    </div>
                    <Button className="w-full mt-3" variant="outline">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Carry;
