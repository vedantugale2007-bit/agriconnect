-- AgriConnect Supabase PostgreSQL Database Schema
-- Run this script in your Supabase SQL Editor (https://app.supabase.com -> Project -> SQL Editor)

-- 1. Users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('FARMER', 'TRANSPORTER', 'ADMIN')) DEFAULT 'FARMER',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Farmers Profile
CREATE TABLE IF NOT EXISTS public.farmers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  district TEXT DEFAULT 'Nashik',
  village TEXT DEFAULT 'Sinnar',
  land_acres NUMERIC(5,2) DEFAULT 5.0,
  main_crops TEXT[] DEFAULT ARRAY['Onion', 'Tomato', 'Grapes'],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Transporters Profile
CREATE TABLE IF NOT EXISTS public.transporters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  rating NUMERIC(3,2) DEFAULT 4.8,
  total_trips INT DEFAULT 120,
  is_verified BOOLEAN DEFAULT TRUE,
  eco_score TEXT DEFAULT 'A+ EV Fleet',
  rate_per_ton_km NUMERIC(6,2) DEFAULT 22.0,
  location TEXT DEFAULT 'Nashik - Pune Highway',
  rc_document_url TEXT,
  license_document_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Vehicles
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transporter_id UUID REFERENCES public.transporters(id) ON DELETE CASCADE,
  vehicle_number TEXT NOT NULL UNIQUE,
  vehicle_type TEXT NOT NULL,
  capacity_tons NUMERIC(4,2) DEFAULT 6.0,
  is_refrigerated BOOLEAN DEFAULT FALSE,
  status TEXT CHECK (status IN ('AVAILABLE', 'IN_TRANSIT', 'MAINTENANCE')) DEFAULT 'AVAILABLE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Bookings / Shipments
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT UNIQUE NOT NULL,
  farmer_name TEXT NOT NULL,
  farmer_phone TEXT NOT NULL,
  crop_type TEXT NOT NULL,
  weight_kg NUMERIC(8,2) NOT NULL,
  pickup_location TEXT NOT NULL,
  destination_location TEXT NOT NULL,
  pickup_date TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  transporter_name TEXT,
  driver_name TEXT,
  driver_phone TEXT,
  vehicle_number TEXT,
  status TEXT CHECK (status IN ('PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED')) DEFAULT 'CONFIRMED',
  base_fee NUMERIC(8,2) NOT NULL,
  insurance_fee NUMERIC(6,2) DEFAULT 150,
  platform_fee NUMERIC(6,2) DEFAULT 100,
  fuel_offset_fee NUMERIC(6,2) DEFAULT 50,
  total_fee NUMERIC(8,2) NOT NULL,
  current_lat NUMERIC(9,6) DEFAULT 19.845,
  current_lng NUMERIC(9,6) DEFAULT 74.02,
  temperature_celsius NUMERIC(4,1) DEFAULT 22.5,
  humidity_percent INT DEFAULT 55,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Loads & Cargo Specs
CREATE TABLE IF NOT EXISTS public.loads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  cargo_name TEXT NOT NULL,
  temperature_min NUMERIC(4,1) DEFAULT 4.0,
  temperature_max NUMERIC(4,1) DEFAULT 8.0,
  humidity_target INT DEFAULT 60,
  special_instructions TEXT
);

-- 7. Payments
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  amount NUMERIC(8,2) NOT NULL,
  payment_method TEXT DEFAULT 'UPI_RAZORPAY',
  razorpay_payment_id TEXT,
  status TEXT CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED')) DEFAULT 'SUCCESS',
  paid_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_phone TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'INFO',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Ratings & Reviews
CREATE TABLE IF NOT EXISTS public.ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  rating_score NUMERIC(2,1) CHECK (rating_score >= 1.0 AND rating_score <= 5.0),
  review_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AI Chat History
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_phone TEXT NOT NULL,
  message TEXT NOT NULL,
  sender TEXT CHECK (sender IN ('user', 'ai')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Realtime Publication Enable
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Storage Bucket Setup for RC & License Documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('agri_documents', 'agri_documents', true) 
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (bucket_id = 'agri_documents');
CREATE POLICY "Public Upload Access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'agri_documents');
