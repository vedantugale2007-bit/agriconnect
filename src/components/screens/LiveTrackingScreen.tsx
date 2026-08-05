import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Thermometer,
  ShieldCheck,
  Phone,
  MessageSquare,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Maximize2,
  RefreshCw,
  ChevronLeft,
  X,
  Share2,
  Navigation,
  Compass,
} from 'lucide-react';
import { ScreenType, ShipmentBooking } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { GoogleMapComponent } from '../GoogleMapComponent';
import { getCurrentGpsPosition, generateShareableTrackingUrl, LiveLocationData } from '../../utils/gpsTracking';
import { sendBrowserNotification, requestNotificationPermission } from '../../utils/notifications';

interface LiveTrackingScreenProps {
  setCurrentScreen: (screen: ScreenType) => void;
  shipment?: ShipmentBooking;
}

export const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({
  setCurrentScreen,
  shipment,
}) => {
  const { language, t, getCropName, getVehicleName } = useLanguage();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [simulatedBreach, setSimulatedBreach] = useState(false);
  const [updatingGps, setUpdatingGps] = useState(false);
  const [liveGps, setLiveGps] = useState<LiveLocationData | null>(null);

  const booking = shipment || {
    id: 'ship-1',
    bookingNumber: 'AC-8842-MH15',
    farmerName: 'शंकर पाटील (Shankar Patil)',
    farmerPhone: '+91 98220 11223',
    cropType: 'Onion',
    weightKg: 10000,
    pickupLocation: 'सिन्नर शेत गट क्र. ३, नाशिक',
    destinationLocation: 'लासलगाव APMC बाजार समिती',
    pickupDate: 'Today 08:00 AM',
    vehicleType: 'Eicher 14 ft',
    driverName: 'ज्ञानेश्वर शिंदे (Dnyaneshwar Shinde)',
    driverPhone: '+91 98901 23456',
    vehicleNumber: 'MH 15 EG 4821',
    status: 'IN_TRANSIT',
    baseFee: 3200.00,
    insuranceFee: 150.00,
    platformFee: 100.00,
    fuelOffsetFee: 50.00,
    totalFee: 3500.00,
    createdAt: '2025-10-23',
    estimatedHours: 1.75,
    temperatureCelsius: simulatedBreach ? 38.5 : 28.2,
    humidityPercent: 55,
  };

  const handleRefreshGps = async () => {
    setUpdatingGps(true);
    try {
      const pos = await getCurrentGpsPosition();
      setLiveGps(pos);
      await requestNotificationPermission();
      sendBrowserNotification(
        'GPS स्थान अद्ययावत!',
        `वाहनाची सद्यस्थिती: ${pos.speedKmH} किमी/तास वेग @ ${pos.lastUpdatedTime}`
      );
    } catch (e) {
      console.warn('GPS update error:', e);
    } finally {
      setUpdatingGps(false);
    }
  };

  const handleShareTracking = () => {
    const url = generateShareableTrackingUrl(booking.bookingNumber);
    if (navigator.share) {
      navigator.share({
        title: `AgriConnect Live Track: ${booking.bookingNumber}`,
        text: `माझ्या कांदा वाहतुकीचे (MH 15 EG 4821) थेट स्थान पाहा:`,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert(language === 'mr' ? 'थेट ट्रॅकिंग लिंक कॉपी केली आहे!' : 'Tracking link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentScreen('farmer-dashboard')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-white font-display">
                {t('liveTracking')} • #{booking.bookingNumber}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{language === 'mr' ? 'थेट GPS ट्रॅकिंग' : 'LIVE SENSOR STREAM'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {booking.pickupLocation} → {booking.destinationLocation}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefreshGps}
            disabled={updatingGps}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center space-x-1"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${updatingGps ? 'animate-spin' : ''}`} />
            <span>{updatingGps ? 'अपडेट होत आहे...' : 'GPS अपडेट करा'}</span>
          </button>

          <button
            onClick={handleShareTracking}
            className="px-3 py-1.5 rounded-xl bg-teal-950 border border-teal-800 text-teal-300 hover:bg-teal-900 text-xs font-bold transition-all cursor-pointer flex items-center space-x-1"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'शेअर लिंक' : 'Share Link'}</span>
          </button>

          <button
            onClick={() => setSimulatedBreach(!simulatedBreach)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              simulatedBreach
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {simulatedBreach ? 'तापमान इशारा बंद' : 'तापमान अलार्म चाचणी'}
          </button>

          <a
            href={`tel:${booking.driverPhone}`}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t('callDriver')}</span>
          </a>
        </div>
      </div>

      {/* Spoilage Alert Banner if breached */}
      {simulatedBreach && (
        <div className="p-4 bg-rose-500/20 border border-rose-500/40 rounded-2xl text-xs text-rose-200 font-bold flex items-center justify-between animate-bounce">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <div>
              <span className="text-sm font-extrabold text-white">तापमान वाढण्याचा धोका इशारा!</span>
              <p className="text-[11px] font-normal text-rose-200/90">
                गाडीतील आतील तापमान ३८.५°C वर पोहोचले आहे. ड्रायव्हरला ताडपत्री उघडून हवा खेळती ठेवण्याचा संदेश पाठवला आहे.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSimulatedBreach(false)}
            className="px-3 py-1 rounded-lg bg-rose-950 border border-rose-800 text-rose-200 text-[10px]"
          >
            बंद करा
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Google Maps Live Tracking View */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-sm font-bold text-white">{booking.driverName} ({booking.vehicleNumber})</div>
                  <div className="text-xs text-slate-400">{getVehicleName(booking.vehicleType)} • {t('inTransit')}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400">अंदाजित आगमन वेळ</div>
                <div className="text-sm font-black text-amber-300">सकाळी १०:४५</div>
              </div>
            </div>

            {/* Google Map Integration */}
            <GoogleMapComponent
              pickupLat={19.845}
              pickupLng={74.02}
              destinationLat={20.08}
              destinationLng={74.52}
              vehicleLat={liveGps?.lat || 19.92}
              vehicleLng={liveGps?.lng || 74.25}
              pickupTitle={booking.pickupLocation}
              destinationTitle={booking.destinationLocation}
              vehicleTitle={`${booking.vehicleNumber} (${booking.driverName})`}
              height="380px"
            />
          </div>
        </div>

        {/* Right 4 Cols: Telemetry Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-emerald-400" />
              <span>हवामान आणि IoT सेन्सर</span>
            </h3>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">वाहनातील तापमान</span>
                <span className={`text-base font-extrabold ${simulatedBreach ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {booking.temperatureCelsius}°C
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-1 border-t border-slate-900">
                <span>आद्रता</span>
                <span className="font-bold text-white">{booking.humidityPercent}%</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400 font-bold">थेट टेलिमेट्री (Live Telemetry):</div>
              <div className="flex justify-between">
                <span className="text-slate-500">वाहतूक वेग:</span>
                <span className="text-emerald-400 font-bold">{liveGps?.speedKmH || 55} किमी/तास</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">बाकी अंतर:</span>
                <span className="text-amber-300 font-bold">२३ किमी बाकी</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">शेवटचा GPS अपडेट:</span>
                <span className="text-slate-300 font-medium">{liveGps?.lastUpdatedTime || 'आत्ताच (Just now)'}</span>
              </div>
            </div>

            <a
              href={`tel:${booking.driverPhone}`}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>{t('callDriver')} ({booking.driverPhone})</span>
            </a>
          </div>
        </div>
      </div>

      {/* Progress Steps Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-extrabold uppercase text-slate-400">
          {language === 'mr' ? 'वाहतूक टप्पे व सद्यस्थिती (Supply Chain Milestones)' : 'Supply Chain Milestones'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-2xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="font-bold text-white block">{language === 'mr' ? 'लोड पोस्ट केले' : 'Load Posted'}</span>
            <span className="text-[10px] text-slate-400">आज, स. ०७:००</span>
          </div>

          <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-2xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="font-bold text-white block">{language === 'mr' ? 'गाडी जुळली' : 'Transporter Matched'}</span>
            <span className="text-[10px] text-slate-400">जय महाराष्ट्र ट्रान्सपोर्ट</span>
          </div>

          <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-2xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="font-bold text-white block">{language === 'mr' ? 'माल भरला' : 'Cargo Loaded'}</span>
            <span className="text-[10px] text-slate-400">आज, स. ०८:१५</span>
          </div>

          <div className="p-3 bg-teal-950/80 border border-teal-500/50 rounded-2xl shadow-lg ring-2 ring-teal-500/30">
            <Truck className="w-4 h-4 text-teal-400 mx-auto mb-1 animate-pulse" />
            <span className="font-extrabold text-teal-300 block">{language === 'mr' ? 'मार्गस्थ' : 'In-Transit'}</span>
            <span className="text-[10px] text-teal-400 font-medium">नाशिक - पुणे NH-60</span>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl opacity-60">
            <Clock className="w-4 h-4 text-slate-500 mx-auto mb-1" />
            <span className="font-bold text-slate-400 block">{language === 'mr' ? 'गंतव्य पोहोचणे' : 'Pending Delivery'}</span>
            <span className="text-[10px] text-slate-500">अंदाजित स. १०:४५</span>
          </div>
        </div>
      </div>

      {/* Driver Contact Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-800 rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl relative text-center">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-700 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
              DS
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-display">{booking.driverName}</h3>
              <p className="text-xs text-slate-400">जय महाराष्ट्र ट्रान्सपोर्ट लॉजिस्टिक्स • {booking.vehicleNumber}</p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`tel:${booking.driverPhone}`}
                className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>{t('callDriver')} ({booking.driverPhone})</span>
              </a>

              <button
                onClick={() => {
                  alert(language === 'mr' ? 'ड्रायव्हरला तातडीचा SMS संदेश पाठवला आहे.' : 'SMS alert sent to driver.');
                  setContactModalOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800 cursor-pointer"
              >
                {language === 'mr' ? 'SMS संदेश पाठवा' : 'Send SMS Alert'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
