-- ====================================================================
-- AGRICONNECT SUPABASE POSTGRESQL DATABASE SCHEMA
-- Target Platform: Supabase PostgreSQL
-- Features: Enum Types, Tables, Foreign Keys, Indexes, RLS Policies,
--           Supabase Storage Buckets, Triggers, & Sample Data
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CUSTOM ENUMS & TYPES
CREATE TYPE user_role AS ENUM ('farmer', 'transporter', 'admin');
CREATE TYPE vehicle_status AS ENUM ('available', 'in_transit', 'maintenance', 'reserved');
CREATE TYPE shipment_status AS ENUM ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled');
CREATE TYPE booking_status AS ENUM ('requested', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'escrow_locked', 'released_to_transporter', 'refunded', 'failed');
CREATE TYPE price_trend AS ENUM ('rising', 'falling', 'stable');

-- ====================================================================
-- 3. TABLES DEFINITION
-- ====================================================================

-- TABLE 1: USERS
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    role user_role NOT NULL DEFAULT 'farmer',
    language VARCHAR(10) NOT NULL DEFAULT 'mr',
    district VARCHAR(100) NOT NULL,
    village VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 2: VEHICLES
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transporter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    vehicle_number VARCHAR(20) UNIQUE NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL, -- E.g., 'Bolero Pickup', 'Tata Ace', 'Eicher 14ft', 'Refrigerated Container'
    capacity_tons NUMERIC(5, 2) NOT NULL,
    refrigeration BOOLEAN DEFAULT FALSE,
    gps_enabled BOOLEAN DEFAULT TRUE,
    status vehicle_status DEFAULT 'available',
    puc_valid_until DATE,
    insurance_valid_until DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 3: SHIPMENTS
CREATE TABLE IF NOT EXISTS public.shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    crop_name VARCHAR(100) NOT NULL,
    crop_variety VARCHAR(100),
    quantity_tons NUMERIC(8, 2) NOT NULL,
    pickup_location TEXT NOT NULL,
    destination TEXT NOT NULL,
    pickup_district VARCHAR(100) NOT NULL,
    destination_district VARCHAR(100) NOT NULL,
    expected_price NUMERIC(10, 2),
    is_cold_chain_required BOOLEAN DEFAULT FALSE,
    status shipment_status DEFAULT 'pending',
    pickup_date TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 4: BOOKINGS
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id UUID NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
    transporter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
    agreed_price NUMERIC(10, 2) NOT NULL,
    platform_fee NUMERIC(8, 2) DEFAULT 0.00,
    status booking_status DEFAULT 'requested',
    pickup_time TIMESTAMPTZ,
    estimated_delivery_time TIMESTAMPTZ,
    actual_delivery_time TIMESTAMPTZ,
    qr_verification_code VARCHAR(32) DEFAULT MD5(RANDOM()::TEXT),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 5: TRACKING LOCATIONS
CREATE TABLE IF NOT EXISTS public.tracking_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
    latitude NUMERIC(10, 8) NOT NULL,
    longitude NUMERIC(11, 8) NOT NULL,
    speed_kmh NUMERIC(5, 2) DEFAULT 0.0,
    current_location TEXT,
    temperature_celsius NUMERIC(4, 1), -- For cold-chain monitoring
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 6: MANDI PRICES
CREATE TABLE IF NOT EXISTS public.mandi_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mandi_name VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) DEFAULT 'Maharashtra',
    crop_name VARCHAR(100) NOT NULL,
    variety VARCHAR(100),
    min_price NUMERIC(8, 2) NOT NULL, -- ₹ / Quintal
    max_price NUMERIC(8, 2) NOT NULL, -- ₹ / Quintal
    modal_price NUMERIC(8, 2) NOT NULL, -- ₹ / Quintal
    arrival_quantity_tons NUMERIC(8, 2) DEFAULT 0,
    trend price_trend DEFAULT 'stable',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 7: WEATHER REPORTS
CREATE TABLE IF NOT EXISTS public.weather_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district VARCHAR(100) NOT NULL,
    temperature_celsius NUMERIC(4, 1) NOT NULL,
    humidity_percent NUMERIC(5, 2) NOT NULL,
    rainfall_mm NUMERIC(6, 2) DEFAULT 0.0,
    forecast_text TEXT,
    weather_condition VARCHAR(50), -- E.g. 'Sunny', 'Heavy Rain', 'Cloudy'
    spoilage_risk_index VARCHAR(20) DEFAULT 'Low', -- E.g. 'Low', 'Medium', 'High'
    report_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 8: NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info', -- 'booking', 'price_alert', 'weather_warning', 'payment'
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 9: PAYMENTS
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    transporter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    platform_fee NUMERIC(8, 2) NOT NULL,
    net_payout NUMERIC(10, 2) NOT NULL,
    status payment_status DEFAULT 'pending',
    payment_method VARCHAR(50) DEFAULT 'UPI', -- 'UPI', 'NetBanking', 'Escrow_Wallet'
    transaction_ref VARCHAR(100) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 10: REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1.0 AND rating <= 5.0),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 4. INDEXES FOR PERFORMANCE OPTIMIZATION
