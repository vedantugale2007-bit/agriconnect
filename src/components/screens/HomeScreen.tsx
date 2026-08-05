import React, { useState } from 'react';
import {
  Sprout,
  Truck,
  ShieldCheck,
  TrendingUp,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Sparkles,
  Bot,
  Star,
  Users,
  Building2,
  Zap,
  Sun,
} from 'lucide-react';
import { ScreenType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface HomeScreenProps {
  setCurrentScreen: (screen: ScreenType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ setCurrentScreen }) => {
  const { language, t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: language === 'mr' ? 'ॲग्रीकनेक्ट महाराष्ट्रातील शेतकऱ्यांना आणि वाहतूकदारांना कसे जोडते?' : language === 'hi' ? 'एग्रीकनेक्ट महाराष्ट्र के किसानों और ट्रांसपोर्टरों को कैसे जोड़ता है?' : 'How does AgriConnect match farmers with local transporters?',
      a: language === 'mr' ? 'ॲग्रीकनेक्ट AI प्रणाली नाशिक आणि अहिल्यानगर जिल्ह्यातील पिकांचा प्रकार, वजन, पिकअप ठिकाण आणि हवामानाचा अंदाज यांचा विचार करून जवळचे मान्यताप्राप्त वाहतूकदार जोडते.' : language === 'hi' ? 'एग्रीकनेक्ट AI सिस्टम नासिक और अहिल्यानगर जिले में फसल के प्रकार, वजन, पिकअप स्थान और मौसम को देखकर निकटतम प्रमाणित ट्रांसपोर्टर प्रदान करता है।' : 'AgriConnect uses real-time AI to match crop load type, harvest location, required ventilation/cold temp, and pickup time with certified local transits in Nashik and Ahilyanagar.',
    },
    {
      q: language === 'mr' ? 'AI पीक नुकसान अंदाज (AI Loss Estimator) कसा काम करतो?' : language === 'hi' ? 'AI फसल नुकसान अनुमान प्रणाली कैसे काम करती है?' : 'What is the AI Crop Loss Estimator?',
      a: language === 'mr' ? 'आमचे AI मॉडेल नाशिक/अहिल्यानगर मधील तापमान, वाहतूक अंतर आणि कांदा/द्राक्षे/टोमॅटोचे शोषण दर विश्लेषित करून माल खराब होण्याचा धोका दाखवते.' : language === 'hi' ? 'हमारा AI मॉडल नासिक/अहिल्यानगर के तापमान, दूरी और प्याज/अंगूर के श्वसन दर का विश्लेषण करके फसल नुकसान जोखिम की भविष्यवाणी करता है।' : 'Our AI model analyzes ambient weather forecasts, transit distance, crop respiration index, and transit insulation to predict spoilage risks for Onions, Grapes, and Tomatoes.',
    },
    {
      q: language === 'mr' ? 'वाहतुकीदरम्यान मालाचा विमा असतो का?' : language === 'hi' ? 'क्या परिवहन के दौरान माल का बीमा होता है?' : 'Are cargo shipments insured during transport?',
      a: language === 'mr' ? 'होय! ॲग्रीकनेक्ट द्वारे केलेल्या प्रत्येक बुकिंगला ₹ ५,००,००० पर्यंतचे प्रमाणित पीक विमा सुरक्षा कवच मिळते.' : language === 'hi' ? 'हाँ! एग्रीकनेक्ट द्वारा की गई प्रत्येक बुकिंग में ₹ 5,00,000 तक का प्रमाणित फसल बीमा कवर शामिल है।' : 'Yes, every booking made through AgriConnect includes verified cargo insurance coverage up to ₹5,00,000 against temperature loss or transit delays.',
    },
    {
      q: language === 'mr' ? 'लासलगाव व इतर APMC बाजार भाव कसे अपडेट होतात?' : language === 'hi' ? 'लासलगांव और अन्य APMC मंडी भाव कैसे अपडेट होते हैं?' : 'How do Mandi Market Prices get updated?',
      a: language === 'mr' ? 'लासलगाव, नाशिक, पिंपळगाव आणि अहिल्यानगर APMC समित्यांकडून दर १५ मिनिटांनी थेट बाजारभाव अपडेट केले जातात.' : language === 'hi' ? 'लासलगांव, नासिक, पिंपलगांव और अहिल्यानगर APMC से हर 15 मिनट में सीधे मंडी भाव अपडेट किए जाते हैं।' : 'Prices are synced directly from major APMCs (Lasalgaon, Nashik, Pimpalgaon, Rahuri) every 15 minutes.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 border-b border-emerald-900/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#052e1615_1px,transparent_1px),linear-gradient(to_bottom,#052e1615_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 text-xs font-semibold shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {language === 'mr' ? 'महाराष्ट्र कृषी आणि वाहतूक डिजिटल नेटवर्क' : language === 'hi' ? 'महाराष्ट्र कृषि एवं परिवहन डिजिटल नेटवर्क' : 'Maharashtra Agri Logistics Network'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
                {language === 'mr' ? (
                  <>
                    महाराष्ट्रातील शेतकऱ्यांसाठी <br />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                      स्मार्ट कृषी वाहतूक यंत्रणा
                    </span>
                  </>
                ) : language === 'hi' ? (
                  <>
                    महाराष्ट्र के किसानों के लिए <br />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                      स्मार्ट कृषि परिवहन प्रणाली
                    </span>
                  </>
                ) : (
                  <>
                    Intelligent Supply Chain For <br />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                      Maharashtra Farmers & Transporters
                    </span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                {language === 'mr'
                  ? 'नाशिक व अहिल्यानगर जिल्ह्यातील स्थानिक वाहतूकदारांशी थेट जोडा, Gemini AI द्वारे पिकांचे नुकसान टाळा आणि लासलगाव APMC सह सर्व प्रमुख बाजार समित्यांचे थेट भाव मिळवा.'
                  : language === 'hi'
                  ? 'नासिक और अहिल्यानगर जिले के स्थानीय ट्रांसपोर्टरों से सीधे जुड़ें, Gemini AI से फसल नुकसान से बचें और लासलगांव APMC सहित सभी प्रमुख मंडियों के लाइव भाव प्राप्त करें।'
                  : 'Connect directly with certified Maharashtra transporters, eliminate crop spoilage with real-time Gemini AI risk analysis, and access live APMC Mandi rates in one dashboard.'}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                  onClick={() => setCurrentScreen('find-transport')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <span>{t('bookTransport')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentScreen('farmer-dashboard')}
                  className="px-6 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white font-semibold text-sm hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>{t('viewMandiPrices')}</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('weather')}
                  className="px-5 py-3.5 rounded-xl bg-amber-950/60 border border-amber-700/60 text-amber-200 font-semibold text-sm hover:bg-amber-900/80 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>{t('weatherAdvisor')}</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('ai-assistant')}
                  className="px-5 py-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 font-semibold text-sm hover:bg-emerald-900 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span>{t('askAiAssistant')}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-display">२५,०००+</div>
                  <div className="text-[11px] text-slate-400 font-medium">{language === 'mr' ? 'टन वाहतूक पूर्ण' : language === 'hi' ? 'टन परिवहन पूर्ण' : 'Tonnes Moved'}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-display">९९.४%</div>
                  <div className="text-[11px] text-slate-400 font-medium">{language === 'mr' ? 'सुरक्षित वितरण' : language === 'hi' ? 'सुरक्षित वितरण' : 'Safe Delivery Rate'}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-amber-300 font-display">१५,०००+</div>
                  <div className="text-[11px] text-slate-400 font-medium">{language === 'mr' ? 'शेतकरी जोडले' : language === 'hi' ? 'किसान जुड़े' : 'Farmers Onboard'}</div>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-2xl opacity-20 animate-pulse" />
              
              <div className="relative bg-slate-900/90 border border-emerald-800/60 rounded-3xl p-6 shadow-2xl space-y-5 backdrop-blur-xl">
                
                {/* Header info */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {language === 'mr' ? 'थेट वाहतूक #AC-8842' : language === 'hi' ? 'लाइव परिवहन #AC-8842' : 'Live Shipment #AC-8842'}
                      </div>
                      <div className="text-[10px] text-slate-400">सिन्नर (नाशिक) → लासलगाव APMC</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {t('inTransit')}
                  </span>
                </div>

                {/* Live Status Gauges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-medium">{language === 'mr' ? 'हवामान व तापमान' : language === 'hi' ? 'तापमान व हवा' : 'Temp Control'}</div>
                    <div className="text-lg font-bold text-emerald-400 mt-0.5">२२.५°C <span className="text-[10px] text-emerald-500 font-normal">{language === 'mr' ? 'उत्तम' : 'Optimal'}</span></div>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-medium">{language === 'mr' ? 'अंदाजित वेळ' : language === 'hi' ? 'अनुमानित समय' : 'ETA'}</div>
                    <div className="text-lg font-bold text-amber-300 mt-0.5">१ तास ४५ मि <span className="text-[10px] text-slate-400 font-normal">{language === 'mr' ? 'वेळेवर' : 'On Track'}</span></div>
                  </div>
                </div>

                {/* Cargo Info */}
                <div className="p-3 bg-emerald-950/40 rounded-2xl border border-emerald-900/60 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-200">
                      १० टन कांदा (लाल कांदा)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">₹ ३,५०० भरलेले</span>
                </div>

                {/* AI Insight Pill */}
                <div className="p-3 rounded-2xl bg-teal-950/40 border border-teal-800/50 flex items-start space-x-2.5">
                  <Bot className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-teal-200/90 leading-snug">
                    <strong className="text-teal-300">AI मार्ग सूचना:</strong> पिंपळगाव फाट्यावरील वाहतूक कोंडी टाळण्यासाठी सिन्नर बायपास मार्ग वापरा.
                  </p>
                </div>

                {/* Track Button */}
                <button
                  onClick={() => setCurrentScreen('live-tracking')}
                  className="w-full py-3 rounded-xl bg-emerald-800/60 border border-emerald-600/50 text-emerald-200 text-xs font-bold hover:bg-emerald-700/80 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <MapPin className="w-4 h-4 text-emerald-300" />
                  <span>{t('liveTracking')}</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-900/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              {language === 'mr' ? 'प्रमुख वैशिष्ट्ये' : language === 'hi' ? 'प्रमुख विशेषताएं' : 'Key Advantages'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {language === 'mr' ? 'शेतकरी, वाहतूकदार व व्यापाऱ्यांसाठी विशेष' : language === 'hi' ? 'किसानों और ट्रांसपोर्टरों के लिए निर्मित' : 'Built for Farmers & Transporters'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              {language === 'mr' ? 'मध्यस्थांशिवाय पारदर्शक व्यवहार, सुरक्षित पीक वाहतूक आणि थेट बँक खात्यात त्वरित पैसे.' : language === 'hi' ? 'बिना बिचौलियों के पारदर्शी व्यापार, सुरक्षित फसल परिवहन और त्वरित भुगतान।' : 'Direct connections, transparent pricing, and instant UPI payouts across Maharashtra.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-emerald-700/60 transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {language === 'mr' ? 'AI स्मार्ट वाहन जुळवणी' : language === 'hi' ? 'AI स्मार्ट वाहन मिलान' : 'AI Smart Vehicle Match'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'mr' ? 'तुमच्या पिकाच्या वजनानुसार (टाटा एस, पिकअप, आयशर) योग्य वाहन लगेच उपलब्ध करा.' : language === 'hi' ? 'आपकी फसल के वजन के अनुसार उपयुक्त वाहन तुरंत खोजें।' : 'Matches produce tonnage with Tata Ace, Bolero Pickup, or Eicher trucks instantly near your farm.'}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-emerald-700/60 transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {language === 'mr' ? 'थेट GPS आणि तापमान ट्रॅकिंग' : language === 'hi' ? 'लाइव GPS और तापमान ट्रैकिंग' : 'Live GPS & Temp Tracking'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'mr' ? 'शेतातून गाडी निघाल्यापासून बाजारात पोहोचेपर्यंत थेट लोकेशन व वातावरणाची माहिती मिळवा.' : language === 'hi' ? 'खेत से निकलने से लेकर मंडी पहुंचने तक लाइव लोकेशन देखें।' : 'Track vehicle location and cargo condition in real-time right on your phone.'}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-emerald-700/60 transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {language === 'mr' ? 'लासलगाव व नाशिक APMC दर' : language === 'hi' ? 'लासलगांव एवं नासिक APMC भाव' : 'Live APMC Mandi Rates'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'mr' ? 'लासलगाव, नाशिक, पिंपळगाव APMC बाजार भाव दर १५ मिनिटांनी थेट मिळवा.' : language === 'hi' ? 'लासलगांव, नासिक, पिंपलगांव APMC मंडी भाव हर 15 मिनट में अपडेट पाएँ।' : 'Real-time price updates from Lasalgaon, Nashik, and Rahuri APMCs to maximize crop profits.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              {language === 'mr' ? 'शेतकऱ्यांचे अनुभव' : language === 'hi' ? 'किसानों के अनुभव' : 'Farmer Experiences'}
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2 font-display">
              {language === 'mr' ? 'महाराष्ट्रातील हजारो शेतकऱ्यांचा विश्वास' : language === 'hi' ? 'महाराष्ट्र के हजारों किसानों का भरोसा' : 'Trusted Across Maharashtra'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                {language === 'mr'
                  ? '"ॲग्रीकनेक्ट मुळे मला सिन्नर मधील माझ्या १० टन कांद्यासाठी योग्य भाड्यात आयशर गाडी त्वरित मिळाली. लासलगाव APMC मध्ये माल वेळेत पोहोचल्याने चांगला भाव मिळाला!"'
                  : language === 'hi'
                  ? '"एग्रीकनेक्ट की मदद से मुझे सिन्नर से लासलगांव मंडी के लिए तुरंत आइशर गाड़ी मिली। सही समय पर मंडी पहुंचने से बहुत अच्छा रेट मिला!"'
                  : '"AgriConnect helped me book an Eicher truck for my 10 Ton Onion load from Sinnar to Lasalgaon APMC. On-time delivery got me top mandi prices!"'}
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-emerald-800/60 flex items-center justify-center text-emerald-300 font-bold text-xs">
                  SP
                </div>
                <div>
                  <div className="text-xs font-bold text-white">शंकर पाटील (Shankar Patil)</div>
                  <div className="text-[10px] text-slate-400">कांदा उत्पादक शेतकरी, सिन्नर (नाशिक)</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                {language === 'mr'
                  ? '"माझ्या जय महाराष्ट्र ट्रान्सपोर्टच्या वाहनांना परतीची वाहतूक मिळणे सोपे झाले आहे. भाड्याचे पैसे थेट UPI द्वारे त्वरित जमा होतात."'
                  : language === 'hi'
                  ? '"जय महाराष्ट्र ट्रांसपोर्ट के वाहनों के लिए वापसी भाड़ा तुरंत मिल जाता है। भुगतान सीधे PhonePe / UPI द्वारा तुरंत प्राप्त होता है।"'
                  : '"Finding return loads for my transport vehicles is now effortless. Payments are deposited instantly via PhonePe UPI."'}
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-teal-800/60 flex items-center justify-center text-teal-300 font-bold text-xs">
                  SD
                </div>
                <div>
                  <div className="text-xs font-bold text-white">ज्ञानेश्वर शिंदे (Dnyaneshwar Shinde)</div>
                  <div className="text-[10px] text-slate-400">संचालक, जय महाराष्ट्र कोल्ड ट्रान्सपोर्ट, नाशिक</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white font-display">
              {language === 'mr' ? 'सतत विचारले जाणारे प्रश्न' : language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'mr' ? 'ॲग्रीकनेक्ट बद्दल अधिक माहिती.' : 'Everything you need to know about AgriConnect Maharashtra.'}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center text-sm font-semibold text-white hover:text-emerald-400"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border-t border-emerald-900/50 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            {language === 'mr' ? 'आजच आपल्या पिकासाठी वाहन बुक करा!' : language === 'hi' ? 'आज ही अपनी फसल के लिए वाहन बुक करें!' : 'Ready to Move Your Crop?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            {language === 'mr' ? 'नाशिक, सिन्नर, निफाड आणि अहिल्यानगर मधील हजारो शेतकरी व ट्रान्सपोर्टर्स सोबत जोडा.' : 'Join thousands of Maharashtra farmers streamlining harvests with AgriConnect.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentScreen('farmer-dashboard')}
              className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all cursor-pointer shadow-lg"
            >
              {t('farmerPortal')}
            </button>
            <button
              onClick={() => setCurrentScreen('transporter-dashboard')}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-xs hover:bg-slate-800 transition-all cursor-pointer"
            >
              {t('transporterHub')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

