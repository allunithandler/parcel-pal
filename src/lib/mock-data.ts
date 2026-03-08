// Temporary mock database for development
export type ParcelStatus = 'created' | 'at_pickup_booth' | 'assigned_to_carrier' | 'in_transit' | 'at_destination_booth' | 'delivered' | 'disputed';

export type ParcelCategory = 'documents' | 'electronics' | 'food' | 'medicine' | 'clothing' | 'glass' | 'other';

export interface Booth {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lon: number;
  opening_hours: string;
  admin_name: string;
  capacity: number;
  current_parcels: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'sender' | 'carrier' | 'booth_admin';
  kyc_verified: boolean;
  rating: number;
  total_deliveries: number;
  avatar?: string;
}

export interface Parcel {
  id: string;
  tracking_code: string;
  sender_id: string;
  sender_name: string;
  receiver_name: string;
  receiver_phone: string;
  pickup_booth_id: string;
  drop_booth_id: string;
  category: ParcelCategory;
  weight: string;
  dimensions?: string;
  value: number;
  insurance: boolean;
  description?: string;
  status: ParcelStatus;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Trip {
  id: string;
  parcel_id: string;
  carrier_id: string;
  carrier_name: string;
  carrier_rating: number;
  price: number;
  pickup_time?: string;
  drop_time?: string;
  status: 'pending' | 'accepted' | 'in_transit' | 'completed' | 'cancelled';
  pickup_photo?: string;
  drop_photo?: string;
}

export interface RouteOffer {
  id: string;
  carrier_id: string;
  carrier_name: string;
  origin_city: string;
  destination_city: string;
  departure_date: string;
  arrival_date: string;
  capacity_kg: string;
  price_per_kg: number;
  accepts_fragile: boolean;
  accepts_food: boolean;
  status: 'active' | 'matched' | 'completed';
}

// Mock Booths
export const mockBooths: Booth[] = [
  {
    id: 'booth1',
    name: 'Connaught Place Hub',
    address: 'Block A, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    lat: 28.6315,
    lon: 77.2167,
    opening_hours: '8 AM - 10 PM',
    admin_name: 'Amit Sharma',
    capacity: 100,
    current_parcels: 23,
  },
  {
    id: 'booth2',
    name: 'Indiranagar Station',
    address: '100 Feet Road, Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    lat: 12.9716,
    lon: 77.5946,
    opening_hours: '7 AM - 11 PM',
    admin_name: 'Priya Reddy',
    capacity: 150,
    current_parcels: 45,
  },
  {
    id: 'booth3',
    name: 'Bandra West Booth',
    address: 'Linking Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.0596,
    lon: 72.8295,
    opening_hours: '8 AM - 10 PM',
    admin_name: 'Ravi Patel',
    capacity: 120,
    current_parcels: 38,
  },
  {
    id: 'booth4',
    name: 'Park Street Center',
    address: 'Park Street, Central Kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    lat: 22.5544,
    lon: 88.3516,
    opening_hours: '8 AM - 9 PM',
    admin_name: 'Sanjay Banerjee',
    capacity: 80,
    current_parcels: 19,
  },
  {
    id: 'booth5',
    name: 'MG Road Hub',
    address: 'MG Road Metro Station',
    city: 'Bangalore',
    state: 'Karnataka',
    lat: 12.9759,
    lon: 77.6069,
    opening_hours: '7 AM - 11 PM',
    admin_name: 'Lakshmi Nair',
    capacity: 130,
    current_parcels: 31,
  },
  {
    id: 'booth6',
    name: 'Anna Nagar Depot',
    address: '2nd Avenue, Anna Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    lat: 13.0850,
    lon: 80.2101,
    opening_hours: '7 AM - 10 PM',
    admin_name: 'Karthik Subramaniam',
    capacity: 110,
    current_parcels: 78,
  },
  {
    id: 'booth7',
    name: 'Jubilee Hills Point',
    address: 'Road No. 36, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    lat: 17.4326,
    lon: 78.4071,
    opening_hours: '8 AM - 10 PM',
    admin_name: 'Srinivas Rao',
    capacity: 90,
    current_parcels: 52,
  },
  {
    id: 'booth8',
    name: 'Aundh Station',
    address: 'ITI Road, Aundh',
    city: 'Pune',
    state: 'Maharashtra',
    lat: 18.5580,
    lon: 73.8077,
    opening_hours: '8 AM - 9 PM',
    admin_name: 'Sneha Kulkarni',
    capacity: 100,
    current_parcels: 41,
  },
  {
    id: 'booth9',
    name: 'CG Road Center',
    address: 'CG Road, Navrangpura',
    city: 'Ahmedabad',
    state: 'Gujarat',
    lat: 23.0300,
    lon: 72.5600,
    opening_hours: '8 AM - 10 PM',
    admin_name: 'Darshan Mehta',
    capacity: 85,
    current_parcels: 12,
  },
  {
    id: 'booth10',
    name: 'Civil Lines Hub',
    address: 'Civil Lines, Near GPO',
    city: 'Jaipur',
    state: 'Rajasthan',
    lat: 26.9260,
    lon: 75.7873,
    opening_hours: '8 AM - 9 PM',
    admin_name: 'Pooja Rathore',
    capacity: 70,
    current_parcels: 55,
  },
  {
    id: 'booth11',
    name: 'Hazratganj Booth',
    address: 'Hazratganj Road',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    lat: 26.8530,
    lon: 80.9440,
    opening_hours: '8 AM - 9 PM',
    admin_name: 'Mohit Verma',
    capacity: 75,
    current_parcels: 30,
  },
  {
    id: 'booth12',
    name: 'Sector 17 Plaza',
    address: 'Sector 17, Market Complex',
    city: 'Chandigarh',
    state: 'Chandigarh',
    lat: 30.7410,
    lon: 76.7854,
    opening_hours: '9 AM - 9 PM',
    admin_name: 'Harpreet Kaur',
    capacity: 60,
    current_parcels: 48,
  },
  {
    id: 'booth13',
    name: 'Panaji Central',
    address: 'MG Road, Panaji',
    city: 'Panaji',
    state: 'Goa',
    lat: 15.4989,
    lon: 73.8278,
    opening_hours: '9 AM - 8 PM',
    admin_name: 'Rohan Naik',
    capacity: 50,
    current_parcels: 8,
  },
  {
    id: 'booth14',
    name: 'Paltan Bazaar Hub',
    address: 'Paltan Bazaar, Near Station',
    city: 'Guwahati',
    state: 'Assam',
    lat: 26.1850,
    lon: 91.7468,
    opening_hours: '8 AM - 8 PM',
    admin_name: 'Ananya Bora',
    capacity: 55,
    current_parcels: 22,
  },
  {
    id: 'booth15',
    name: 'MG Marg Center',
    address: 'MG Marg, Near Mall Road',
    city: 'Gangtok',
    state: 'Sikkim',
    lat: 27.3314,
    lon: 88.6138,
    opening_hours: '9 AM - 7 PM',
    admin_name: 'Tenzin Lama',
    capacity: 35,
    current_parcels: 5,
  },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    role: 'carrier',
    kyc_verified: true,
    rating: 4.8,
    total_deliveries: 127,
  },
  {
    id: 'user2',
    name: 'Anita Desai',
    phone: '+91 87654 32109',
    email: 'anita.desai@email.com',
    role: 'sender',
    kyc_verified: true,
    rating: 4.9,
    total_deliveries: 23,
  },
  {
    id: 'user3',
    name: 'Vikram Singh',
    phone: '+91 76543 21098',
    email: 'vikram.singh@email.com',
    role: 'carrier',
    kyc_verified: true,
    rating: 4.7,
    total_deliveries: 89,
  },
];

