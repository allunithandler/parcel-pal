import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, XCircle, Eye, BarChart3, ClipboardList, MapPin, AlertTriangle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/Navbar';
import { mockParcels, mockBooths, getBoothById, type ParcelStatus } from '@/lib/mock-data';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';

const dailyData = [
  { day: 'Mon', parcels: 12 }, { day: 'Tue', parcels: 18 },
  { day: 'Wed', parcels: 15 }, { day: 'Thu', parcels: 22 },
  { day: 'Fri', parcels: 28 }, { day: 'Sat', parcels: 35 },
  { day: 'Sun', parcels: 20 },
];

const statusBreakdown = [
  { name: 'In Transit', value: 40, fill: 'hsl(var(--secondary))' },
  { name: 'At Booth', value: 30, fill: 'hsl(var(--primary))' },
  { name: 'Delivered', value: 25, fill: 'hsl(var(--success))' },
  { name: 'Disputed', value: 5, fill: 'hsl(var(--destructive))' },
];

const chartConfig: ChartConfig = { parcels: { label: 'Parcels', color: 'hsl(var(--primary))' } };

const statusBadge: Record<string, string> = {
  in_transit: 'bg-secondary/10 text-secondary border-secondary/20',
  at_pickup_booth: 'bg-primary/10 text-primary border-primary/20',
  delivered: 'bg-success/10 text-success border-success/20',
  created: 'bg-muted text-muted-foreground',
  disputed: 'bg-destructive/10 text-destructive border-destructive/20',
};

const Admin = () => {
  const [parcels, setParcels] = useState(mockParcels);
  const booth = mockBooths[0]; // Simulating logged-in booth admin

  const verifyParcel = (id: string) => {
    setParcels(ps => ps.map(p => p.id === id ? { ...p, status: 'assigned_to_carrier' as ParcelStatus } : p));
    toast.success('Parcel verified and ready for carrier assignment');
  };

  const rejectParcel = (id: string) => {
    setParcels(ps => ps.map(p => p.id === id ? { ...p, status: 'disputed' as ParcelStatus } : p));
    toast.error('Parcel flagged for review');
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
            <Badge variant="outline" className="ml-2 text-xs">Admin</Badge>
          </Link>
          <div className="flex items-center gap-2">
            <NotificationPanel />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Booth info */}
        <div className="flex items-center gap-3 mb-8">
          <MapPin className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">{booth.name}</h1>
            <p className="text-sm text-muted-foreground">{booth.address}, {booth.city} • Admin: {booth.admin_name}</p>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Parcels Today', value: '28', icon: Package, color: 'text-primary' },
            { label: 'Pending Verification', value: parcels.filter(p => p.status === 'at_pickup_booth').length.toString(), icon: ClipboardList, color: 'text-secondary' },
            { label: 'Active Carriers', value: '5', icon: Users, color: 'text-success' },
            { label: 'Disputes', value: parcels.filter(p => p.status === 'disputed').length.toString(), icon: AlertTriangle, color: 'text-destructive' },
          ].map((k, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <k.icon className={`h-5 w-5 mb-2 ${k.color}`} />
                <p className="text-2xl font-bold">{k.value}</p>
                <p className="text-xs text-muted-foreground">{k.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="parcels" className="space-y-6">
          <TabsList>
            <TabsTrigger value="parcels" className="gap-1"><ClipboardList className="h-4 w-4" />Parcels</TabsTrigger>
            <TabsTrigger value="inventory" className="gap-1"><Package className="h-4 w-4" />Inventory</TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1"><BarChart3 className="h-4 w-4" />Analytics</TabsTrigger>
          </TabsList>

          {/* Parcels tab */}
          <TabsContent value="parcels">
            <Card>
              <CardHeader><CardTitle>Parcel Management</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {parcels.map(p => {
                  const pickup = getBoothById(p.pickup_booth_id);
                  const drop = getBoothById(p.drop_booth_id);
                  return (
                    <div key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{p.tracking_code}</span>
                          <Badge variant="outline" className={`text-[10px] ${statusBadge[p.status] || ''}`}>
                            {p.status.replace(/_/g, ' ')}
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">{p.category}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {p.sender_name} → {p.receiver_name} • {p.weight} • ₹{p.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {pickup?.name} → {drop?.name}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {p.status === 'at_pickup_booth' && (
                          <>
                            <Button size="sm" onClick={() => verifyParcel(p.id)} className="gap-1">
                              <CheckCircle className="h-3 w-3" /> Verify
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => rejectParcel(p.id)} className="gap-1">
                              <XCircle className="h-3 w-3" /> Reject
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="h-3 w-3" /> View
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory tab */}
          <TabsContent value="inventory">
            <div className="grid md:grid-cols-2 gap-6">
              {mockBooths.map(b => (
                <Card key={b.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{b.name}</h3>
                      <Badge variant={b.current_parcels / b.capacity > 0.7 ? 'destructive' : 'default'}>
                        {b.current_parcels}/{b.capacity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{b.city}, {b.state}</p>
                    <Progress value={(b.current_parcels / b.capacity) * 100} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.round((b.current_parcels / b.capacity) * 100)}% full</span>
                      <span>{b.capacity - b.current_parcels} slots available</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics tab */}
          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Daily Volume</CardTitle></CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[250px]">
                    <BarChart data={dailyData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="parcels" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Status Distribution</CardTitle></CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="h-[200px] w-full">
                    <PieChart width={300} height={200}>
                      <Pie data={statusBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {statusBreakdown.map((e, i) => <Cell key={i} fill={e.fill} />)}
                      </Pie>
                    </PieChart>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4 w-full">
                    {statusBreakdown.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ background: s.fill }} />
                        <span className="text-muted-foreground">{s.name}: {s.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
