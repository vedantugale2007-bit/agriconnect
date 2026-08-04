import React from 'react';
import {
  ShieldCheck,
  Truck,
  MapPin,
  Calendar,
  Sprout,
  Star,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronLeft,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { ScreenType, Transporter, ShipmentBooking } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface BookingReviewScreenProps {
  setCurrentScreen: (screen: ScreenType) => void;
  selectedTransporter: Transporter | null;
  selectedBooking: Partial<ShipmentBooking> | null;
  onProceedToCheckout: () => void;
}

export const BookingReviewScreen: React.FC<BookingReviewScreenProps> = ({
  setCurrentScreen,
  selectedTransporter,
  selectedBooking,
  onProceedToCheckout,
}) => {
  const { language, t, getCropName, getVehicleName } = useLanguage();

  const transporter = selectedTransporter || {
    id: 'tr-1',
    name: 'जय महाराष्ट्र लॉजिस्टिक (Jai Maharashtra Logistics)',
    rating: 4.9,
    reviewsCount: 184,
    verified: true,
    vehicleType: 'Eicher 14 ft',
    capacityTons: 10,
    ratePerTonMile: 45,
    location: 'नाशिक APMC',
    ecoScore: 'BS-VI Clean Diesel',
    completedTrips: 420,
    phone: '+91 98220 12345',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    availableDate: 'Today, 08:00 AM',
  };

  const cropName = selectedBooking?.cropType || 'Onion';
  const weight = selectedBooking?.weightKg || 10000;
  const pickup = selectedBooking?.pickupLocation || 'सिन्नर शेत गट क्र. ३, नाशिक';
  const dest = selectedBooking?.destinationLocation || 'लासलगाव APMC बाजार समिती';

  const baseFee = selectedBooking?.baseFee || 3200.00;
  const insuranceFee = selectedBooking?.insuranceFee || 150.00;
  const platformFee = selectedBooking?.platformFee || 100.00;
  const fuelOffset = selectedBooking?.fuelOffsetFee || 50.00;
  const total = baseFee + insuranceFee + platformFee + fuelOffset;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans max-w-5xl mx-auto space-y-8">
      
      {/* Back Button & Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
        <button
          onClick={() => setCurrentScreen('find-transport')}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            {language === 'mr' ? 'बुकिंग पुनरावलोकन आणि पुष्टीकरण' : 'Booking Review & Confirmation'}
          </h1>
          <p className="text-xs text-slate-400">
            {language === 'mr' ? 'अंतिम बुकिंग करण्यापूर्वी मालाची माहिती आणि ट्रान्सपोर्टरची खात्री करा' : 'Verify cargo specifications and carrier details before confirmation'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Primary Route Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              01. {language === 'mr' ? 'वाहतूक मार्ग' : 'Route Corridor'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('pickupLocation')}</span>
                <div className="text-xs font-bold text-white mt-0.5 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{pickup}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">{t('destinationLocation')}</span>
                <div className="text-xs font-bold text-white mt-0.5 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{dest}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-xs text-slate-400 pt-1">
              <span>{language === 'mr' ? 'नियोजित वेळ:' : 'Scheduled Pickup:'} <strong className="text-white">आज सकाळी ०८:००</strong></span>
              <span>{language === 'mr' ? 'अंदाजित वेळ:' : 'Estimated Travel:'} <strong className="text-emerald-400">१ तास ४५ मिनिटे (६५ किमी)</strong></span>
            </div>
          </div>

          {/* Cargo Specs */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400">
              02. {language === 'mr' ? 'शेतीमालाचा तपशील' : 'Cargo Specifications'}
            </h3>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('cropType')}</span>
                <span className="font-bold text-white mt-1 block">{getCropName(cropName)}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('weightKg')}</span>
                <span className="font-bold text-white mt-1 block">{(weight / 1000).toFixed(1)} टन ({weight.toLocaleString('en-IN')} किग्रा)</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('vehicleRequired')}</span>
                <span className="font-bold text-emerald-400 mt-1 block">{getVehicleName(transporter.vehicleType)}</span>
              </div>
            </div>
          </div>

          {/* Selected Transporter Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              03. {language === 'mr' ? 'निवडलेला ट्रान्सपोर्टर' : 'Selected Transporter'}
            </h3>

            <div className="flex items-center space-x-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <img
                src={transporter.avatar}
                alt={transporter.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-white">{transporter.name}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-400">
                  ★ {transporter.rating} रेटिंग • {transporter.completedTrips} फेऱ्या पूर्ण
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right 5 Cols: Payment Breakdown & Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <h3 className="text-base font-bold text-white font-display">
              {language === 'mr' ? 'भाडे आणि रक्कम तपशील' : 'Financial Summary'}
            </h3>

            <div className="space-y-3 text-xs text-slate-300 border-b border-slate-800 pb-4">
              <div className="flex justify-between">
                <span>{language === 'mr' ? 'मूलभूत ट्रान्सपोर्ट भाडे' : 'Base Freight Transport Fee'}</span>
                <span className="font-semibold text-white">₹ {baseFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'mr' ? 'पीक विमा संरक्षण (₹ २५,००० पर्यंत)' : 'Crop Insurance Cover'}</span>
                <span className="font-semibold text-white">₹ {insuranceFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'mr' ? 'AgriConnect प्लॅटफॉर्म शुल्क' : 'AgriConnect Platform Fee'}</span>
                <span className="font-semibold text-white">₹ {platformFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'mr' ? 'रस्ता आणि टोल कर' : 'Road & Toll Offset'}</span>
                <span className="font-semibold text-emerald-400">₹ {fuelOffset.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-lg font-black text-white font-display pt-1">
              <span>{t('totalPayable')}</span>
              <span className="text-emerald-400">₹ {total.toLocaleString('en-IN')}</span>
            </div>

            <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-2xl text-[11px] text-emerald-200/90 leading-snug flex items-start space-x-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{language === 'mr' ? 'तुमची रक्कम माल सुरक्षित पोहोचल्यावरच ट्रान्सपोर्टरला दिली जाईल.' : 'Funds held securely until delivery receipt is verified.'}</span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-sm hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
            >
              <span>{language === 'mr' ? 'सुरक्षित पेमेंट कडे जा' : 'Proceed to Instant Checkout'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

