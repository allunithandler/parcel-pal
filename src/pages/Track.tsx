import { Link } from "react-router-dom";
import { Package, MapPin, ArrowLeft, Search, Clock, CheckCircle2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Track = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Take2Earn</span>
          </div>
          <div className="w-20"></div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Track Your Parcel</h1>
            <p className="text-muted-foreground">Enter your tracking ID to see real-time updates</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter Tracking ID (e.g., T2E123456)" 
                  className="flex-1 text-lg"
                />
                <Button size="lg">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Demo Tracking Result */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tracking ID: T2E987654</CardTitle>
                  <CardDescription>Electronics • 2.5 kg</CardDescription>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  In Transit
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Route Summary */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">From</p>
                  <p className="font-semibold">Connaught Place, Delhi</p>
                </div>
                <div className="flex-shrink-0 px-4">
                  <div className="w-12 h-0.5 bg-primary"></div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">To</p>
                  <p className="font-semibold">MG Road, Bangalore</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="font-semibold">Delivery Timeline</h3>
                
                <div className="relative pl-8 pb-6">
                  <div className="absolute left-2.5 top-3 bottom-0 w-0.5 bg-border"></div>
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-success flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-success-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Parcel Created</p>
                    <p className="text-sm text-muted-foreground">Dec 20, 2024 at 10:30 AM</p>
                    <p className="text-sm mt-1">Shipment created by sender</p>
                  </div>
                </div>

                <div className="relative pl-8 pb-6">
                  <div className="absolute left-2.5 top-3 bottom-0 w-0.5 bg-border"></div>
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-success flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-success-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Dropped at Origin Booth</p>
                    <p className="text-sm text-muted-foreground">Dec 20, 2024 at 2:15 PM</p>
                    <p className="text-sm mt-1">Verified and accepted at Connaught Place Hub</p>
                  </div>
                </div>

                <div className="relative pl-8 pb-6">
                  <div className="absolute left-2.5 top-3 bottom-0 w-0.5 bg-border"></div>
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Truck className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Picked Up by Carrier</p>
                    <p className="text-sm text-muted-foreground">Dec 20, 2024 at 4:45 PM</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Rajesh Kumar</span> (4.8★) picked up the parcel
                    </p>
                  </div>
                </div>

                <div className="relative pl-8 pb-6">
                  <div className="absolute left-2.5 top-3 bottom-0 w-0.5 bg-border"></div>
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">Arrival at Destination</p>
                    <p className="text-sm text-muted-foreground">Expected: Dec 21, 2024 at 10:00 AM</p>
                    <p className="text-sm mt-1 text-muted-foreground">MG Road Hub, Bangalore</p>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-muted-foreground">Ready for Pickup</p>
                    <p className="text-sm text-muted-foreground">Receiver will be notified</p>
                  </div>
                </div>
              </div>

              {/* Carrier Info */}
              <Card className="bg-muted">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Carrier Information</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      RK
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Rajesh Kumar</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="text-secondary">★ 4.8</span> • 127 deliveries
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Contact</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Photos */}
              <div>
                <h4 className="font-semibold mb-3">Verification Photos</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Package className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Pickup Photo</p>
                    </div>
                  </div>
                  <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
                    <div className="text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drop Photo (Pending)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Track;
