import React from 'react';
import { Sprout, ShieldCheck, Truck, Phone, Mail, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { ScreenType } from '../types';

interface FooterProps {
  setCurrentScreen: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentScreen }) => {
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
              Pioneering intelligent agricultural logistics and cold-chain stewardship. AI-driven matching, route optimization, and loss mitigation for sustainable modern farming.
            </p>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO 22000 Cold-Chain Certified Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setCurrentScreen('farmer-dashboard')} className="hover:text-emerald-300 transition-colors flex items-center space-x-1">
                  <span>Farmer Command Center</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('transporter-dashboard')} className="hover:text-emerald-300 transition-colors flex items-center space-x-1">
                  <span>Transporter Fleet Hub</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('find-transport')} className="hover:text-emerald-300 transition-colors flex items-center space-x-1">
                  <span>Find Available Carriers</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('ai-assistant')} className="hover:text-emerald-300 transition-colors flex items-center space-x-1">
                  <span>AI Crop Loss Predictor</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform & Legal</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setCurrentScreen('invoices')} className="hover:text-emerald-300 transition-colors">
                  Digital Tax Invoices
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('live-tracking')} className="hover:text-emerald-300 transition-colors">
                  GPS Live Telemetry
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('admin-dashboard')} className="hover:text-emerald-300 transition-colors">
                  Admin Verification Portal
                </button>
              </li>
              <li>
                <span className="text-emerald-400/60 cursor-not-allowed">Terms of Service & Insurance Cover</span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support 24/7</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-emerald-200">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>१८००-२३३-कृषी (1800-233-2474) / +91 98221 11002</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@agriconnect.in</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>पंचवटी MIDC, नाशिक-पुणे महामार्ग, नाशिक, महाराष्ट्र ४२२००३</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>मराठी / हिंदी / English २४/७ मदत केंद्र</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-emerald-400/60">
          <p>© {new Date().getFullYear()} AgriConnect Inc. Intelligent Stewardship Platform. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
            <span className="hover:text-emerald-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-emerald-300 cursor-pointer">Cold Chain Policy</span>
            <span className="hover:text-emerald-300 cursor-pointer">Sustainability Report</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
