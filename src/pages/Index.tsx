import { Link } from "react-router-dom";
import { Package, Plane, MapPin, Shield, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Take2Earn</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/track">
              <Button variant="ghost">Track</Button>
            </Link>
            <Button variant="outline">Sign In</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">KYC Verified • Secure • Trusted</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Send Parcels. Earn Money. <br />Travel Smart.
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              India's first peer-to-peer parcel delivery marketplace. Send packages via travelers and earn by carrying parcels on your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Link to="/send">
                <Button size="lg" variant="hero" className="text-lg px-8 py-6 h-auto">
                  <Package className="w-5 h-5 mr-2" />
                  Send Parcel
                </Button>
              </Link>
              <Link to="/carry">
                <Button size="lg" variant="secondary-hero" className="text-lg px-8 py-6 h-auto">
                  <Plane className="w-5 h-5 mr-2" />
                  Earn by Carrying
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Active Users", value: "10K+", icon: Star },
              { label: "Parcels Delivered", value: "50K+", icon: Package },
              { label: "Booth Locations", value: "500+", icon: MapPin },
              { label: "Avg. Earnings", value: "₹500/trip", icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className="text-center animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: `${400 + i * 100}ms` }}>
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Simple, secure, and smart delivery in 3 steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Sender Drops Parcel",
                description: "Visit nearest booth, verify identity, upload photo, and leave your parcel with our trusted booth admin.",
                icon: Package,
                color: "bg-primary",
              },
              {
                step: "2",
                title: "Traveler Picks Up",
                description: "Verified carriers traveling your route pick up parcels, earn money, and deliver with photo proof at every step.",
                icon: Plane,
                color: "bg-secondary",
              },
              {
                step: "3",
                title: "Receiver Collects",
                description: "Receiver gets notified, verifies with OTP at destination booth, and picks up the parcel securely.",
                icon: Shield,
                color: "bg-success",
              },
            ].map((item, i) => (
              <Card key={i} className="relative overflow-hidden transition-all hover:shadow-lg group">
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`}></div>
                <CardContent className="p-6 relative">
                  <div className={`w-12 h-12 rounded-xl ${item.color} text-primary-foreground flex items-center justify-center mb-4 text-xl font-bold`}>
                    {item.step}
                  </div>
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-light to-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Take2Earn for secure, verified, and affordable parcel delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/send">
              <Button size="lg" className="text-lg px-8">
                Send Your First Parcel
              </Button>
            </Link>
            <Link to="/carry">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Start Earning Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold">Take2Earn</span>
              </div>
              <p className="text-sm text-muted-foreground">Peer-to-peer parcel delivery marketplace.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Booths</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Prohibited Items</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">KYC Guidelines</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Take2Earn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
