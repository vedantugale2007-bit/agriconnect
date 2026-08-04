import React, { useState } from 'react';
import {
  Sprout,
  Plus,
  Truck,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Thermometer,
  ShieldAlert,
  Bot,
  MapPin,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Search,
  Sparkles,
  ArrowRight,
  Sun,
  CloudRain,
  Phone,
  X,
} from 'lucide-react';
import { ScreenType, ShipmentBooking, MandiPrice, LossPredictionResult, CargoType, VehicleType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface FarmerDashboardProps {
  setCurrentScreen: (screen: ScreenType) => void;
  shipments: ShipmentBooking[];
  setShipments: React.Dispatch<React.SetStateAction<ShipmentBooking[]>>;
  mandiPrices: MandiPrice[];
  onSelectBookingForReview: (booking: Partial<ShipmentBooking>) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  setCurrentScreen,
  shipments,
  setShipments,
  mandiPrices,
  onSelectBookingForReview,
}) => {
  const { language, t, getCropName, getVehicleName, getMarketName } = useLanguage();
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [estimatingLoss, setEstimatingLoss] = useState(false);

  // New Load Form State
  const [cropType, setCropType] = useState<CargoType>('Onion');
  const [weightKg, setWeightKg] = useState<number>(10000);
  const [pickup, setPickup] = useState<string>('सिन्नर शेत गट क्र. ३, नाशिक');
  const [destination, setDestination] = useState<string>('लासलगाव APMC बाजार समिती');
  const [vehicleType, setVehicleType] = useState<VehicleType>('Eicher 14 ft');

  // AI Loss Estimator State
  const [lossResult, setLossResult] = useState<LossPredictionResult>({
    riskLevel: 'LOW',
    riskPercentage: 2.8,
    shelfLifeHours: 72,
    recommendedDepartureWindow: language === 'mr' ? 'सकाळी ०७:०० पूर्वी गाडी रवाना करा (दुपारचे ऊन टाळण्यासाठी)' : language === 'hi' ? 'सुबह 07:00 बजे से पहले वाहन रवाना करें' : 'Departure before 07:00 AM (To avoid peak afternoon heat)',
    spoilageFactor: language === 'mr' ? 'कांद्याची हवा खेळती राहण्यासाठी ताडपत्री योग्य रीतीने बांधा' : 'Ensure proper ventilation for Onion sacks during transit',
    actionableInsights: [
      language === 'mr' ? 'सिन्नर-लासलगाव मार्गावर पिंपळगाव फाट्याऐवजी बायपास वापरा.' : 'Use Sinnar-Lasalgaon bypass road to avoid 20-min traffic at Pimpalgaon.',
      language === 'mr' ? 'कांदा गोण्यांमध्ये हवा खेळती राहण्यासाठी व्हेंटिलेटेड गाडी वापरा.' : 'Ensure ventilated open/mesh body truck for dry onion loads.',
      language === 'mr' ? 'स्थानिक हवामान अंदाज: दुपारी ३४° सेल्सिअस तापमान असण्याची शक्यता.' : 'Forecast: Ambient temp 34°C at noon.',
    ],
  });

  // Calculate live statistics
  const totalBookingsCount = shipments.length + 18;
  const activeLoadsCount = shipments.filter((s) => s.status === 'IN_TRANSIT' || s.status === 'CONFIRMED').length;
  const activeShipment = shipments.find((s) => s.status === 'IN_TRANSIT') || shipments[0];

  const handleRunAiLossEstimator = async () => {
    setEstimatingLoss(true);
    try {
      const response = await fetch('/api/gemini/loss-estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: cropType,
          weightTons: weightKg / 1000,
          distanceMiles: 65,
          ambientTempC: 34,
          vehicleType,
        }),
      });
      const data = await response.json();
      if (data && data.riskLevel) {
        setLossResult(data);
      }
    } catch (err) {
      console.error('Loss estimator error:', err);
    } finally {
      setEstimatingLoss(false);
    }
  };

  const handleCreateNewLoad = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Partial<ShipmentBooking> = {
      cropType,
      weightKg,
      pickupLocation: pickup,
      destinationLocation: destination,
      vehicleType,
      pickupDate: 'Today 08:00 AM',
      baseFee: Math.round((weightKg / 1000) * 320),
      insuranceFee: 150.00,
      platformFee: 100.00,
      fuelOffsetFee: 50.00,
      totalFee: Math.round((weightKg / 1000) * 320) + 300,
    };
    setPostModalOpen(false);
    onSelectBookingForReview(newBooking);
    setCurrentScreen('find-transport');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans space-y-8">
      
      {/* Top Banner / Command Center Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sprout className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {t('farmerPortal')}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            शंकर पाटील (Shankar Patil) • सिन्नर-निफाड कृषी पट्टा, नाशिक जिल्हा
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPostModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs hover:from-emerald-400 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t('postNewLoad')}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('find-transport')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition-all cursor-pointer flex items-center space-x-2"
          >
            <Search className="w-3.5 h-3.5 text-teal-400" />
            <span>{t('searchTransporters')}</span>
          </button>
        </div>
      </div>

      {/* Bento Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat 1 */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>{t('totalBookings')}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white font-display">{totalBookingsCount}</div>
          <div className="text-[11px] text-emerald-400 font-medium flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>{language === 'mr' ? '+१८% हंगामी वाढ' : '+18% Season Growth'}</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>{t('activeShipments')}</span>
            <Truck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-black text-teal-300 font-display">
            0{activeLoadsCount}
          </div>
          <div className="text-[11px] text-teal-400 font-medium">{language === 'mr' ? 'थेट GPS सुरू आहे' : 'GPS Telemetry Active'}</div>
        </div>

        {/* Stat 3 */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>{language === 'mr' ? 'बचत झालेला खर्च' : 'Saved Crop Loss'}</span>
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-display">₹ १८,४००</div>
          <div className="text-[11px] text-emerald-400 font-medium">{language === 'mr' ? 'Gemini AI द्वारे वेळेचे नियोजन' : 'Via Gemini AI Timing'}</div>
        </div>

        {/* Stat 4 */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>{language === 'mr' ? 'बाजार समित्या' : 'APMC Mandis'}</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300 font-display">०६ APMC</div>
          <div className="text-[11px] text-amber-400/80 font-medium">{language === 'mr' ? 'लासलगाव, नाशिक, पिंपळगाव' : 'Lasalgaon, Nashik, Pimpalgaon'}</div>
        </div>

      </div>

      {/* Main Grid: Live Tracking & Mandi Prices & AI Loss Estimator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Live Tracking Widget & Mandi Prices */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Shipment Tracker Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 relative overflow-hidden shadow-xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-white font-display">
                      {language === 'mr' ? 'थेट वाहतूक' : 'Live Shipment'} #{activeShipment?.bookingNumber || 'AC-8842-MH15'}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {t('inTransit')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {activeShipment?.pickupLocation} → {activeShipment?.destinationLocation}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen('live-tracking')}
                className="px-3.5 py-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs font-bold hover:bg-emerald-900 transition-all cursor-pointer flex items-center space-x-1"
              >
                <span>{t('liveTracking')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Simulated Live Route Map Graphic */}
            <div className="relative h-48 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#052e16_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              
              {/* Route line */}
              <div className="relative z-10 my-auto px-4">
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>सिन्नर (प्रारंभ)</span>
                  </span>
                  <span className="text-slate-400">निफाड हायवे (MH SH-30)</span>
                  <span className="flex items-center space-x-1 text-amber-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>लासलगाव APMC (गंतव्य)</span>
                  </span>
                </div>

                <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full w-[65%]" />
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-medium">
                  <span>रवाना: सकाळी ०८:००</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    वाहन MH 15 EG 4821 @ ५५ किमी/तास
                  </span>
                  <span>अंदाजित आगमन: सकाळी १०:४५</span>
                </div>
              </div>

              {/* Bottom Driver Bar */}
              <div className="relative z-10 flex items-center justify-between bg-slate-900/90 p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-xs text-white">
                    DS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{activeShipment?.driverName || 'ज्ञानेश्वर शिंदे'}</div>
                    <div className="text-[10px] text-slate-400">जय महाराष्ट्र ट्रान्सपोर्ट • आयशर १४ फूट (MH 15 EG 4821)</div>
                  </div>
                </div>

                <a
                  href={`tel:${activeShipment?.driverPhone || '+919890123456'}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition-all flex items-center space-x-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>{t('callDriver')}</span>
                </a>
              </div>

            </div>

          </div>

          {/* Mandi Market Prices Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <span>{t('mandiPrices')}</span>
                </h3>
                <p className="text-xs text-slate-400">{t('mandiSubtitle')}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {t('liveSync')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mandiPrices.map((m) => (
                <div key={m.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-emerald-800 transition-all space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-extrabold text-white">{getCropName(m.cropName)}</div>
                      <div className="text-[10px] text-slate-400 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{getMarketName(m.mandiName)} ({m.district})</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                      m.trend === 'UP' ? 'bg-emerald-500/20 text-emerald-400' : m.trend === 'DOWN' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {m.trend === 'UP' ? <TrendingUp className="w-3 h-3" /> : m.trend === 'DOWN' ? <TrendingDown className="w-3 h-3" /> : null}
                      <span>{m.changePercent > 0 ? `+${m.changePercent}%` : `${m.changePercent}%`}</span>
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1 border-t border-slate-900">
                    <span className="text-xl font-black text-amber-300 font-display">₹ {m.pricePerQuintal.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-slate-400">/ क्विंटल</span></span>
                    <span className="text-[9px] text-slate-500">{m.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 4 Cols: AI Crop Loss Estimator Widget */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-900 border border-emerald-800/80 rounded-3xl p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white font-display">{t('lossEstimator')}</h3>
                <p className="text-[10px] text-emerald-300/80">{t('geminiPowered')}</p>
              </div>
            </div>

            {/* Config inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">{t('cropType')}</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value as CargoType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:border-emerald-500 outline-none"
                >
                  <option value="Onion">कांदा (Onion)</option>
                  <option value="Grapes">द्राक्षे (Grapes)</option>
                  <option value="Tomato">टोमॅटो (Tomato)</option>
                  <option value="Pomegranate">डाळिंब (Pomegranate)</option>
                  <option value="Sugarcane">ऊस (Sugarcane)</option>
                  <option value="Soybean">सोयाबीन (Soybean)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">{t('weightKg')} (किग्रा)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:border-emerald-500 outline-none"
                />
              </div>

              <button
                onClick={handleRunAiLossEstimator}
                disabled={estimatingLoss}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                {estimatingLoss ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-200" />
                    <span>विश्लेषण सुरू आहे...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{t('calculateRisk')}</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Result Card */}
            {lossResult && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{t('spoilageRisk')}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    lossResult.riskLevel === 'LOW' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {lossResult.riskLevel} ({lossResult.riskPercentage}%)
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-[11px] text-slate-300 leading-snug">
                  <div className="font-bold text-emerald-300 mb-0.5">रवाना होण्याची योग्य वेळ:</div>
                  {lossResult.recommendedDepartureWindow}
                </div>

                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-bold text-slate-400">AI शिफारसी:</div>
                  {lossResult.actionableInsights.map((insight, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5 text-[10px] text-slate-300 leading-tight">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Post Load Modal */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-800 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <span>{t('postNewLoad')}</span>
              </h3>
              <button
                onClick={() => setPostModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewLoad} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">{t('cropType')}</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value as CargoType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500 font-semibold"
                >
                  <option value="Onion">कांदा (Onion)</option>
                  <option value="Grapes">द्राक्षे (Grapes)</option>
                  <option value="Tomato">टोमॅटो (Tomato)</option>
                  <option value="Pomegranate">डाळिंब (Pomegranate)</option>
                  <option value="Sugarcane">ऊस (Sugarcane)</option>
                  <option value="Soybean">सोयाबीन (Soybean)</option>
                  <option value="Wheat">गहू (Wheat)</option>
                  <option value="Maize">मका (Maize)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">{t('weightKg')} (किग्रा)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">{t('vehicleRequired')}</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500 font-semibold"
                  >
                    <option value="Tata Ace Gold">टाटा एस (Tata Ace)</option>
                    <option value="Mahindra Bolero Pickup">बोलेरो पिकअप (Bolero Pickup)</option>
                    <option value="Eicher 14 ft">आयशर १४ फूट (Eicher 14 ft)</option>
                    <option value="Tata 1109 Open Truck">टाटा ११०९ (Tata 1109)</option>
                    <option value="Cold Chain Container Truck">कोल्ड साखळी कंटेनर (Refrigerated)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">{t('pickupLocation')}</label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">{t('destinationLocation')}</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500 font-semibold"
                  required
                />
              </div>

              <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-900 text-slate-300 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>अंदाजित भाडे:</span>
                  <span className="text-emerald-400">₹ {((weightKg / 1000) * 320 + 300).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-slate-400">यामध्ये ५% GST आणि पीक विमा सुरक्षा समाविष्ट आहे.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                वाहतूकदार शोधा आणि बुकिंग करा →
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
