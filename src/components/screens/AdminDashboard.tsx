import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  AlertOctagon,
  Truck,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  BarChart2,
  Activity,
  Lock,
  Globe,
  ArrowUpRight,
  PieChart as PieChartIcon,
  DollarSign,
  AlertCircle,
  PackageCheck,
  Layers,
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
import { ScreenType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface AdminDashboardProps {
  setCurrentScreen: (screen: ScreenType) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentScreen }) => {
  const { language, t } = useLanguage();

  // Admin Analytics Tab State & Data
  const [adminTab, setAdminTab] = useState<'users' | 'deliveries' | 'revenue' | 'complaints' | 'utilization'>('users');

  const userGrowthData = [
    { district: language === 'mr' ? 'नाशिक' : 'Nashik', farmers: 9500, transporters: 1800 },
    { district: language === 'mr' ? 'अहिल्यानगर' : 'Ahilyanagar', farmers: 6200, transporters: 1100 },
    { district: language === 'mr' ? 'पुणे' : 'Pune', farmers: 5400, transporters: 950 },
    { district: language === 'mr' ? 'सोलापूर' : 'Solapur', farmers: 4100, transporters: 550 },
    { district: language === 'mr' ? 'जळगाव' : 'Jalgaon', farmers: 3200, transporters: 400 },
  ];

  const adminRevenueData = [
    { month: 'फेब्रु', gmvLakhs: 45, platformFeeThousands: 225, deliveries: 410 },
    { month: 'मार्च', gmvLakhs: 62, platformFeeThousands: 310, deliveries: 580 },
    { month: 'एप्रिल', gmvLakhs: 78, platformFeeThousands: 390, deliveries: 720 },
    { month: 'मे', gmvLakhs: 95, platformFeeThousands: 475, deliveries: 890 },
    { month: 'जून', gmvLakhs: 115, platformFeeThousands: 575, deliveries: 1050 },
    { month: 'जुलै', gmvLakhs: 142, platformFeeThousands: 710, deliveries: 1320 },
  ];

  const complaintStatsData = [
    { category: language === 'mr' ? 'वाहतूक विलंब' : 'Transit Delay', count: 18, resolved: 17, fill: '#f59e0b' },
    { category: language === 'mr' ? 'तापमान वाढ' : 'Temp Rise', count: 8, resolved: 8, fill: '#ef4444' },
    { category: language === 'mr' ? 'भाडे विवाद' : 'Payment Dispute', count: 12, resolved: 11, fill: '#06b6d4' },
    { category: language === 'mr' ? 'पॅकेजिंग हानी' : 'Packaging Damage', count: 5, resolved: 5, fill: '#a855f7' },
  ];

  const deliveryStatusData = [
    { name: language === 'mr' ? 'मार्गक्रमण (In Transit)' : 'In Transit', value: 68, fill: '#10b981' },
    { name: language === 'mr' ? 'आज वितरित (Delivered Today)' : 'Delivered Today', value: 42, fill: '#06b6d4' },
    { name: language === 'mr' ? 'किरकोळ विलंब (Slight Delay)' : 'Slight Delay', value: 6, fill: '#f59e0b' },
    { name: language === 'mr' ? 'तातडीचे लक्ष (Alert Action)' : 'Alert Action Needed', value: 2, fill: '#ef4444' },
  ];

  const vehicleUtilizationCategory = [
    { type: 'टाटा एस (Ace)', count: 180, util: 92 },
    { type: 'बोलेरो पिकअप (Pickup)', count: 240, util: 88 },
    { type: 'आयशर १४ फूट (Eicher)', count: 120, util: 85 },
    { type: 'कंटेनर कोल्ड चेन (Cold Chain)', count: 42, util: 78 },
  ];

  const [verifications, setVerifications] = useState([
    {
      id: 'v-1',
      company: 'जय महाराष्ट्र ट्रान्सपोर्ट',
      owner: 'ज्ञानेश्वर शिंदे',
      vehicleCount: 14,
      docStatus: '₹५० लाख विमा संरक्षण',
      status: 'PENDING',
      location: 'नाशिक डेपो',
    },
    {
      id: 'v-2',
      company: 'सह्याद्री फ्रूट एक्सप्रेस',
      owner: 'वैभव देशमुख',
      vehicleCount: 8,
      docStatus: 'BS6/इको प्रदूषण प्रमाणपत्र',
      status: 'PENDING',
      location: 'सिन्नर यार्ड',
    },
    {
      id: 'v-3',
      company: 'गोदावरी अ‍ॅग्रो कॅरिअर्स',
      owner: 'महेश पवार',
      vehicleCount: 22,
      docStatus: 'ISO 22000 कोल्ड-चेन प्रमाणपत्र',
      status: 'VERIFIED',
      location: 'निफाड हब',
    },
  ]);

  const handleApprove = (id: string) => {
    setVerifications(
      verifications.map((v) => (v.id === id ? { ...v, status: 'VERIFIED' } : v))
    );
  };

  const handleReject = (id: string) => {
    setVerifications(
      verifications.map((v) => (v.id === id ? { ...v, status: 'REJECTED' } : v))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {t('adminDashboard')}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            महाराष्ट्र राज्य कृषी लॉजिस्टिक्स व वाहतूक नियंत्रण कक्ष (नाशिक व अहिल्यानगर)
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{language === 'mr' ? '०८ ट्रान्सपोर्टर मान्यता प्रलंबित' : '08 Pending Carrier Approvals'}</span>
          </span>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>एकूण प्लॅटफॉर्म व्यवहार (GMV)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white font-display">₹ १,४२,९५,०००</div>
          <div className="text-[11px] text-emerald-400 font-medium">+२४.२% वार्षिक वाढ</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>सक्रिय नोंदणीकृत वापरकर्ते</span>
            <Users className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-black text-teal-300 font-display">२४,८१२</div>
          <div className="text-[11px] text-teal-400 font-medium">१८,२०० शेतकरी / ६,६१२ ट्रान्सपोर्टर</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>तक्रारी / विवाद</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400 font-display">०८ प्रकरणे</div>
          <div className="text-[11px] text-rose-400/80 font-medium">विमा दाव्याची चौकशी सुरू</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>सत्यापित वाहने</span>
            <Truck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300 font-display">५८२ गाड्या</div>
          <div className="text-[11px] text-amber-400/80 font-medium">९२% ताडपत्री व सेफ्टी सज्ज</div>
        </div>
      </div>

      {/* Admin Analytics Dashboard (Total Farmers, Total Transporters, Active Deliveries, Revenue, Complaint Stats, Vehicle Utilization, Interactive Charts) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <BarChart2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-white font-display">
                {language === 'mr' ? 'राज्यस्तरीय लॉजिस्टिक विश्लेषण व नियंत्रण' : 'State Agri-Logistics Analytics'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'mr' ? 'शेतकरी, ट्रान्सपोर्टर, महसूल, तक्रारी निवारण व वाहन क्षमता विश्लेषण' : 'Comprehensive Real-time Monitoring for Farmers, Carriers, Revenue & Utilization'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setAdminTab('users')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                adminTab === 'users' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'शेतकरी व ट्रान्सपोर्टर' : 'Farmers & Carriers'}</span>
            </button>

            <button
              onClick={() => setAdminTab('revenue')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                adminTab === 'revenue' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'महसूल (GMV)' : 'Revenue'}</span>
            </button>

            <button
              onClick={() => setAdminTab('deliveries')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                adminTab === 'deliveries' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'सक्रिय डिलिव्हरी' : 'Active Deliveries'}</span>
            </button>

            <button
              onClick={() => setAdminTab('utilization')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                adminTab === 'utilization' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'वाहन वापर' : 'Vehicle Utilization'}</span>
            </button>

            <button
              onClick={() => setAdminTab('complaints')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                adminTab === 'complaints' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'तक्रारी आकडेवारी' : 'Complaints'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Farmers & Transporters */}
        {adminTab === 'users' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">{language === 'mr' ? 'एकूण शेतकरी (Total Farmers)' : 'Total Farmers Registered'}</span>
                <div className="text-3xl font-black text-emerald-400 font-display">१८,२०० <span className="text-xs font-normal text-slate-400">शेतकरी</span></div>
                <div className="text-[11px] text-emerald-400/90">+३४% यंदाच्या मोसमात वाढ</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">{language === 'mr' ? 'एकूण ट्रान्सपोर्टर (Total Transporters)' : 'Total Carriers & Fleet Partners'}</span>
                <div className="text-3xl font-black text-teal-300 font-display">६,६१२ <span className="text-xs font-normal text-slate-400 font-sans">कंपनी/मालक</span></div>
                <div className="text-[11px] text-teal-400/90">५८२ सत्यापित मालवाहू गाड्या</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">
                {language === 'mr' ? 'जिल्हा निहाय शेतकरी व ट्रान्सपोर्टर वितरण' : 'District-wise Registered Farmers & Transporters Distribution'}
              </span>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="district" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                    <Bar dataKey="farmers" name={language === 'mr' ? 'शेतकरी संख्या' : 'Farmers'} fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="transporters" name={language === 'mr' ? 'ट्रान्सपोर्टर संख्या' : 'Transporters'} fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Revenue */}
        {adminTab === 'revenue' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">
                {language === 'mr' ? 'मासिक प्लॅटफॉर्म व्यवहार मूल्य (GMV लाख ₹) व प्लॅटफॉर्म कमिशन (हजार ₹)' : 'Monthly Platform GMV (Lakh ₹) & Revenue Stream'}
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                एकूण GMV: ₹ १.४२ कोटी
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adminRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="gmvLakhs" name={language === 'mr' ? 'एकूण व्यवहार (लाख ₹)' : 'GMV (Lakh ₹)'} stroke="#10b981" fill="#10b981" fillOpacity={0.25} strokeWidth={3} />
                  <Area type="monotone" dataKey="platformFeeThousands" name={language === 'mr' ? 'प्लॅटफॉर्म शुल्क (हजार ₹)' : 'Platform Revenue (Thousand ₹)'} stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 3: Active Deliveries */}
        {adminTab === 'deliveries' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {deliveryStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="md:col-span-6 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {language === 'mr' ? 'सध्याच्या ११८ सक्रिय डिलिव्हरी स्थिती' : 'Active Deliveries Status (118 Total Real-Time)'}
                </h4>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  ९३.२% वेळेवर
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {deliveryStatusData.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="font-bold text-white">{item.name}</span>
                    </div>
                    <span className="font-black text-slate-200">{item.value} <span className="text-[10px] text-slate-400 font-normal">गाड्या</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Vehicle Utilization */}
        {adminTab === 'utilization' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">
                {language === 'mr' ? 'वाहन प्रकारानुसार सरासरी कार्यक्षमता दर (%)' : 'Average Fleet Utilization Rate by Vehicle Category (%)'}
              </span>
              <span className="text-amber-300 font-bold bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                ८५.८% सरासरी उपयोग दर
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vehicleUtilizationCategory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="type" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                  <Bar dataKey="util" name={language === 'mr' ? 'कार्यक्षमता (%)' : 'Utilization (%)'} fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="count" name={language === 'mr' ? 'वाहन संख्या' : 'Fleet Size'} fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 5: Complaint Statistics */}
        {adminTab === 'complaints' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">
                {language === 'mr' ? 'तक्रारींचे प्रकार आणि निवारण प्रमाण (एकूण ४३ पैकी ४१ निवारित - ९५.३%)' : 'Dispute & Complaint Statistics (41 / 43 Resolved - 95.3%)'}
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                ९५.३% निवारण दर
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complaintStatsData.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span>{item.category}</span>
                    </span>
                    <span className="text-xs font-black text-rose-400">{item.count} तक्रारी</span>
                  </div>

                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(item.resolved / item.count) * 100}%` }} />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>निवारित: {item.resolved}</span>
                    <span className="text-emerald-400 font-bold">{Math.round((item.resolved / item.count) * 100)}% यशस्वी समाधान</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Main Grid: Carrier Verifications & Regional Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Transporter Verification Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-display flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>{language === 'mr' ? 'ट्रान्सपोर्टर पडताळणी कक्ष' : 'Transporter Verification Portal'}</span>
                </h3>
                <p className="text-xs text-slate-400">गाड्यांचे परवाने, RC आणि विमा कागदपत्रे पडताळा</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="py-3 px-3">ट्रान्सपोर्टर / कंपनी</th>
                    <th className="py-3 px-3">गाड्यांची संख्या</th>
                    <th className="py-3 px-3">विमा / दाखला</th>
                    <th className="py-3 px-3">स्थिती</th>
                    <th className="py-3 px-3 text-right">कृती</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {verifications.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white">{v.company}</div>
                        <div className="text-[10px] text-slate-400">{v.owner} • {v.location}</div>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-300">{v.vehicleCount} गाड्या</td>
                      <td className="py-3.5 px-3 text-emerald-400 font-medium">{v.docStatus}</td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            v.status === 'VERIFIED'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : v.status === 'REJECTED'
                              ? 'bg-rose-500/20 text-rose-400'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {v.status === 'VERIFIED' ? (language === 'mr' ? 'सत्यापित' : 'VERIFIED') : v.status === 'REJECTED' ? (language === 'mr' ? 'अस्वीकृत' : 'REJECTED') : (language === 'mr' ? 'प्रलंबित' : 'PENDING')}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right space-x-2">
                        {v.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApprove(v.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[10px] hover:bg-emerald-400 cursor-pointer"
                            >
                              मंजूर करा
                            </button>
                            <button
                              onClick={() => handleReject(v.id)}
                              className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 text-[10px] hover:bg-rose-900 cursor-pointer"
                            >
                              नकारा
                            </button>
                          </>
                        )}
                        {v.status === 'VERIFIED' && <span className="text-[10px] text-emerald-400 font-bold">सक्रिय भागीदार</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regional Pulse Heatmap Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white font-display flex items-center space-x-2">
              <Globe className="w-5 h-5 text-teal-400" />
              <span>प्रदेशानिहाय बाजार समिती व गाडी क्षमता (Heatmap)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>लासलगाव व नाशिक APMC हब</span>
                  <span className="text-emerald-400">९४% गाडी उपलब्धता</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[94%]" />
                </div>
                <p className="text-[10px] text-slate-400">कांदा आणि द्राक्ष वाहतुकीसाठी भरपूर मागणी</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>अहिल्यानगर व कोपरगाव मार्केट</span>
                  <span className="text-amber-400">३२% गाड्यांची कमतरता</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-[32%]" />
                </div>
                <p className="text-[10px] text-slate-400">साखर व सोयाबीन वाहतुकीसाठी जादा गाड्यांची गरज</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Security Audit Log */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white font-display flex items-center space-x-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>सिस्टम सुरक्षा व ऑडिट नोंदी</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>प्रशासक (Admin)</span>
                  <span className="text-[9px] text-slate-500">१० मिनिटांपूर्वी</span>
                </div>
                <p className="text-[11px] text-slate-300">जय महाराष्ट्र ट्रान्सपोर्ट चे ५० टन क्षमता प्रमाणपत्र मंजूर केले.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>स्वयंचलित नियम</span>
                  <span className="text-[9px] text-slate-500">४५ मिनिटांपूर्वी</span>
                </div>
                <p className="text-[11px] text-slate-300">दहा टन कांदा वाहतुकीसाठी प्लॅटफॉर्म फी ₹ १०० निश्चित केली.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>ऑडिट इव्हेंट #MH9921</span>
                  <span className="text-[9px] text-slate-500">२ तासांपूर्वी</span>
                </div>
                <p className="text-[11px] text-slate-300">UPI व्यवहार #TXN-MH99821 ची तपासणी पूर्ण व एस्क्रो मध्ये जमा.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

