import { Link } from 'react-router-dom';
import { Package, TrendingUp, Truck, MapPin, IndianRupee, Clock, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NotificationPanel } from '@/components/NotificationPanel';
import { mockParcels, mockTrips, mockBooths, getBoothById } from '@/lib/mock-data';
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Jul', amount: 1200 }, { month: 'Aug', amount: 1800 },
  { month: 'Sep', amount: 2400 }, { month: 'Oct', amount: 1900 },
  { month: 'Nov', amount: 3100 }, { month: 'Dec', amount: 2700 },
];

const deliveryData = [
  { month: 'Jul', sent: 5, carried: 8 }, { month: 'Aug', sent: 7, carried: 12 },
  { month: 'Sep', sent: 10, carried: 15 }, { month: 'Oct', sent: 8, carried: 11 },
  { month: 'Nov', sent: 12, carried: 20 }, { month: 'Dec', sent: 9, carried: 14 },
];

const categoryData = [
  { name: 'Electronics', value: 35, fill: 'hsl(var(--primary))' },
  { name: 'Documents', value: 25, fill: 'hsl(var(--secondary))' },
  { name: 'Clothing', value: 20, fill: 'hsl(var(--success))' },
  { name: 'Other', value: 20, fill: 'hsl(var(--muted-foreground))' },
];

const earningsConfig: ChartConfig = {
  amount: { label: 'Earnings (₹)', color: 'hsl(var(--primary))' },
};
const deliveryConfig: ChartConfig = {
  sent: { label: 'Sent', color: 'hsl(var(--primary))' },
  carried: { label: 'Carried', color: 'hsl(var(--secondary))' },
};

const statusColor: Record<string, string> = {
  in_transit: 'bg-secondary text-secondary-foreground',
  delivered: 'bg-success text-success-foreground',
  at_pickup_booth: 'bg-primary text-primary-foreground',
  created: 'bg-muted text-muted-foreground',
};

const Dashboard = () => {
  const totalEarnings = earningsData.reduce((s, d) => s + d.amount, 0);
  const totalDeliveries = deliveryData.reduce((s, d) => s + d.sent + d.carried, 0);

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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Your delivery activity at a glance</p>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString()}`, icon: IndianRupee, change: '+12%', up: true },
            { label: 'Deliveries', value: totalDeliveries.toString(), icon: Truck, change: '+8%', up: true },
            { label: 'Active Parcels', value: mockParcels.filter(p => p.status === 'in_transit').length.toString(), icon: Package, change: '', up: true },
            { label: 'Avg Rating', value: '4.8', icon: Star, change: '+0.1', up: true },
          ].map((s, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <s.icon className="h-5 w-5 text-muted-foreground" />
                  {s.change && (
                    <span className={`text-xs flex items-center ${s.up ? 'text-success' : 'text-destructive'}`}>
                      {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {s.change}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader><CardTitle className="text-lg">Earnings History</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={earningsConfig} className="h-[250px]">
                <BarChart data={earningsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Delivery Stats</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={deliveryConfig} className="h-[250px]">
                <LineChart data={deliveryData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="sent" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="carried" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Active shipments & category breakdown */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">Active Shipments</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {mockParcels.map(p => {
                  const pickup = getBoothById(p.pickup_booth_id);
                  const drop = getBoothById(p.drop_booth_id);
                  return (
                    <div key={p.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                      <Package className="h-8 w-8 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{p.tracking_code}</span>
                          <Badge className={`text-[10px] ${statusColor[p.status] || ''}`}>
                            {p.status.replace(/_/g, ' ')}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {pickup?.city} → {drop?.city} • {p.category} • {p.weight}
                        </p>
                      </div>
                      <Link to="/track">
                        <Button variant="ghost" size="sm" className="text-xs">Track</Button>
                      </Link>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-lg">By Category</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {categoryData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryData.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: c.fill }} />
                      {c.name}
                    </span>
                    <span className="text-muted-foreground">{c.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
