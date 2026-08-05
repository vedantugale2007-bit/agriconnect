import { createClient } from '@supabase/supabase-js';
import { ShipmentBooking, Transporter, MandiPrice, Invoice } from '../types';
import { INITIAL_SHIPMENTS, INITIAL_TRANSPORTERS, INITIAL_MANDI_PRICES, INITIAL_INVOICES } from '../data/mockData';

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== 'YOUR_SUPABASE_URL'
);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ==========================================
// SUPABASE AUTHENTICATION (PHONE OTP)
// ==========================================

export async function sendPhoneOtp(phone: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    // Local fallback simulation
    console.log(`[Local Simulation] OTP sent to ${phone}: 123456`);
    return { success: true };
  }

  try {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'OTP पाठवण्यात अडचण आली.' };
  }
}

export async function verifyPhoneOtp(phone: string, token: string): Promise<{ success: boolean; session?: any; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    if (token === '123456' || token.length === 6) {
      return { success: true, session: { user: { phone } } };
    }
    return { success: false, error: 'चुकीचा OTP पासवर्ड.' };
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, session: data.session };
  } catch (err: any) {
    return { success: false, error: err.message || 'OTP पडताळणी अयशस्वी.' };
  }
}

// ==========================================
// SUPABASE STORAGE (DOCUMENT UPLOADS)
// ==========================================

