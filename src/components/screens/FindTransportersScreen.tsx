import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Truck,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Leaf,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';
import { ScreenType, Transporter, ShipmentBooking, VehicleType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface FindTransportersScreenProps {
  setCurrentScreen: (screen: ScreenType) => void;
  transporters: Transporter[];
  onSelectTransporterForBooking: (transporter: Transporter) => void;
}

export const FindTransportersScreen: React.FC<FindTransportersScreenProps> = ({
  setCurrentScreen,
  transporters,
  onSelectTransporterForBooking,
}) => {
  const { language, t, getVehicleName } = useLanguage();
  const [selectedVehicleFilter, setSelectedVehicleFilter] = useState<string>('ALL');
  const [minRating, setMinRating] = useState<number>(4.5);
  const [pickupInput, setPickupInput] = useState('सिन्नर शेत गट क्र. ३, नाशिक');
  const [destInput, setDestInput] = useState('लासलगाव APMC बाजार समिती');

  const filteredTransporters = transporters.filter((t) => {
    if (selectedVehicleFilter !== 'ALL' && !t.vehicleType.toLowerCase().includes(selectedVehicleFilter.toLowerCase())) {
      return false;
    }
    if (t.rating < minRating) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans space-y-8">
      
      {/* Search Bento Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              {t('searchTransporters')}
            </h1>
            <p className="text-xs text-slate-400">
              {language === 'mr' ? 'नाशिक, अहमदनगर आणि लासलगाव मार्गावरील प्रमाणित ट्रान्सपोर्टर्स' : 'Certified transporters along Nashik-Ahilyanagar & Lasalgaon routes'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">{t('pickupLocation')}</label>
            <div className="relative mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-3" />
              <input
                type="text"
                value={pickupInput}
                onChange={(e) => setPickupInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">{t('destinationLocation')}</label>
            <div className="relative mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-3" />
              <input
                type="text"
                value={destInput}
                onChange={(e) => setDestInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">{t('cropType')} / {t('weightKg')}</label>
            <input
              type="text"
              defaultValue="कांदा (Onion) - १०,००० किग्रा"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="flex items-end">
            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-1">
              <Search className="w-3.5 h-3.5" />
              <span>{t('searchTransporters')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Filter Drawer & Transporter Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 3 Cols: Filters Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-extrabold uppercase text-white flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                <span>{language === 'mr' ? 'वाहन फिल्टर' : 'Filter Fleet'}</span>
              </span>
              <button
                onClick={() => { setSelectedVehicleFilter('ALL'); setMinRating(4.0); }}
                className="text-[10px] text-emerald-400 hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Vehicle Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">{t('vehicleRequired')}</label>
              <div className="space-y-1.5 text-xs">
                {['ALL', 'Tata Ace', 'Bolero', 'Eicher', 'Refrigerated'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVehicleFilter(v)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                      selectedVehicleFilter === v
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {v === 'ALL' ? (language === 'mr' ? 'सर्व गाड्या' : 'All Vehicle Types') : v}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-300">{language === 'mr' ? 'किमान रेटिंग' : 'Minimum Rating'}</label>
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{minRating} Stars & above</span>
              </div>
              <input
                type="range"
                min="4.0"
                max="5.0"
                step="0.1"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full accent-emerald-400"
              />
            </div>

          </div>

          {/* Route Map Summary Widget */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-white">{language === 'mr' ? 'मार्ग माहिती' : 'Route Corridor Info'}</h4>
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">मार्ग:</span>
                <span className="font-bold">सिन्नर → लासलगाव</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">अंतर:</span>
                <span className="font-bold text-emerald-400">६५ किमी</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">वेळ:</span>
                <span className="font-bold text-amber-300">१ तास ४५ मिनिटे</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right 9 Cols: Transporter List */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">
              {language === 'mr' ? `${filteredTransporters.length} उपक्रमशील ट्रान्सपोर्टर्स उपलब्ध आहेत` : `Showing ${filteredTransporters.length} certified transporters available`}
            </span>
            <span className="text-xs font-semibold text-emerald-400">{language === 'mr' ? 'AI मॅच स्कोअरनुसार रँक केलेले' : 'Sorted by AI Match Score'}</span>
          </div>

          <div className="space-y-4">
            {filteredTransporters.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-700/60 p-6 rounded-3xl space-y-4 transition-all shadow-xl group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left Transporter Info */}
                  <div className="flex items-start space-x-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {t.name}
                        </h3>
                        {t.verified && (
                          <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400" title="Verified Carrier">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center space-x-1 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{t.rating} ({t.reviewsCount} पुनरावलोकने)</span>
                        </span>
                        <span>•</span>
                        <span className="text-teal-300 font-semibold">{t.completedTrips} फेऱ्या</span>
                        <span>•</span>
                        <span className="text-slate-300">{t.location}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 text-slate-300 border border-slate-800">
                          {getVehicleName(t.vehicleType)}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/80 flex items-center space-x-1">
                          <Leaf className="w-3 h-3 text-emerald-400" />
                          <span>{t.ecoScore}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Pricing & Action */}
                  <div className="text-right space-y-2 shrink-0">
                    <div>
                      <div className="text-xl font-black text-emerald-400 font-display">
                        ₹ {Math.round(t.ratePerTonMile * 65 * 10 / 10).toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400">{language === 'mr' ? 'अंदाजित भाडे दर (१० टन)' : 'Est. Rate for 10 Tons'}</div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectTransporterForBooking(t);
                        setCurrentScreen('booking-review');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-extrabold hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer shadow-md flex items-center justify-center space-x-1.5 w-full sm:w-auto"
                    >
                      <span>{language === 'mr' ? 'गाडी निवडा' : 'Select Transporter'}</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