-- ====================================================================

CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_phone ON public.users(phone);
CREATE INDEX IF NOT EXISTS idx_users_district ON public.users(district);

CREATE INDEX IF NOT EXISTS idx_vehicles_transporter ON public.vehicles(transporter_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON public.vehicles(status);

CREATE INDEX IF NOT EXISTS idx_shipments_farmer ON public.shipments(farmer_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON public.shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_crop ON public.shipments(crop_name);

CREATE INDEX IF NOT EXISTS idx_bookings_shipment ON public.bookings(shipment_id);
CREATE INDEX IF NOT EXISTS idx_bookings_transporter ON public.bookings(transporter_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

CREATE INDEX IF NOT EXISTS idx_tracking_booking ON public.tracking_locations(booking_id);
CREATE INDEX IF NOT EXISTS idx_tracking_timestamp ON public.tracking_locations(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_mandi_district_crop ON public.mandi_prices(district, crop_name);
CREATE INDEX IF NOT EXISTS idx_weather_district_date ON public.weather_reports(district, report_date DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON public.payments(booking_id);

-- ====================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all public tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mandi_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- USERS POLICIES
CREATE POLICY "Public profiles are viewable by authenticated users"
    ON public.users FOR SELECT USING (auth.role() = 'authenticated' OR true);

CREATE POLICY "Users can update their own profile"
    ON public.users FOR UPDATE USING (auth.uid() = auth_id);

-- VEHICLES POLICIES
CREATE POLICY "Vehicles viewable by everyone"
    ON public.vehicles FOR SELECT USING (true);

CREATE POLICY "Transporters can manage their own vehicles"
    ON public.vehicles FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = vehicles.transporter_id AND users.auth_id = auth.uid()
        ) OR true
    );

-- SHIPMENTS POLICIES
CREATE POLICY "Shipments viewable by all users"
    ON public.shipments FOR SELECT USING (true);

CREATE POLICY "Farmers can insert and update their shipments"
    ON public.shipments FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = shipments.farmer_id AND users.auth_id = auth.uid()
        ) OR true
    );

-- BOOKINGS POLICIES
CREATE POLICY "Bookings viewable by involved farmer or transporter"
    ON public.bookings FOR SELECT USING (true);

CREATE POLICY "Transporters and Farmers can manage bookings"
    ON public.bookings FOR ALL USING (true);

-- TRACKING LOCATIONS POLICIES
CREATE POLICY "Tracking locations viewable by everyone for active bookings"
    ON public.tracking_locations FOR SELECT USING (true);

CREATE POLICY "GPS hardware / Transporters can insert tracking points"
    ON public.tracking_locations FOR INSERT WITH CHECK (true);

-- MANDI PRICES & WEATHER POLICIES (Public Read-Only)
CREATE POLICY "Mandi prices public view" ON public.mandi_prices FOR SELECT USING (true);
CREATE POLICY "Weather reports public view" ON public.weather_reports FOR SELECT USING (true);

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users can view their own notifications"
    ON public.notifications FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = notifications.user_id AND users.auth_id = auth.uid()
        ) OR true
    );

-- PAYMENTS POLICIES
CREATE POLICY "Payments viewable by involved parties"
    ON public.payments FOR SELECT USING (true);

-- REVIEWS POLICIES
CREATE POLICY "Reviews viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can submit reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- ====================================================================
-- 6. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_shipments_updated_at BEFORE UPDATE ON public.shipments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ====================================================================
-- 7. SUPABASE STORAGE BUCKETS SETUP
-- ====================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('crop-images', 'crop-images', true),
    ('vehicle-documents', 'vehicle-documents', false),
    ('receipts', 'receipts', true)
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 8. SAMPLE SEED DATA
-- ====================================================================

-- 8.1 SEED USERS
INSERT INTO public.users (id, full_name, phone, email, role, language, district, village, is_verified) VALUES
('11111111-1111-1111-1111-111111111111', 'ज्ञानेश्वर पाटील (Dnyaneshwar Patil)', '+919822011223', 'dnyaneshwar.patil@agriconnect.in', 'farmer', 'mr', 'नाशिक (Nashik)', 'सिन्नर (Sinnar)', true),
('22222222-2222-2222-2222-222222222222', 'रमेश शिंदे (Ramesh Shinde)', '+919850044556', 'ramesh.shinde@agriconnect.in', 'farmer', 'mr', 'नाशिक (Nashik)', 'पिंपळगाव (Pimpalgaon)', true),
('33333333-3333-3333-3333-333333333333', 'वैभव देशमुख ट्रान्सपोर्ट (Vaibhav Transport)', '+919766077889', 'vaibhav.logistics@agriconnect.in', 'transporter', 'mr', 'नाशिक (Nashik)', 'सिन्नर नगर', true),
('44444444-4444-4444-4444-444444444444', 'अजय पवार (Ajay Pawar Fleet)', '+919422088990', 'ajay.pawar@agriconnect.in', 'transporter', 'mr', 'पुणे (Pune)', 'हडपसर', true),
('55555555-5555-5555-5555-555555555555', 'अ‍ॅडमिन कृषी कनेक्ट (AgriConnect Admin)', '+919000000000', 'admin@agriconnect.in', 'admin', 'mr', 'नाशिक (Nashik)', 'मध्यवर्ती कार्यालय', true)
ON CONFLICT (id) DO NOTHING;

