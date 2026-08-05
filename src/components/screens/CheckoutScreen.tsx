import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Building,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronLeft,
  Smartphone,
  RefreshCw,
} from 'lucide-react';
import { ScreenType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { processRazorpayPayment, generateUpiQrUri } from '../../utils/payment';

interface CheckoutScreenProps {
  setCurrentScreen: (screen: ScreenType) => void;
  onPaymentSuccess: () => void;
  totalAmount?: number;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  setCurrentScreen,
  onPaymentSuccess,
  totalAmount = 3500.00,
}) => {
  const { language, t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'bank'>('upi');
  const [upiId, setUpiId] = useState('shankar.patil@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    processRazorpayPayment(
      {
        bookingId: `BK-${Date.now()}`,
        bookingNumber: 'AC-8842-MH15',
        amount: totalAmount,
        farmerName: 'शंकर पाटील (Shankar Patil)',
        farmerPhone: '+919890123456',
        transporterName: 'जय महाराष्ट्र ट्रान्सपोर्ट (Nashik)',
        cropType: 'कांदा (Onion)',
      },
      (paymentId) => {
        console.log('Payment success:', paymentId);
        setIsProcessing(false);
        onPaymentSuccess();
      },
      (err) => {
        console.warn('Payment failed/dismissed:', err);
        setIsProcessing(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
        <button
          onClick={() => setCurrentScreen('booking-review')}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            {language === 'mr' ? 'AgriConnect सुरक्षित एस्क्रो पेमेंट' : 'AgriConnect Escrow Payment'}
          </h1>
          <p className="text-xs text-slate-400">
            {language === 'mr' ? 'तुरुंत UPI QR / डेबिट कार्ड / नेट बँकिंग' : 'Instant UPI QR / Debit Card / Net Banking'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Payment Form */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Method Selection Tabs */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                paymentMethod === 'upi'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
              <span className="text-xs block">UPI / QR Code</span>
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                paymentMethod === 'card'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-5 h-5 mx-auto mb-1 text-teal-400" />
              <span className="text-xs block">{language === 'mr' ? 'डेबिट / क्रेडिट कार्ड' : 'Card'}</span>
            </button>

            <button
              onClick={() => setPaymentMethod('bank')}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                paymentMethod === 'bank'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Building className="w-5 h-5 mx-auto mb-1 text-amber-400" />
              <span className="text-xs block">{language === 'mr' ? 'नेट बँकिंग' : 'Net Banking'}</span>
            </button>
          </div>

          {/* Payment Details Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-xs font-bold text-slate-300">PhonePe / Google Pay / Paytm द्वारे QR कोड स्कॅन करा</div>
                  
                  {/* Simulated QR Code Graphic */}
                  <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl shadow-inner flex flex-col items-center justify-center relative">
                    <QrCode className="w-36 h-36 text-slate-950" />
                    <span className="absolute inset-0 m-auto w-8 h-8 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-[10px]">
                      AC
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-400">UPI ID: <strong className="text-emerald-400">agriconnect@icici</strong></p>
                </div>

                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-300">{language === 'mr' ? 'किंवा तुमचा UPI ID टाका' : 'Or Enter Your UPI ID'}</label>
                  <div className="flex space-x-2 mt-1">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 outline-none"
                      placeholder="username@upi"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">{language === 'mr' ? 'कार्ड क्रमांक' : 'Card Number'}</label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8821"
                    className="w-full mt-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300">{language === 'mr' ? 'मुदत तारीख' : 'Expiry Date'}</label>
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="w-full mt-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300">CVV</label>
                    <input
                      type="text"
                      defaultValue="882"
                      className="w-full mt-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="space-y-3 text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">बँकेचे नाव:</span>
                  <span className="font-bold text-white">State Bank of India (SBI)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">खाते क्रमांक:</span>
                  <span className="font-bold text-emerald-400">3098-2810-4491</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IFSC कोड:</span>
                  <span className="font-bold text-white">SBIN0001248 (नाशिक)</span>
                </div>
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-sm hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>{language === 'mr' ? 'सुरक्षित पेमेंट प्रक्रिया सुरू आहे...' : 'Locking Funds in Escrow...'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 stroke-[2.5]" />
                  <span>{language === 'mr' ? `₹ ${totalAmount.toLocaleString('en-IN')} भरणा करा` : `Authorize & Pay ₹ ${totalAmount.toLocaleString('en-IN')}`}</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right 5 Cols: Order Summary */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white font-display">{language === 'mr' ? 'रक्कम तपशील' : 'Order Breakdown'}</h3>
            
            <div className="space-y-2 text-xs text-slate-300 border-b border-slate-800 pb-3">
              <div className="flex justify-between">
                <span>सिन्नर → लासलगाव वाहतूक भाडे</span>
                <span className="font-semibold text-white">₹ {totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>पीक विमा संरक्षण</span>
                <span className="font-semibold text-emerald-400">समाविष्ट</span>
              </div>
            </div>

            <div className="flex justify-between text-base font-bold text-white">
              <span>{t('totalPayable')}</span>
              <span className="text-emerald-400 font-extrabold">₹ {totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-2xl text-[11px] text-emerald-300 font-medium flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'mr' ? '१००% पैसे परत मिळण्याची गॅरंटी (सुरक्षित एस्क्रो)' : '100% Money-Back Guarantee in escrow.'}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

