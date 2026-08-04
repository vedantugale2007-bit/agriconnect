import React, { useState } from 'react';
import { ScreenType, UserRole, Transporter, ShipmentBooking, MandiPrice, Invoice } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { AssistantProvider } from './context/AssistantContext';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import {
  INITIAL_TRANSPORTERS,
  INITIAL_SHIPMENTS,
  INITIAL_MANDI_PRICES,
  INITIAL_INVOICES,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/screens/HomeScreen';
import { FarmerDashboard } from './components/screens/FarmerDashboard';
import { TransporterDashboard } from './components/screens/TransporterDashboard';
import { AdminDashboard } from './components/screens/AdminDashboard';
import { FindTransportersScreen } from './components/screens/FindTransportersScreen';
import { BookingReviewScreen } from './components/screens/BookingReviewScreen';
import { CheckoutScreen } from './components/screens/CheckoutScreen';
import { PaymentSuccessScreen } from './components/screens/PaymentSuccessScreen';
import { LiveTrackingScreen } from './components/screens/LiveTrackingScreen';
import { InvoicesScreen } from './components/screens/InvoicesScreen';

function MainContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [userRole, setUserRole] = useState<UserRole>('farmer');

  // Core Data State
  const [transporters, setTransporters] = useState<Transporter[]>(INITIAL_TRANSPORTERS);
  const [shipments, setShipments] = useState<ShipmentBooking[]>(INITIAL_SHIPMENTS);
  const [mandiPrices, setMandiPrices] = useState<MandiPrice[]>(INITIAL_MANDI_PRICES);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);

  // Selected Booking Flow State
  const [selectedTransporter, setSelectedTransporter] = useState<Transporter | null>(INITIAL_TRANSPORTERS[0]);
  const [selectedBooking, setSelectedBooking] = useState<Partial<ShipmentBooking> | null>({
    cropType: 'Onion',
    weightKg: 10000,
    pickupLocation: 'Sinnar Farm Gate 3, Nashik',
    destinationLocation: 'Lasalgaon APMC Market',
    baseFee: 3200,
    insuranceFee: 150,
    platformFee: 100,
    fuelOffsetFee: 50,
    totalFee: 3500,
  });

  const activeShipmentsCount = shipments.filter(
    (s) => s.status === 'IN_TRANSIT' || s.status === 'CONFIRMED'
  ).length;

  const handleSelectTransporterForBooking = (transporter: Transporter) => {
    setSelectedTransporter(transporter);
  };

  const handleSelectBookingForReview = (booking: Partial<ShipmentBooking>) => {
    setSelectedBooking((prev) => ({ ...prev, ...booking }));
  };

  const handlePaymentSuccess = () => {
    // Append new confirmed shipment to active list
    const newShipment: ShipmentBooking = {
      id: `ship-${Date.now()}`,
      bookingNumber: `AC-${Math.floor(1000 + Math.random() * 9000)}-MH15`,
      farmerName: 'Shankar Patil',
      farmerPhone: '+91 98221 11002',
      cropType: (selectedBooking?.cropType as any) || 'Onion',
      weightKg: selectedBooking?.weightKg || 10000,
      pickupLocation: selectedBooking?.pickupLocation || 'Sinnar Farm Gate 3, Nashik',
      destinationLocation: selectedBooking?.destinationLocation || 'Lasalgaon APMC Market',
      pickupDate: 'Today 08:00 AM',
      vehicleType: selectedTransporter?.vehicleType || 'Eicher 14 ft',
      transporter: selectedTransporter || INITIAL_TRANSPORTERS[0],
      driverName: 'Dnyaneshwar Shinde',
      driverPhone: '+91 98901 23456',
      vehicleNumber: 'MH 15 EG 4821',
      status: 'IN_TRANSIT',
      baseFee: selectedBooking?.baseFee || 3200,
      insuranceFee: 150,
      platformFee: 100,
      fuelOffsetFee: 50,
      totalFee: selectedBooking?.totalFee || 3500,
      createdAt: new Date().toISOString(),
      estimatedHours: 2.0,
      temperatureCelsius: 22.0,
      humidityPercent: 58,
    };

    setShipments([newShipment, ...shipments]);

    // Add new invoice
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-MH-2025-${Math.floor(100 + Math.random() * 900)}`,
      date: 'Today',
      dueDate: '7 Days',
      farmerName: 'Shankar Patil (Sinnar Farmers Producer Co.)',
      farmerAddress: 'Gat No. 142, Sinnar-Shirdi Road, Sinnar, Nashik, MH 422103',
      transporterName: selectedTransporter?.name || 'Sahyadri Kisan Logistics',
      transporterAddress: 'Panchavati MIDC, Nashik, MH 422003',
      items: [
        {
          description: `Freight charge (${(newShipment.weightKg / 1000).toFixed(1)} T, ${newShipment.pickupLocation} to ${newShipment.destinationLocation})`,
          quantity: newShipment.weightKg / 1000,
          rate: 320,
          amount: newShipment.baseFee,
        },
        { description: 'Crop transit insurance cover', quantity: 1, rate: 150, amount: 150 },
        { description: 'AgriConnect digital service fee', quantity: 1, rate: 100, amount: 100 },
      ],
      subtotal: newShipment.totalFee,
      taxGst: Math.round(newShipment.totalFee * 0.05),
      platformFee: 100,
      totalAmount: Math.round(newShipment.totalFee * 1.05),
      status: 'PAID',
      paymentMethod: 'UPI / PhonePe Instant (Ref #UPI-MH-99821)',
      gstinFarmer: '27AABCS1234F1Z1',
      gstinTransporter: '27AABCT5678G2Z3',
      hsnSacCode: '996511',
    };

    setInvoices([newInvoice, ...invoices]);
    setCurrentScreen('payment-success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Global Navbar */}
      <Navbar
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        userRole={userRole}
        setUserRole={setUserRole}
        activeShipmentsCount={activeShipmentsCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen setCurrentScreen={setCurrentScreen} />
        )}

        {currentScreen === 'farmer-dashboard' && (
          <FarmerDashboard
            setCurrentScreen={setCurrentScreen}
            shipments={shipments}
            setShipments={setShipments}
            mandiPrices={mandiPrices}
            onSelectBookingForReview={handleSelectBookingForReview}
          />
        )}

        {currentScreen === 'transporter-dashboard' && (
          <TransporterDashboard
            setCurrentScreen={setCurrentScreen}
            shipments={shipments}
            onSelectBookingForReview={handleSelectBookingForReview}
          />
        )}

        {currentScreen === 'admin-dashboard' && (
          <AdminDashboard setCurrentScreen={setCurrentScreen} />
        )}

        {currentScreen === 'find-transport' && (
          <FindTransportersScreen
            setCurrentScreen={setCurrentScreen}
            transporters={transporters}
            onSelectTransporterForBooking={handleSelectTransporterForBooking}
          />
        )}

        {currentScreen === 'booking-review' && (
          <BookingReviewScreen
            setCurrentScreen={setCurrentScreen}
            selectedTransporter={selectedTransporter}
            selectedBooking={selectedBooking}
            onProceedToCheckout={() => setCurrentScreen('checkout')}
          />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutScreen
            setCurrentScreen={setCurrentScreen}
            onPaymentSuccess={handlePaymentSuccess}
            totalAmount={selectedBooking?.totalFee || 3500}
          />
        )}

        {currentScreen === 'payment-success' && (
          <PaymentSuccessScreen setCurrentScreen={setCurrentScreen} />
        )}

        {currentScreen === 'live-tracking' && (
          <LiveTrackingScreen
            setCurrentScreen={setCurrentScreen}
            shipment={shipments[0]}
          />
        )}

        {currentScreen === 'invoices' && (
          <InvoicesScreen
            setCurrentScreen={setCurrentScreen}
            invoices={invoices}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer setCurrentScreen={setCurrentScreen} />

      {/* Global Floating AI Assistant */}
      <AIAssistantWidget />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AssistantProvider>
        <MainContent />
      </AssistantProvider>
    </LanguageProvider>
  );
}

