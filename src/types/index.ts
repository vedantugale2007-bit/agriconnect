export type ScreenType =
  | 'home'
  | 'farmer-dashboard'
  | 'transporter-dashboard'
  | 'admin-dashboard'
  | 'find-transport'
  | 'booking-review'
  | 'checkout'
  | 'payment-success'
  | 'live-tracking'
  | 'invoices'
  | 'transactions'
  | 'ai-assistant'
  | 'weather';

export type UserRole = 'farmer' | 'transporter' | 'admin';

export type Language = 'mr' | 'hi' | 'en';

export type CargoType =
  | 'Onion'
  | 'Grapes'
  | 'Tomato'
  | 'Pomegranate'
  | 'Sugarcane'
  | 'Soybean'
  | 'Wheat'
  | 'Maize';

export type VehicleType =
  | 'Tata Ace Gold'
  | 'Mahindra Bolero Pickup'
  | 'Mahindra Jeeto'
  | 'Ashok Leyland Dost'
  | 'Eicher 14 ft'
  | 'BharatBenz Truck'
  | 'Tata 407';

export interface Transporter {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  vehicleType: VehicleType;
  capacityTons: number;
  ratePerTonMile: number; // rate in ₹/km or ₹/ton-km
  location: string;
  ecoScore: string; // e.g. "BS6 Compliant", "EV Zero Emission"
  completedTrips: number;
  phone: string;
  avatar: string;
  availableDate: string;
}

export interface ShipmentBooking {
  id: string;
  bookingNumber: string;
  farmerName: string;
  farmerPhone: string;
  cropType: CargoType;
  weightKg: number;
  pickupLocation: string;
  destinationLocation: string;
  pickupDate: string;
  vehicleType: VehicleType;
  transporter?: Transporter;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  status: 'POSTED' | 'MATCHED' | 'CONFIRMED' | 'IN_TRANSIT' | 'DELIVERED';
  baseFee: number;
  insuranceFee: number;
  platformFee: number;
  fuelOffsetFee: number;
  totalFee: number;
  createdAt: string;
  estimatedHours: number;
  currentLat?: number;
  currentLng?: number;
  temperatureCelsius?: number;
  humidityPercent?: number;
}

export interface MandiPrice {
  id: string;
  crop: string;
  market: string;
  region: string;
  pricePerQuintal: number;
  unit: string;
  change: number; // e.g. +2.4 or -1.1
  trend: 'up' | 'down' | 'stable';
  updatedAt: string;
}

export interface LossPredictionResult {
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  riskPercentage: number;
  shelfLifeHours: number;
  recommendedDepartureWindow: string;
  spoilageFactor: string;
  actionableInsights: string[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  farmerName: string;
  farmerAddress: string;
  transporterName: string;
  transporterAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  taxGst: number;
  platformFee: number;
  totalAmount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  paymentMethod: string;
  gstinFarmer?: string;
  gstinTransporter?: string;
  hsnSacCode?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  imageUrl?: string;
  cropDiagnosis?: {
    cropName: string;
    condition: string;
    confidence: number;
    issues: string[];
    recommendations: string[];
  };
}