// Mock Parcels
export const mockParcels: Parcel[] = [
  {
    id: 'parcel1',
    tracking_code: 'T2E987654',
    sender_id: 'user2',
    sender_name: 'Anita Desai',
    receiver_name: 'Pradeep Menon',
    receiver_phone: '+91 99887 76655',
    pickup_booth_id: 'booth1',
    drop_booth_id: 'booth5',
    category: 'electronics',
    weight: '2.5 kg',
    value: 15000,
    insurance: true,
    description: 'Laptop accessories',
    status: 'in_transit',
    created_at: '2024-12-20T10:30:00Z',
    updated_at: '2024-12-20T16:45:00Z',
  },
  {
    id: 'parcel2',
    tracking_code: 'T2E876543',
    sender_id: 'user2',
    sender_name: 'Rohit Sharma',
    receiver_name: 'Kavita Iyer',
    receiver_phone: '+91 88776 65544',
    pickup_booth_id: 'booth3',
    drop_booth_id: 'booth4',
    category: 'documents',
    weight: '0.5 kg',
    value: 1000,
    insurance: false,
    description: 'Legal documents',
    status: 'at_pickup_booth',
    created_at: '2024-12-21T08:15:00Z',
    updated_at: '2024-12-21T08:15:00Z',
  },
  {
    id: 'parcel3',
    tracking_code: 'T2E765432',
    sender_id: 'user2',
    sender_name: 'Meera Nair',
    receiver_name: 'Arjun Reddy',
    receiver_phone: '+91 77665 54433',
    pickup_booth_id: 'booth2',
    drop_booth_id: 'booth1',
    category: 'clothing',
    weight: '1.2 kg',
    value: 3000,
    insurance: false,
    status: 'delivered',
    created_at: '2024-12-19T14:20:00Z',
    updated_at: '2024-12-20T09:30:00Z',
  },
];