export async function uploadRcOrLicenseDocument(file: File, folder: 'rc' | 'license'): Promise<string> {
  if (!isSupabaseConfigured || !supabase) {
    // Local object URL fallback
    return URL.createObjectURL(file);
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('agri_documents')
      .upload(filePath, file);

    if (uploadError) {
      console.warn('Storage upload warning:', uploadError.message);
      return URL.createObjectURL(file);
    }

    const { data } = supabase.storage.from('agri_documents').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (e) {
    console.warn('Document upload error:', e);
    return URL.createObjectURL(file);
  }
}

// ==========================================
// DATABASE ENGINE WITH REALTIME SUBSCRIPTIONS
// ==========================================

class AgroDatabaseService {
  private shipments: ShipmentBooking[] = [...INITIAL_SHIPMENTS];
  private transporters: Transporter[] = [...INITIAL_TRANSPORTERS];
  private mandiPrices: MandiPrice[] = [...INITIAL_MANDI_PRICES];
  private invoices: Invoice[] = [...INITIAL_INVOICES];

  constructor() {
    try {
      const savedShipments = localStorage.getItem('agri_shipments');
      if (savedShipments) {
        this.shipments = JSON.parse(savedShipments);
      }
      const savedTransporters = localStorage.getItem('agri_transporters');
      if (savedTransporters) {
        this.transporters = JSON.parse(savedTransporters);
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }
  }

  private saveLocally() {
    try {
      localStorage.setItem('agri_shipments', JSON.stringify(this.shipments));
      localStorage.setItem('agri_transporters', JSON.stringify(this.transporters));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  }

  // Realtime Listener
  subscribeToBookings(onUpdate: (shipment: ShipmentBooking) => void) {
    if (!isSupabaseConfigured || !supabase) return () => {};

    const channel = supabase
      .channel('public:bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
        if (payload.new) {
          onUpdate(payload.new as ShipmentBooking);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  // Shipments / Bookings
  async getShipments(): Promise<ShipmentBooking[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            bookingNumber: d.booking_number || d.bookingNumber,
            farmerName: d.farmer_name || d.farmerName,
            farmerPhone: d.farmer_phone || d.farmerPhone,
            cropType: d.crop_type || d.cropType,
            weightKg: d.weight_kg || d.weightKg,
            pickupLocation: d.pickup_location || d.pickupLocation,
            destinationLocation: d.destination_location || d.destinationLocation,
            pickupDate: d.pickup_date || d.pickupDate,
            vehicleType: d.vehicle_type || d.vehicleType,
            transporter: d.transporter || this.transporters[0],
            driverName: d.driver_name || d.driverName,
            driverPhone: d.driver_phone || d.driverPhone,
            vehicleNumber: d.vehicle_number || d.vehicleNumber,
            status: d.status,
            baseFee: d.base_fee || d.baseFee,
            insuranceFee: d.insurance_fee || d.insuranceFee || 150,
            platformFee: d.platform_fee || d.platformFee || 100,
            fuelOffsetFee: d.fuel_offset_fee || d.fuelOffsetFee || 50,
            totalFee: d.total_fee || d.totalFee,
            createdAt: d.created_at || d.createdAt,
            estimatedHours: 1.5,
            currentLat: d.current_lat || 19.845,
            currentLng: d.current_lng || 74.02,
            temperatureCelsius: d.temperature_celsius || 22.5,
            humidityPercent: d.humidity_percent || 55,
          }));
        }
      } catch (e) {
        console.warn('Supabase fetch error, fallback to local state:', e);
      }
    }
    return this.shipments;
  }

  async addShipment(booking: Partial<ShipmentBooking>): Promise<ShipmentBooking> {
    const fullBooking: ShipmentBooking = {
      id: `ship-${Date.now()}`,
      bookingNumber: `AC-${Math.floor(1000 + Math.random() * 9000)}-MH15`,
      farmerName: booking.farmerName || 'Shankar Patil',
      farmerPhone: booking.farmerPhone || '+91 98221 11002',
      cropType: booking.cropType || 'Onion',
      weightKg: booking.weightKg || 10000,
      pickupLocation: booking.pickupLocation || 'Sinnar Farm Gate 3, Nashik',
      destinationLocation: booking.destinationLocation || 'Lasalgaon APMC Market',
      pickupDate: booking.pickupDate || 'Today 08:00 AM',
      vehicleType: booking.vehicleType || 'Eicher 14 ft',
      transporter: booking.transporter || this.transporters[0],
      driverName: booking.driverName || 'ज्ञानेश्वर शिंदे (Dnyaneshwar Shinde)',
      driverPhone: booking.driverPhone || '+91 98901 23456',
      vehicleNumber: booking.vehicleNumber || 'MH 15 EG 4821',
      status: 'CONFIRMED',
      baseFee: booking.baseFee || 3200,
      insuranceFee: booking.insuranceFee || 150,
      platformFee: booking.platformFee || 100,
      fuelOffsetFee: booking.fuelOffsetFee || 50,
      totalFee: booking.totalFee || 3500,
      createdAt: new Date().toISOString(),
      estimatedHours: 1.5,
      currentLat: 19.845,
      currentLng: 74.02,
      temperatureCelsius: 22.5,
      humidityPercent: 55,
    };

    this.shipments.unshift(fullBooking);
    this.saveLocally();

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('bookings').insert([
          {
            booking_number: fullBooking.bookingNumber,
            farmer_name: fullBooking.farmerName,
            farmer_phone: fullBooking.farmerPhone,
            crop_type: fullBooking.cropType,
            weight_kg: fullBooking.weightKg,
            pickup_location: fullBooking.pickupLocation,
            destination_location: fullBooking.destinationLocation,
            pickup_date: fullBooking.pickupDate,
            vehicle_type: fullBooking.vehicleType,
            transporter_name: fullBooking.transporter.name,
            driver_name: fullBooking.driverName,
            driver_phone: fullBooking.driverPhone,
            vehicle_number: fullBooking.vehicleNumber,
            status: fullBooking.status,
            base_fee: fullBooking.baseFee,
            insurance_fee: fullBooking.insuranceFee,
            platform_fee: fullBooking.platformFee,
            fuel_offset_fee: fullBooking.fuelOffsetFee,
            total_fee: fullBooking.totalFee,
            current_lat: fullBooking.currentLat,
            current_lng: fullBooking.currentLng,
          },
        ]);
      } catch (e) {
        console.warn('Supabase booking insert error:', e);
      }
    }

    return fullBooking;
  }

  async updateShipmentStatus(id: string, status: ShipmentBooking['status']): Promise<void> {
    const index = this.shipments.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.shipments[index].status = status;
      this.saveLocally();
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('bookings').update({ status }).eq('id', id);
      } catch (e) {
        console.warn('Supabase status update error:', e);
      }
    }
  }

  // Transporters
  async getTransporters(): Promise<Transporter[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('transporters').select('*');
        if (!error && data && data.length > 0) {
          return data as Transporter[];
        }
      } catch (e) {
        console.warn('Supabase transporters fetch error:', e);
      }
    }
    return this.transporters;
  }

  // Mandi Prices
  async getMandiPrices(): Promise<MandiPrice[]> {
    return this.mandiPrices;
  }

  // Invoices
  async getInvoices(): Promise<Invoice[]> {
    return this.invoices;
  }
}

export const db = new AgroDatabaseService();
