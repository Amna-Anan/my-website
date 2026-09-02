export type BinStatus = 'empty' | 'low' | 'medium' | 'high' | 'critical';

export interface Bin {
  id: string;
  location: string;
  zone: string;
  fillLevel: number;
  status: BinStatus;
  lastUpdated: string;
  type: 'general' | 'recycling' | 'organic';
  distance: number;
  coordinates: { lat: number; lng: number };
}

export interface RouteStep {
  id: string;
  binId: string;
  order: number;
  location: string;
  zone: string;
  distance: number;
  fillLevel: number;
  estimatedTime: string;
}

export interface RouteInfo {
  totalDistance: number;
  estimatedDuration: string;
  binsToCollect: number;
  fuelSaved: number;
  co2Reduced: number;
  steps: RouteStep[];
  generatedAt: string;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: string;
  trend: number;
  color: string;
}

export interface PriorityBin {
  id: string;
  location: string;
  zone: string;
  fillLevel: number;
  lastUpdated: string;
  reason: string;
}