// Mock Trips
export const mockTrips: Trip[] = [
  {
    id: 'trip1',
    parcel_id: 'parcel1',
    carrier_id: 'user1',
    carrier_name: 'Rajesh Kumar',
    carrier_rating: 4.8,
    price: 200,
    pickup_time: '2024-12-20T16:45:00Z',
    status: 'in_transit',
  },
  {
    id: 'trip2',
    parcel_id: 'parcel3',
    carrier_id: 'user3',
    carrier_name: 'Vikram Singh',
    carrier_rating: 4.7,
    price: 150,
    pickup_time: '2024-12-19T15:00:00Z',
    drop_time: '2024-12-20T09:30:00Z',
    status: 'completed',
  },
];

// Mock Route Offers
export const mockRouteOffers: RouteOffer[] = [
  {
    id: 'route1',
    carrier_id: 'user1',
    carrier_name: 'Rajesh Kumar',
    origin_city: 'New Delhi',
    destination_city: 'Bangalore',
    departure_date: '2024-12-22',
    arrival_date: '2024-12-23',
    capacity_kg: '5-10',
    price_per_kg: 30,
    accepts_fragile: true,
    accepts_food: false,
    status: 'active',
  },
  {
    id: 'route2',
    carrier_id: 'user3',
    carrier_name: 'Vikram Singh',
    origin_city: 'Mumbai',
    destination_city: 'Kolkata',
    departure_date: '2024-12-23',
    arrival_date: '2024-12-24',
    capacity_kg: '10-20',
    price_per_kg: 25,
    accepts_fragile: false,
    accepts_food: true,
    status: 'active',
  },
];

// Helper functions
export const getBoothById = (id: string): Booth | undefined => {
  return mockBooths.find(booth => booth.id === id);
};

export const getParcelByTrackingCode = (code: string): Parcel | undefined => {
  return mockParcels.find(parcel => parcel.tracking_code === code);
};

export const getTripByParcelId = (parcelId: string): Trip | undefined => {
  return mockTrips.find(trip => trip.parcel_id === parcelId);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};