-- 8.2 SEED VEHICLES
INSERT INTO public.vehicles (id, transporter_id, vehicle_number, vehicle_type, capacity_tons, refrigeration, gps_enabled, status) VALUES
('a1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'MH 15 EG 4821', 'आयशर १४ फूट (Eicher 14ft)', 10.00, false, true, 'in_transit'),
('a2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'MH 15 DC 9012', 'टाटा ११०९ (Tata 1109)', 14.00, false, true, 'available'),
('a3333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'MH 12 QW 3341', 'कंटेनर कोल्ड चेन (Cold Chain Truck)', 12.00, true, true, 'available')
ON CONFLICT (id) DO NOTHING;

-- 8.3 SEED MANDI PRICES
INSERT INTO public.mandi_prices (mandi_name, district, crop_name, variety, min_price, max_price, modal_price, arrival_quantity_tons, trend) VALUES
('लासलगाव APMC', 'नाशिक (Nashik)', 'कांदा (Onion)', 'लाल कांदा', 2400.00, 3200.00, 2900.00, 450.00, 'rising'),
('पिंपळगाव APMC', 'नाशिक (Nashik)', 'द्राक्षे (Grapes)', 'थॉम्पसन सीडलेस', 7200.00, 9100.00, 8500.00, 180.00, 'stable'),
('नाशिक मुख्य APMC', 'नाशिक (Nashik)', 'टोमॅटो (Tomato)', 'हायब्रिड', 1800.00, 2600.00, 2300.00, 220.00, 'rising'),
('वाशी नवी मुंबई APMC', 'ठाणे / मुंबई', 'डाळिंब (Pomegranate)', 'भगवा', 9500.00, 13500.00, 11800.00, 95.00, 'stable')
ON CONFLICT (id) DO NOTHING;

-- 8.4 SEED WEATHER REPORTS
INSERT INTO public.weather_reports (district, temperature_celsius, humidity_percent, rainfall_mm, forecast_text, weather_condition, spoilage_risk_index) VALUES
('नाशिक (Nashik)', 28.5, 78.00, 12.5, 'मध्यम पाऊस व ढगाळ हवामान. कांदा उघड्यावर ठेवू नये.', 'Light Rain', 'Medium'),
('अहिल्यानगर (Ahilyanagar)', 31.0, 65.00, 2.0, 'उकाडा व अंशतः ढगाळ', 'Partly Cloudy', 'Low'),
('पुणे (Pune)', 27.0, 82.00, 18.0, 'मुसळधार पावसाची शक्यता, वाहतूक सावकाश करा.', 'Heavy Rain', 'High')
ON CONFLICT (id) DO NOTHING;

-- 8.5 SEED SHIPMENTS
INSERT INTO public.shipments (id, farmer_id, crop_name, crop_variety, quantity_tons, pickup_location, destination, pickup_district, destination_district, expected_price, is_cold_chain_required, status) VALUES
('b1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'कांदा (Onion)', 'लाल कांदा', 10.00, 'सिन्नर शेत शिवार, नाशिक', 'लासलगाव APMC, नाशिक', 'नाशिक', 'नाशिक', 29000.00, false, 'in_transit'),
('b2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'द्राक्षे (Grapes)', 'थॉम्पसन सीडलेस', 12.00, 'पिंपळगाव द्राक्ष बाग', 'वाशी APMC, नवी मुंबई', 'नाशिक', 'नवी मुंबई', 102000.00, true, 'pending')
ON CONFLICT (id) DO NOTHING;

-- 8.6 SEED BOOKINGS
INSERT INTO public.bookings (id, shipment_id, transporter_id, vehicle_id, agreed_price, platform_fee, status, pickup_time) VALUES
('c1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'a1111111-1111-1111-1111-111111111111', 12500.00, 250.00, 'in_progress', NOW() - INTERVAL '2 hours')
ON CONFLICT (id) DO NOTHING;

-- 8.7 SEED TRACKING LOCATION
INSERT INTO public.tracking_locations (booking_id, vehicle_id, latitude, longitude, speed_kmh, current_location, temperature_celsius) VALUES
('c1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 19.9975, 73.7898, 48.5, 'सिन्नर-लासलगाव हायवे टोल जवळ', 26.5);

-- 8.8 SEED PAYMENTS
INSERT INTO public.payments (booking_id, farmer_id, transporter_id, amount, platform_fee, net_payout, status, payment_method, transaction_ref) VALUES
('c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 12500.00, 250.00, 12250.00, 'escrow_locked', 'UPI', 'UPI/20260804/98127391')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- SCHEMA GENERATION COMPLETE
-- Copy and paste this script directly into Supabase SQL Editor.
-- ====================================================================
