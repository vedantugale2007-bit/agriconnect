import React, { useState } from 'react';
import {
  Truck,
  TrendingUp,
  Leaf,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Bot,
  AlertCircle,
  Plus,
  BatteryCharging,
  Fuel,
  ArrowRight,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import { ScreenType, ShipmentBooking, Transporter } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface TransporterDashboardProps {
  setCurrentScreen: (screen: ScreenType) => void;
  shipments: ShipmentBooking[];
  onSelectBookingForReview: (booking: Partial<ShipmentBooking>) => void;
}

export const TransporterDashboard: React.FC<TransporterDashboardProps> = ({
  setCurrentScreen,
  shipments,
  onSelectBookingForReview,
}) => {
  const { language, t, getCropName, getVehicleName } = useLanguage();
  const [publishedRouteSuccess, setPublishedRouteSuccess] = useState(false);

  // Publish capacity form state
  const [departure, setDeparture] = useState('सिन्नर ट्रान्सपोर्ट नगर, नाशिक');
  const [destination, setDestination] = useState('लासलगाव APMC, नाशिक');
  const [date, setDate] = useState('आज दुपारी २:००');
  const [availableTons, setAvailableTons] = useState(14);

  const handlePublishCapacity = (e: React.FormEvent) => {
    e.preventDefault();
    setPublishedRouteSuccess(true);
    setTimeout(() => setPublishedRouteSuccess(false), 4000);
  };

  const nearbyLoadRequests = [
    {
      id: 'load-1',
      crop: 'Fresh Tomatoes',
      farmer: 'सुनिता जाधव (सिन्नर शेतकरी क्लब)',
      origin: 'सिन्नर फाटा, नाशिक',
      destination: 'वाशी APMC मार्केट, नवी मुंबई',
      weight: '१२ टन',
      payout: '₹ ११,५००',
      urgent: true,
      distance: '१८० किमी',
    },
    {
      id: 'load-2',
      crop: 'Export Grapes',
      farmer: 'रमेश शिंदे (निफाड बागायतदार)',
      origin: 'पिंपळगाव बसवंत, नाशिक',
      destination: 'जेएनपीटी पोर्ट (JNPT Port), उरण',
      weight: '१८.५ टन',
      payout: '₹ २५,५००',
      urgent: false,
      distance: '२१० किमी',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
              <Truck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {t('transporterDashboard')}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            जय महाराष्ट्र लॉजिस्टिक आणि ट्रान्सपोर्ट • नोंदणीकृत क्र. MH-15-2024
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{language === 'mr' ? '०४ ट्रक उपलब्ध' : '04 Trucks Available Nearby'}</span>
          </span>
        </div>
      </div>

      {/* Top Banner Bento: Earnings & Carbon Savings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Earnings Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 relative overflow-hidden shadow-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>{t('totalEarnings')}</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white font-display">₹ ४,२८,०५०</div>
          <div className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
            <span>+१२.५% मागील आठवड्यापेक्षा जास्त</span>
          </div>
        </div>

        {/* Carbon Savings AI Card */}
        <div className="bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-800 p-6 rounded-3xl space-y-3 relative overflow-hidden shadow-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-emerald-300">
            <span className="flex items-center space-x-1">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>इंधन व CO2 बचत</span>
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-300 font-display">२,४१० किग्रॅ CO2</div>
          <div className="text-xs text-emerald-400/90 font-medium">
            १०/१० इको ट्रिप मॅचिंग सक्रिय
          </div>
        </div>

        {/* Fleet Utilization */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 relative overflow-hidden shadow-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>गाड्यांचा वापर दर</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300 font-display">८८.५%</div>
          <div className="text-xs text-amber-400/90 font-medium">
            ०२ परतीचे भाडे AgriConnect वरून जुळले
          </div>
        </div>

      </div>

      {/* Main Grid: Nearby Load Requests & Publish Capacity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Nearby Load Requests */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>{language === 'mr' ? 'जवळपासच्या उपलब्ध लोड मागण्या' : 'Nearby Open Load Requests'}</span>
            </h3>
            <span className="text-xs text-slate-400">तुरुंत मॅच</span>
          </div>

          <div className="space-y-4">
            {nearbyLoadRequests.map((req) => (
              <div
                key={req.id}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-700/60 p-5 rounded-3xl space-y-4 transition-all shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white">{req.crop}</span>
                        {req.urgent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            तातडीचे पिकअप
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">{req.farmer}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-400 font-display">{req.payout}</div>
                    <div className="text-[10px] text-slate-400">{req.distance}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">पिकअप स्थान</span>
                    <span className="font-semibold">{req.origin}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">गंतव्य</span>
                    <span className="font-semibold">{req.destination}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs font-bold text-teal-300">वजन: {req.weight}</div>
                  <button
                    onClick={() => {
                      onSelectBookingForReview({
                        cropType: req.crop as any,
                        pickupLocation: req.origin,
                        destinationLocation: req.destination,
                        totalFee: 11500,
                      });
                      setCurrentScreen('booking-review');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer shadow-md flex items-center space-x-1"
                  >
                    <span>भाडे स्वीकारा</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI Route Recommendation Banner */}
          <div className="bg-gradient-to-r from-teal-950 to-slate-900 border border-teal-800/60 p-5 rounded-3xl space-y-3">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-teal-400" />
              <h4 className="text-sm font-bold text-white font-display">AI बुद्धिमत्ता मार्ग सुचवणी</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-teal-300">नाशिक - मुंबई महामार्ग (NH-60)</strong> वर पडघा टोल नाक्याजवळ ट्रॅफिक कमी असून इंधन बचत १४% जास्त आहे.
            </p>
          </div>

        </div>

        {/* Right 5 Cols: Publish Route Form & Fleet Status */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Publish Capacity Form */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white font-display">{language === 'mr' ? 'खाली गाडीची माहिती टाका' : 'Publish Available Capacity'}</h3>
            </div>
            <p className="text-xs text-slate-400">रिकामी गाडी न नेता परतीचे भाडे मिळवा</p>

            {publishedRouteSuccess && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>तुमची रिकामी गाडी परिसरातील शेतकऱ्यांना दिसेल!</span>
              </div>
            )}

            <form onSubmit={handlePublishCapacity} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-300 uppercase">निघण्याचे ठिकाण</label>
                <input
                  type="text"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-300 uppercase">गंतव्य ठिकाण</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-300 uppercase">तारीख व वेळ</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-300 uppercase">क्षमता (टन)</label>
                  <input
                    type="number"
                    value={availableTons}
                    onChange={(e) => setAvailableTons(Number(e.target.value))}
                    className="w-full mt-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all cursor-pointer shadow-lg"
              >
                रिकामी गाडी पोस्ट करा
              </button>
            </form>
          </div>

          {/* Fleet Status Gauges */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white font-display">वाहनांची सध्याची स्थिती</h3>

            <div className="space-y-3">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">ट्रक #MH15-EG-4821 (आइशर १४ फूट)</span>
                  <span className="text-emerald-400 font-bold">८५% भरलेला</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[85%]" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>लासलगाव कडे मार्गस्थ</span>
                  <span>तापमान: २८.२°C</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">ट्रक #MH15-FV-9011 (टाटा 407)</span>
                  <span className="text-teal-400 font-bold">उपलब्ध</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-400 w-[100%]" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>सिन्नर यार्ड येथे उभा</span>
                  <span>इंधन: ९०%</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

