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
} from 'lucide-react';
import { ScreenType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface AdminDashboardProps {
  setCurrentScreen: (screen: ScreenType) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentScreen }) => {
  const { language, t } = useLanguage();
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

