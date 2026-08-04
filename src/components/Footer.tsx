import React from 'react';
import { Sprout, ShieldCheck, Phone, Mail, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { ScreenType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAssistant } from '../context/AssistantContext';

interface FooterProps {
  setCurrentScreen: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentScreen }) => {
  const { tr, ln } = useLanguage();
  const { openAssistant } = useAssistant();

  return (
    <footer className="bg-emerald-950 text-emerald-100/80 border-t border-emerald-900 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentScreen('home')}>
              <div className="p-2 bg-emerald-500 rounded-xl text-emerald-950 font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white font-display">AgriConnect</span>
            </div>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              {tr({
                mr: 'बुद्धिमान कृषी लॉजिस्टिक्स व शीतगृह व्यवस्थापन. एआय आधारित वाहन जुळवणी, मार्ग नियोजन आणि पीक नुकसान कमी करण्यासाठी.',
                hi: 'स्मार्ट कृषि लॉजिस्टिक्स एवं कोल्ड-चेन प्रबंधन। एआई आधारित वाहन मिलान, मार्ग अनुकूलन और फसल नुकसान न्यूनीकरण।',
                en: 'Intelligent agricultural logistics and cold-chain stewardship. AI-driven matching, route optimization, and loss mitigation for modern farming.',
              })}
            </p>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{tr({ mr: 'ISO 22000 शीतगृह प्रमाणित प्लॅटफॉर्म', hi: 'ISO 22000 कोल्ड-चेन प्रमाणित प्लेटफॉर्म', en: 'ISO 22000 Cold-Chain Certified Platform' })}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{tr({ mr: 'उपाय', hi: 'समाधान', en: 'Solutions' })}</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setCurrentScreen('farmer-dashboard')} className="hover:text-emerald-300 transition-colors flex items-center space-x-1">
                  <span>{tr({ mr: 'शेतकरी कमांड सेंटर', hi: 'किसान कमांड सेंटर', en: 'Farmer Command Center' })}</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('transporter-dashboard')} className="hover:text-emerald-300 transition-colors flex items-center space-x-1">
                  <span>{tr({ mr: 'वाहतूकदार फ्लीट हब', hi: 'ट्रांसपोर्टर फ्लीट हब', en: 'Transporter Fleet Hub' })}</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('find-transport')} className="hover:text-emerald-300 transition-colors flex items-center space-x-1">
                  <span>{tr({ mr: 'उपलब्ध वाहतूकदार शोधा', hi: 'उपलब्ध ट्रांसपोर्टर खोजें', en: 'Find Available Carriers' })}</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                </button>
              </li>
              <li>
                <button onClick={openAssistant} className="hover:text-emerald-300 transition-colors flex items-center space-x-1">
                  <span>{tr({ mr: 'एआय पीक नुकसान सल्लागार', hi: 'एआई फसल नुकसान सलाहकार', en: 'AI Crop Loss Advisor' })}</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{tr({ mr: 'प्लॅटफॉर्म व कायदेशीर', hi: 'प्लेटफॉर्म व कानूनी', en: 'Platform & Legal' })}</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setCurrentScreen('invoices')} className="hover:text-emerald-300 transition-colors">
                  {tr({ mr: 'डिजिटल कर पावत्या', hi: 'डिजिटल कर चालान', en: 'Digital Tax Invoices' })}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('live-tracking')} className="hover:text-emerald-300 transition-colors">
                  {tr({ mr: 'जीपीएस थेट ट्रॅकिंग', hi: 'जीपीएस लाइव ट्रैकिंग', en: 'GPS Live Telemetry' })}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('admin-dashboard')} className="hover:text-emerald-300 transition-colors">
                  {tr({ mr: 'प्रशासकीय पडताळणी पोर्टल', hi: 'प्रशासनिक सत्यापन पोर्टल', en: 'Admin Verification Portal' })}
                </button>
              </li>
              <li>
                <span className="text-emerald-400/60 cursor-not-allowed">{tr({ mr: 'सेवा अटी व विमा कवच', hi: 'सेवा शर्तें व बीमा कवर', en: 'Terms of Service & Insurance Cover' })}</span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{tr({ mr: '२४/७ मदत', hi: '24/7 सहायता', en: 'Support 24/7' })}</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-emerald-200">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{ln('1800-233-2474')} / +91 98221 11002</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@agriconnect.in</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{tr({ mr: 'पंचवटी एमआयडीसी, नाशिक-पुणे महामार्ग, नाशिक ४२२००३', hi: 'पंचवटी एमआईडीसी, नासिक-पुणे राजमार्ग, नासिक 422003', en: 'Panchavati MIDC, Nashik-Pune Highway, Nashik 422003' })}</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{tr({ mr: 'मराठी / हिंदी / इंग्रजी २४/७ मदत केंद्र', hi: 'मराठी / हिंदी / अंग्रेजी 24/7 सहायता केंद्र', en: 'Marathi / Hindi / English 24/7 Help Center' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-emerald-400/60">
          <p>© {ln(new Date().getFullYear())} AgriConnect Inc. {tr({ mr: 'सर्व हक्क राखीव.', hi: 'सर्वाधिकार सुरक्षित।', en: 'All rights reserved.' })}</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
            <span className="hover:text-emerald-300 cursor-pointer">{tr({ mr: 'गोपनीयता धोरण', hi: 'गोपनीयता नीति', en: 'Privacy Policy' })}</span>
            <span className="hover:text-emerald-300 cursor-pointer">{tr({ mr: 'शीतगृह धोरण', hi: 'कोल्ड चेन नीति', en: 'Cold Chain Policy' })}</span>
            <span className="hover:text-emerald-300 cursor-pointer">{tr({ mr: 'शाश्वतता अहवाल', hi: 'स्थिरता रिपोर्ट', en: 'Sustainability Report' })}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
