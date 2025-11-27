import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, MapPin, Upload, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Send = () => {
  const [step, setStep] = useState(1);

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
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${
                      step > s ? 'bg-primary' : 'bg-muted'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              <span className={step >= 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}>Parcel Details</span>
              <span className={step >= 2 ? 'text-foreground font-medium' : 'text-muted-foreground'}>Route & Booth</span>
              <span className={step >= 3 ? 'text-foreground font-medium' : 'text-muted-foreground'}>Verification</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Send a Parcel
              </CardTitle>
              <CardDescription>
                Fill in the details below to create your shipment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sender-name">Your Name</Label>
                        <Input id="sender-name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sender-phone">Phone Number</Label>
                        <Input id="sender-phone" placeholder="+91 98765 43210" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="receiver-name">Receiver Name</Label>
                      <Input id="receiver-name" placeholder="Jane Smith" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="receiver-phone">Receiver Phone</Label>
                      <Input id="receiver-phone" placeholder="+91 87654 32109" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Parcel Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="documents">Documents</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="food">Food & Perishables</SelectItem>
                          <SelectItem value="medicine">Medicine</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight Range</Label>
                        <Select>
                          <SelectTrigger id="weight">
                            <SelectValue placeholder="Select weight" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<1kg">Less than 1 kg</SelectItem>
                            <SelectItem value="1-5kg">1 - 5 kg</SelectItem>
                            <SelectItem value="5-20kg">5 - 20 kg</SelectItem>
                            <SelectItem value=">20kg">More than 20 kg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="value">Declared Value (₹)</Label>
                        <Input id="value" type="number" placeholder="5000" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea id="description" placeholder="Brief description of contents..." rows={3} />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setStep(2)} size="lg">
                      Continue to Route
                    </Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup-booth">Pickup Booth</Label>
                      <Select>
                        <SelectTrigger id="pickup-booth">
                          <SelectValue placeholder="Select pickup location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booth1">Connaught Place Hub - New Delhi</SelectItem>
                          <SelectItem value="booth2">Indiranagar Station - Bangalore</SelectItem>
                          <SelectItem value="booth3">Bandra West Booth - Mumbai</SelectItem>
                          <SelectItem value="booth4">Park Street Center - Kolkata</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        2.3 km away • Open 8 AM - 10 PM
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="drop-booth">Drop Booth (Destination)</Label>
                      <Select>
                        <SelectTrigger id="drop-booth">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booth5">MG Road Hub - Bangalore</SelectItem>
                          <SelectItem value="booth6">Juhu Beach Booth - Mumbai</SelectItem>
                          <SelectItem value="booth7">Salt Lake Booth - Kolkata</SelectItem>
                          <SelectItem value="booth8">Nehru Place Center - Delhi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickup-time">Preferred Pickup Time</Label>
                      <Select>
                        <SelectTrigger id="pickup-time">
                          <SelectValue placeholder="When do you want to drop?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP (Within 2 hours)</SelectItem>
                          <SelectItem value="today">Today (Evening)</SelectItem>
                          <SelectItem value="tomorrow">Tomorrow</SelectItem>
                          <SelectItem value="schedule">Schedule for later</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Card className="bg-primary-light border-primary/20">
                      <CardContent className="p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium mb-1">Booth Drop-off Required</p>
                          <p className="text-muted-foreground">You'll need to visit the pickup booth with your parcel and a government ID for verification.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-between">
                    <Button onClick={() => setStep(1)} variant="outline">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} size="lg">
                      Continue to Verification
                    </Button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Upload Parcel Photo</Label>
                      <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="font-medium mb-1">Click to upload photo</p>
                        <p className="text-sm text-muted-foreground">Take a clear photo of your sealed parcel</p>
                      </div>
                    </div>

                    <Card className="bg-muted">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="font-semibold">Payment Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Base Delivery Fee</span>
                            <span className="font-medium">₹150</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Platform Fee</span>
                            <span className="font-medium">₹20</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Insurance (Optional)</span>
                            <span className="font-medium">₹30</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between text-base">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-primary">₹200</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upi">UPI / Wallet</SelectItem>
                          <SelectItem value="card">Credit / Debit Card</SelectItem>
                          <SelectItem value="cod">Pay on Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Card className="bg-success/10 border-success/20">
                      <CardContent className="p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium mb-1">KYC Verification</p>
                          <p className="text-muted-foreground">For first-time senders or high-value parcels, KYC verification at the booth may be required.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-between">
                    <Button onClick={() => setStep(2)} variant="outline">
                      Back
                    </Button>
                    <Button size="lg" className="gap-2">
                      <Package className="w-4 h-4" />
                      Create Shipment
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Send;
