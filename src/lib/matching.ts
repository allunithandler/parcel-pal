import { mockBooths, mockRouteOffers, type Parcel, type RouteOffer, type Booth } from './mock-data';

export interface MatchResult {
  offer: RouteOffer;
  score: number;
  routeOverlap: number;
  estimatedCost: number;
  eta: string;
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function cityMatch(boothCity: string, routeCity: string): boolean {
  return boothCity.toLowerCase().includes(routeCity.toLowerCase()) ||
    routeCity.toLowerCase().includes(boothCity.toLowerCase());
}

export function matchCarriers(parcel: Parcel): MatchResult[] {
  const pickupBooth = mockBooths.find(b => b.id === parcel.pickup_booth_id);
  const dropBooth = mockBooths.find(b => b.id === parcel.drop_booth_id);
  if (!pickupBooth || !dropBooth) return [];

  const results: MatchResult[] = [];

  for (const offer of mockRouteOffers) {
    if (offer.status !== 'active') continue;

    const originMatch = cityMatch(pickupBooth.city, offer.origin_city);
    const destMatch = cityMatch(dropBooth.city, offer.destination_city);

    let routeOverlap = 0;
    if (originMatch && destMatch) routeOverlap = 1.0;
    else if (originMatch || destMatch) routeOverlap = 0.5;
    else continue;

    // Weight check
    const parcelWeight = parseFloat(parcel.weight);
    const [minCap] = offer.capacity_kg.split('-').map(Number);
    if (parcelWeight > (minCap || 5) * 2) continue;

    // Category checks
    if (parcel.category === 'food' && !offer.accepts_food) continue;
    if (parcel.category === 'glass' && !offer.accepts_fragile) continue;

    // Score: overlap * 0.4 + (1/price normalized) * 0.3 + rating factor * 0.3
    const priceScore = 1 / (offer.price_per_kg + 1);
    const ratingFactor = (offer.carrier_name ? 4.5 : 4.0) / 5;
    const score = routeOverlap * 0.4 + priceScore * 0.3 + ratingFactor * 0.3;

    const estimatedCost = Math.round(parcelWeight * offer.price_per_kg);
    const eta = routeOverlap === 1.0 ? '12-24 hours' : '24-48 hours';

    results.push({ offer, score, routeOverlap, estimatedCost, eta });
  }

  return results.sort((a, b) => b.score - a.score);
}
