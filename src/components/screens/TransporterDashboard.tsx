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
  BarChart2,
  PieChart as PieChartIcon,
  DollarSign,
  Users,
  Activity,
  Award,
  Navigation,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
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

  // Transporter Analytics Tab State & Data
  const [transporterTab, setTransporterTab] = useState<'earnings' | 'vehicles' | 'trips' | 'drivers' | 'fuel'>('earnings');

  const earningsData = [
    { week: language === 'mr' ? 'आठवडा १' : 'Week 1', earnings: 42000, fuelCost: 14200, profit: 27800 },
    { week: language === 'mr' ? 'आठवडा २' : 'Week 2', earnings: 51000, fuelCost: 17100, profit: 33900 },
    { week: language === 'mr' ? 'आठवडा ३' : 'Week 3', earnings: 48500, fuelCost: 16000, profit: 32500 },
    { week: language === 'mr' ? 'आठवडा ४' : 'Week 4', earnings: 63000, fuelCost: 20500, profit: 42500 },
    { week: language === 'mr' ? 'आठवडा ५' : 'Week 5', earnings: 58000, fuelCost: 19200, profit: 38800 },
  ];

  const vehicleFleetData = [
    { status: language === 'mr' ? 'मार्गावर (In Transit)' : 'In Transit', count: 6, fill: '#10b981' },
    { status: language === 'mr' ? 'उपलब्ध (Available)' : 'Available', count: 4, fill: '#06b6d4' },
    { status: language === 'mr' ? 'मेन्टेनन्स (Maintenance)' : 'Maintenance', count: 1, fill: '#f59e0b' },
    { status: language === 'mr' ? 'आरक्षित (Reserved)' : 'Reserved', count: 3, fill: '#6366f1' },
  ];

  const driverPerformanceList = [
    { name: 'ज्ञानेश्वर शिंदे', rating: 4.9, onTime: 98, trips: 142, vehicle: 'MH 15 EG 4821', safetyScore: 99 },
    { name: 'वैभव देशमुख', rating: 4.8, onTime: 96, trips: 118, vehicle: 'MH 15 DC 9012', safetyScore: 97 },
    { name: 'महेश पवार', rating: 4.7, onTime: 94, trips: 95, vehicle: 'MH 15 FB 3341', safetyScore: 95 },
    { name: 'संजय गरुड', rating: 4.9, onTime: 99, trips: 160, vehicle: 'MH 15 GV 7780', safetyScore: 98 },
  ];

  const fuelCostTrend = [
    { day: language === 'mr' ? 'सोम' : 'Mon', fuelExpense: 2800, distanceKm: 210, mileage: 7.2 },
    { day: language === 'mr' ? 'मंगळ' : 'Tue', fuelExpense: 3200, distanceKm: 245, mileage: 7.5 },
    { day: language === 'mr' ? 'बुध' : 'Wed', fuelExpense: 2400, distanceKm: 180, mileage: 7.1 },
    { day: language === 'mr' ? 'गुरु' : 'Thu', fuelExpense: 3900, distanceKm: 310, mileage: 7.8 },
    { day: language === 'mr' ? 'शुक्र' : 'Fri', fuelExpense: 3100, distanceKm: 235, mileage: 7.4 },
    { day: language === 'mr' ? 'शनि' : 'Sat', fuelExpense: 4200, distanceKm: 340, mileage: 8.0 },
    { day: language === 'mr' ? 'रवि' : 'Sun', fuelExpense: 1900, distanceKm: 140, mileage: 7.3 },
  ];

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

      {/* Transporter Analytics Dashboard (Earnings, Active Vehicles, Trips Today, Driver Performance, Fuel Cost) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                <BarChart2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-white font-display">
                {language === 'mr' ? 'वाहतूकदार विश्लेषण (Transporter Analytics)' : 'Transporter Fleet Analytics'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'mr' ? 'उत्पन्न, वाहन ताफा, ड्रायव्हर कामगिरी आणि इंधन खर्च' : 'Track Earnings, Active Vehicles, Daily Trips, Driver Ratings & Fuel Expenses'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setTransporterTab('earnings')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                transporterTab === 'earnings' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'उत्पन्न' : 'Earnings'}</span>
            </button>

            <button
              onClick={() => setTransporterTab('vehicles')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                transporterTab === 'vehicles' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'वाहन ताफा' : 'Active Fleet'}</span>
            </button>

            <button
              onClick={() => setTransporterTab('trips')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                transporterTab === 'trips' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'आजच्या फेऱ्या' : 'Trips Today'}</span>
            </button>

            <button
              onClick={() => setTransporterTab('drivers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                transporterTab === 'drivers' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'चालक कामगिरी' : 'Driver Performance'}</span>
            </button>

            <button
              onClick={() => setTransporterTab('fuel')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                transporterTab === 'fuel' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Fuel className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'इंधन खर्च' : 'Fuel Cost'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Earnings */}
        {transporterTab === 'earnings' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">
                {language === 'mr' ? 'आठवडा निहाय एकूण उत्पन्न विरुद्ध इंधन खर्च व नफा (₹)' : 'Weekly Revenue vs Fuel Cost vs Net Profit (₹)'}
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                {language === 'mr' ? 'एकूण नफा: ₹ १,७५,५००' : 'Net Profit: ₹ 1,75,500'}
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="earnings" name={language === 'mr' ? 'एकूण उत्पन्न' : 'Gross Earnings'} stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={3} />
                  <Area type="monotone" dataKey="profit" name={language === 'mr' ? 'निव्वळ नफा' : 'Net Profit'} stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={3} />
                  <Area type="monotone" dataKey="fuelCost" name={language === 'mr' ? 'इंधन खर्च' : 'Fuel Cost'} stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 2: Active Vehicles */}
        {transporterTab === 'vehicles' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleFleetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {vehicleFleetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ fontSize: '12px' }}
                    formatter={(val: any) => [`${val} वाहने`, 'संख्या']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {language === 'mr' ? 'एकूण १४ वाहने ताफा स्थिती' : 'Fleet Utilization Summary (Total 14 Trucks)'}
                </h4>
                <span className="text-xs font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                  ८८.५% कार्यरत
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {vehicleFleetData.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="font-bold text-white">{item.status}</span>
                    </div>
                    <div className="text-xl font-black text-slate-100 font-display">
                      0{item.count} <span className="text-[10px] text-slate-400 font-normal">वाहने</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Trips Today */}
        {transporterTab === 'trips' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">{language === 'mr' ? 'आजच्या पूर्ण फेऱ्या' : 'Completed Trips Today'}</span>
                <div className="text-2xl font-black text-emerald-400 font-display">०८ फेऱ्या</div>
                <div className="text-[10px] text-emerald-400/80">१००% सुरक्षित डिलिव्हरी</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">{language === 'mr' ? 'आज कापलेले अंतर' : 'Distance Covered Today'}</span>
                <div className="text-2xl font-black text-teal-300 font-display">३८५ किमी</div>
                <div className="text-[10px] text-teal-400/80">नाशिक-पुणे-नवी मुंबई मार्ग</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">{language === 'mr' ? 'सरासरी अनलोडिंग वेळ' : 'Avg Turnaround Time'}</span>
                <div className="text-2xl font-black text-indigo-300 font-display">३५ मिनिटे</div>
                <div className="text-[10px] text-indigo-400/80">FastPass APMC टोकन द्वारे</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">{language === 'mr' ? 'आजच्या मुख्य वाहतूक फेऱ्या:' : 'Today Active Runs:'}</h4>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center text-slate-200">
                <span>१. आयशर १४ फूट (MH 15 EG 4821) • सिन्नर → लासलगाव (कांदा १० टन)</span>
                <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">पूर्ण (Completed)</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center text-slate-200">
                <span>२. टाटा ११०९ (MH 15 DC 9012) • निफाड → वाशी APMC (द्राक्षे १४ टन)</span>
                <span className="text-teal-400 font-bold bg-teal-950 px-2 py-0.5 rounded border border-teal-800">मार्गावर (In Transit)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Driver Performance */}
        {transporterTab === 'drivers' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">
                {language === 'mr' ? 'चालक रेटिंग, वेळेचे भान आणि सुरक्षितता गुण' : 'Driver Performance Index & Safety Score'}
              </span>
              <span className="text-amber-400 font-bold bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                ★ ४.८५ सरासरी रेटिंग
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {driverPerformanceList.map((driver, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center space-x-2">
                        <span>{driver.name}</span>
                        <span className="text-xs text-amber-400 font-extrabold">★ {driver.rating}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{driver.vehicle}</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {driver.trips} फेऱ्या
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-900">
                    <div className="flex justify-between text-slate-300">
                      <span>वेळेवर आगमन:</span>
                      <span className="font-bold text-teal-400">{driver.onTime}%</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>सुरक्षितता स्कोअर:</span>
                      <span className="font-bold text-emerald-400">{driver.safetyScore}/१००</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Fuel Cost */}
        {transporterTab === 'fuel' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">
                {language === 'mr' ? 'दैनंदिन इंधन खर्च व वाहनांचे मायलेज (km/l)' : 'Daily Fuel Expense (₹) & Mileage Telemetry'}
              </span>
              <span className="text-rose-400 font-bold bg-rose-950 px-2.5 py-0.5 rounded border border-rose-800">
                {language === 'mr' ? 'सरासरी मायलेज: ७.५ किमी/ली' : 'Avg Mileage: 7.5 km/l'}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fuelCostTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                  <Bar dataKey="fuelExpense" name={language === 'mr' ? 'इंधन खर्च (₹)' : 'Fuel Expense (₹)'} fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="distanceKm" name={language === 'mr' ? 'अंतर (किमी)' : 'Distance (km)'} fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

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

