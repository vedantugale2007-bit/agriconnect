import React from 'react';
import {
  CheckCircle2,
  MapPin,
  FileText,
  ArrowRight,
  ShieldCheck,
  Truck,
  Download,
  Share2,
} from 'lucide-react';
import { ScreenType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface PaymentSuccessScreenProps {
  setCurrentScreen: (screen: ScreenType) => void;
}

export const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({ setCurrentScreen }) => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans flex items-center justify-center">
      <div className="bg-slate-900 border border-emerald-800/80 rounded-3xl p-8 max-w-xl w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-[10px] uppercase font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'mr' ? 'पेमेंट यशस्वी • एस्क्रो खात्यात सुरक्षित' : 'Payment Confirmed & Locked in Escrow'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-display">
            {language === 'mr' ? 'बुकिंग यशस्वीरीत्या पूर्ण झाले!' : 'Booking Confirmed!'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'mr' ? 'व्यवहार संदर्भ:' : 'Transaction Ref:'} <strong className="text-emerald-400 font-mono">AC-TXN-MH99821</strong>
          </p>
        </div>

        {/* Summary Box */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">{language === 'mr' ? 'बुकिंग आयडी:' : 'Booking Number:'}</span>
            <span className="font-bold text-white">AC-8842-MH15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">{t('cropType')}:</span>
            <span className="font-bold text-emerald-400">{language === 'mr' ? '१० टन लाल कांदा (Onion)' : '10 Tons Red Onion'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">{language === 'mr' ? 'नियुक्त ट्रान्सपोर्टर:' : 'Assigned Carrier:'}</span>
            <span className="font-bold text-white">जय महाराष्ट्र ट्रान्सपोर्ट (ज्ञानेश्वर शिंदे)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">{language === 'mr' ? 'एकूण जमा रक्कम:' : 'Total Paid:'}</span>
            <span className="font-bold text-emerald-400">₹ ३,५००.००</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => setCurrentScreen('live-tracking')}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer shadow-lg flex items-center justify-center space-x-2"
          >
            <MapPin className="w-4 h-4" />
            <span>{t('liveTracking')}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('invoices')}
            className="py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{t('invoices')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

