import React, { useState } from 'react';
import {
  Sprout,
  Truck,
  TrendingUp,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Bot,
  Star,
  Zap,
} from 'lucide-react';
import { ScreenType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAssistant } from '../../context/AssistantContext';

interface HomeScreenProps {
  setCurrentScreen: (screen: ScreenType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ setCurrentScreen }) => {
  const { t, tr, ln } = useLanguage();
  const { openAssistant } = useAssistant();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: tr({
        mr: 'ॲग्रीकनेक्ट शेतकऱ्यांना स्थानिक वाहतूकदारांशी कसे जोडते?',
        hi: 'एग्रीकनेक्ट किसानों को स्थानीय ट्रांसपोर्टरों से कैसे जोड़ता है?',
        en: 'How does AgriConnect match farmers with local transporters?',
      }),
      a: tr({
        mr: 'ॲग्रीकनेक्टचे एआय मॉडेल पिकाचा प्रकार, वजन, पिकअप ठिकाण आणि हवामान लक्षात घेऊन नाशिक व अहिल्यानगरमधील जवळचे प्रमाणित वाहतूकदार त्वरित जोडते.',
        hi: 'एग्रीकनेक्ट का एआई मॉडल फसल का प्रकार, वजन, पिकअप स्थान और मौसम देखकर नासिक व अहिल्यानगर के निकटतम प्रमाणित ट्रांसपोर्टर तुरंत जोड़ता है।',
        en: 'AgriConnect uses real-time AI to match crop type, weight, pickup location, and weather with certified local transporters across Nashik and Ahilyanagar.',
      }),
    },
    {
      q: tr({
        mr: 'एआय पीक नुकसान अंदाज कसा काम करतो?',
        hi: 'एआई फसल नुकसान अनुमान कैसे काम करता है?',
        en: 'What is the AI Crop Loss Estimator?',
      }),
      a: tr({
        mr: 'आमचे एआय मॉडेल तापमान, वाहतूक अंतर आणि कांदा/द्राक्षे/टोमॅटोचा श्वसन दर विश्लेषित करून माल खराब होण्याचा धोका दाखवते.',
        hi: 'हमारा एआई मॉडल तापमान, दूरी और प्याज/अंगूर/टमाटर की श्वसन दर का विश्लेषण कर फसल नुकसान जोखिम बताता है।',
        en: 'Our AI model analyzes weather, transit distance, and crop respiration index to predict spoilage risk for Onions, Grapes, and Tomatoes.',
      }),
    },
    {
      q: tr({
        mr: 'वाहतुकीदरम्यान मालाचा विमा असतो का?',
        hi: 'क्या परिवहन के दौरान माल का बीमा होता है?',
        en: 'Are cargo shipments insured during transport?',
      }),
      a: tr({
        mr: 'होय! ॲग्रीकनेक्टवरील प्रत्येक बुकिंगसोबत ₹ ५,००,००० पर्यंत प्रमाणित पीक विमा कवच मिळते.',
        hi: 'हां! एग्रीकनेक्ट पर हर बुकिंग के साथ ₹ 5,00,000 तक का प्रमाणित फसल बीमा कवर मिलता है।',
        en: 'Yes, every booking on AgriConnect includes verified cargo insurance cover up to ₹5,00,000 against temperature loss or transit delays.',
      }),
    },
    {
      q: tr({
        mr: 'एपीएमसी बाजार भाव कसे अपडेट होतात?',
        hi: 'एपीएमसी मंडी भाव कैसे अपडेट होते हैं?',
        en: 'How do Mandi Market Prices get updated?',
      }),
      a: tr({
        mr: 'लासलगाव, नाशिक, पिंपळगाव आणि राहुरी एपीएमसीकडून दर १५ मिनिटांनी थेट बाजारभाव अपडेट केले जातात.',
        hi: 'लासलगांव, नासिक, पिंपलगांव और राहुरी एपीएमसी से हर 15 मिनट में लाइव मंडी भाव अपडेट किए जाते हैं।',
        en: 'Prices sync directly from major APMCs (Lasalgaon, Nashik, Pimpalgaon, Rahuri) every 15 minutes.',
      }),
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
                <span>{t('heroBadge')}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display text-balance">
                {t('heroTitleLead')} <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  {t('heroTitleAccent')}
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed text-pretty">
                {t('heroSub')}
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
                  onClick={openAssistant}
                  className="px-5 py-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 font-semibold text-sm hover:bg-emerald-900 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span>{t('askAiAssistant')}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-display">{ln(25000)}+</div>
                  <div className="text-[11px] text-slate-400 font-medium">{tr({ mr: 'टन वाहतूक पूर्ण', hi: 'टन परिवहन पूर्ण', en: 'Tonnes Moved' })}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-display">{ln('99.4')}%</div>
                  <div className="text-[11px] text-slate-400 font-medium">{tr({ mr: 'सुरक्षित वितरण', hi: 'सुरक्षित वितरण', en: 'Safe Delivery Rate' })}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-amber-300 font-display">{ln(15000)}+</div>
                  <div className="text-[11px] text-slate-400 font-medium">{tr({ mr: 'शेतकरी जोडले', hi: 'किसान जुड़े', en: 'Farmers Onboard' })}</div>
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
                        {tr({ mr: 'थेट वाहतूक #AC-8842', hi: 'लाइव शिपमेंट #AC-8842', en: 'Live Shipment #AC-8842' })}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {tr({ mr: 'सिन्नर (नाशिक) → लासलगाव एपीएमसी', hi: 'सिन्नर (नासिक) → लासलगांव एपीएमसी', en: 'Sinnar (Nashik) → Lasalgaon APMC' })}
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {t('inTransit')}
                  </span>
                </div>

                {/* Live Status Gauges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-medium">{tr({ mr: 'तापमान नियंत्रण', hi: 'तापमान नियंत्रण', en: 'Temp Control' })}</div>
                    <div className="text-lg font-bold text-emerald-400 mt-0.5">{ln('22.5')}°C <span className="text-[10px] text-emerald-500 font-normal">{tr({ mr: 'उत्तम', hi: 'उत्तम', en: 'Optimal' })}</span></div>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-medium">{tr({ mr: 'अंदाजित वेळ', hi: 'अनुमानित समय', en: 'ETA' })}</div>
                    <div className="text-lg font-bold text-amber-300 mt-0.5">{tr({ mr: '१ ता ४५ मि', hi: '1 घं 45 मि', en: '1h 45m' })} <span className="text-[10px] text-slate-400 font-normal">{tr({ mr: 'वेळेवर', hi: 'समय पर', en: 'On Track' })}</span></div>
                  </div>
                </div>

                {/* Cargo Info */}
                <div className="p-3 bg-emerald-950/40 rounded-2xl border border-emerald-900/60 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-200">
                      {tr({ mr: '१० टन कांदा (लाल कांदा)', hi: '10 टन प्याज (लाल प्याज)', en: '10 Tons Onion (Red Onion)' })}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">₹ {ln(3500)} {tr({ mr: 'भरले', hi: 'भुगतान', en: 'Paid' })}</span>
                </div>

                {/* AI Insight Pill */}
                <div className="p-3 rounded-2xl bg-teal-950/40 border border-teal-800/50 flex items-start space-x-2.5">
                  <Bot className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-teal-200/90 leading-snug">
                    <strong className="text-teal-300">{tr({ mr: 'एआय मार्ग सूचना: ', hi: 'एआई मार्ग सुझाव: ', en: 'AI route tip: ' })}</strong>
                    {tr({
                      mr: 'पिंपळगाव फाट्यावरील वाहतूक कोंडी टाळण्यासाठी सिन्नर बायपास वापरा.',
                      hi: 'पिंपलगांव जंक्शन का ट्रैफिक टालने के लिए सिन्नर बायपास लें।',
                      en: 'Take the Sinnar bypass to avoid congestion at Pimpalgaon junction.',
                    })}
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
              {tr({ mr: 'प्रमुख वैशिष्ट्ये', hi: 'प्रमुख विशेषताएं', en: 'Key Advantages' })}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display text-balance">
              {tr({ mr: 'शेतकरी व वाहतूकदारांसाठी खास', hi: 'किसानों और ट्रांसपोर्टरों के लिए निर्मित', en: 'Built for Farmers & Transporters' })}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 text-pretty">
              {tr({ mr: 'मध्यस्थांशिवाय पारदर्शक व्यवहार, सुरक्षित पीक वाहतूक आणि थेट युपीआय पेमेंट.', hi: 'बिना बिचौलियों के पारदर्शी व्यापार, सुरक्षित फसल परिवहन और त्वरित यूपीआई भुगतान।', en: 'Direct connections, transparent pricing, and instant UPI payouts across Maharashtra.' })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Feature 1 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-emerald-700/60 transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {tr({ mr: 'एआय स्मार्ट वाहन जुळवणी', hi: 'एआई स्मार्ट वाहन मिलान', en: 'AI Smart Vehicle Match' })}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {tr({ mr: 'तुमच्या पिकाच्या वजनानुसार (टाटा एस, बोलेरो पिकअप, आयशर) योग्य वाहन त्वरित शोधा.', hi: 'आपकी फसल के वजन के अनुसार सही वाहन (टाटा एस, बोलेरो पिकअप, आयशर) तुरंत खोजें।', en: 'Matches produce tonnage with Tata Ace, Bolero Pickup, or Eicher trucks instantly near your farm.' })}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-emerald-700/60 transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {tr({ mr: 'थेट जीपीएस व तापमान ट्रॅकिंग', hi: 'लाइव जीपीएस व तापमान ट्रैकिंग', en: 'Live GPS & Temp Tracking' })}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {tr({ mr: 'शेतातून गाडी निघाल्यापासून बाजारात पोहोचेपर्यंत थेट लोकेशन व वातावरण पहा.', hi: 'खेत से निकलने से मंडी पहुंचने तक लाइव लोकेशन व स्थिति देखें।', en: 'Track vehicle location and cargo condition in real-time right on your phone.' })}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-emerald-700/60 transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {tr({ mr: 'थेट एपीएमसी बाजार भाव', hi: 'लाइव एपीएमसी मंडी भाव', en: 'Live APMC Mandi Rates' })}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {tr({ mr: 'लासलगाव, नाशिक व राहुरी एपीएमसी बाजार भाव दर १५ मिनिटांनी थेट मिळवा.', hi: 'लासलगांव, नासिक व राहुरी एपीएमसी भाव हर 15 मिनट में लाइव पाएं।', en: 'Real-time price updates from Lasalgaon, Nashik, and Rahuri APMCs to maximize crop profits.' })}
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
              {tr({ mr: 'शेतकऱ्यांचे अनुभव', hi: 'किसानों के अनुभव', en: 'Farmer Experiences' })}
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2 font-display text-balance">
              {tr({ mr: 'महाराष्ट्रातील हजारो शेतकऱ्यांचा विश्वास', hi: 'महाराष्ट्र के हजारों किसानों का भरोसा', en: 'Trusted Across Maharashtra' })}
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
                {tr({
                  mr: '"ॲग्रीकनेक्टमुळे सिन्नरमधील माझ्या १० टन कांद्यासाठी योग्य भाड्यात आयशर गाडी त्वरित मिळाली. लासलगाव एपीएमसीत वेळेत पोहोचल्याने चांगला भाव मिळाला!"',
                  hi: '"एग्रीकनेक्ट से सिन्नर में मेरे 10 टन प्याज के लिए सही भाड़े में आयशर गाड़ी तुरंत मिली। लासलगांव एपीएमसी समय पर पहुंचने से अच्छा भाव मिला!"',
                  en: '"AgriConnect helped me book an Eicher truck for my 10 Ton onion load from Sinnar to Lasalgaon APMC. On-time delivery got me top mandi prices!"',
                })}
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-emerald-800/60 flex items-center justify-center text-emerald-300 font-bold text-xs">SP</div>
                <div>
                  <div className="text-xs font-bold text-white">{tr({ mr: 'शंकर पाटील', hi: 'शंकर पाटिल', en: 'Shankar Patil' })}</div>
                  <div className="text-[10px] text-slate-400">{tr({ mr: 'कांदा उत्पादक शेतकरी, सिन्नर (नाशिक)', hi: 'प्याज उत्पादक किसान, सिन्नर (नासिक)', en: 'Onion farmer, Sinnar (Nashik)' })}</div>
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
                {tr({
                  mr: '"माझ्या ट्रान्सपोर्टच्या वाहनांना परतीचे भाडे मिळणे सोपे झाले आहे. पैसे थेट युपीआयद्वारे त्वरित जमा होतात."',
                  hi: '"मेरे ट्रांसपोर्ट वाहनों को वापसी भाड़ा आसानी से मिल जाता है। भुगतान सीधे यूपीआई से तुरंत आ जाता है।"',
                  en: '"Finding return loads for my transport vehicles is now effortless. Payments are deposited instantly via UPI."',
                })}
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-teal-800/60 flex items-center justify-center text-teal-300 font-bold text-xs">DS</div>
                <div>
                  <div className="text-xs font-bold text-white">{tr({ mr: 'ज्ञानेश्वर शिंदे', hi: 'ज्ञानेश्वर शिंदे', en: 'Dnyaneshwar Shinde' })}</div>
                  <div className="text-[10px] text-slate-400">{tr({ mr: 'संचालक, जय महाराष्ट्र कोल्ड ट्रान्सपोर्ट, नाशिक', hi: 'संचालक, जय महाराष्ट्र कोल्ड ट्रांसपोर्ट, नासिक', en: 'Owner, Jai Maharashtra Cold Transport, Nashik' })}</div>
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
            <h2 className="text-3xl font-extrabold text-white font-display text-balance">
              {tr({ mr: 'वारंवार विचारले जाणारे प्रश्न', hi: 'अक्सर पूछे जाने वाले प्रश्न', en: 'Frequently Asked Questions' })}
            </h2>
            <p className="text-xs text-slate-400">
              {tr({ mr: 'ॲग्रीकनेक्ट महाराष्ट्रबद्दल तुम्हाला हवी असलेली माहिती.', hi: 'एग्रीकनेक्ट महाराष्ट्र के बारे में आवश्यक जानकारी।', en: 'Everything you need to know about AgriConnect Maharashtra.' })}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all">
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display text-balance">
            {tr({ mr: 'आजच आपल्या पिकासाठी वाहन बुक करा!', hi: 'आज ही अपनी फसल के लिए वाहन बुक करें!', en: 'Ready to Move Your Crop?' })}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto text-pretty">
            {tr({ mr: 'नाशिक, सिन्नर, निफाड व अहिल्यानगरमधील हजारो शेतकरी व वाहतूकदारांसोबत जोडा.', hi: 'नासिक, सिन्नर, निफाड व अहिल्यानगर के हजारों किसानों व ट्रांसपोर्टरों से जुड़ें।', en: 'Join thousands of Maharashtra farmers and transporters streamlining harvests with AgriConnect.' })}
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
