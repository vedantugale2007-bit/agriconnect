import React, { useState } from 'react';
import {
  Sprout,
  Truck,
  ShieldCheck,
  Search,
  Bot,
  FileText,
  CreditCard,
  MapPin,
  Bell,
  Menu,
  X,
  User,
  ChevronDown,
  LayoutDashboard,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { ScreenType, UserRole, Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGE_LABELS } from '../utils/translations';

interface NavbarProps {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeShipmentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  setCurrentScreen,
  userRole,
  setUserRole,
  activeShipmentsCount,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: language === 'mr' ? 'वाहतूक #AC-8842 सिन्नर → लासलगाव' : language === 'hi' ? 'परिवहन #AC-8842 सिन्नर → लासलगांव' : 'Shipment #AC-8842 In-Transit',
      time: language === 'mr' ? '५ मिनिटांपूर्वी' : language === 'hi' ? '5 मिनट पहले' : '5 mins ago',
      text: language === 'mr' ? 'चालक ज्ञानेश्वर शिंदे: तापमान २२.५° से. वर नियंत्रित.' : language === 'hi' ? 'चालक ज्ञानेश्वर शिंदे: तापमान 22.5°C नियंत्रित।' : 'Driver Dnyaneshwar Shinde updated temperature to 22.5°C.',
    },
    {
      id: 2,
      title: language === 'mr' ? 'लासलगाव APMC बाजार भाव अपडेट' : language === 'hi' ? 'लासलगांव मंडी भाव अपडेट' : 'Mandi Price Alert',
      time: language === 'mr' ? '२० मिनिटांपूर्वी' : language === 'hi' ? '20 मिनट पहले' : '20 mins ago',
      text: language === 'mr' ? 'कांदा दर ₹ २,८०० / क्विंटल (+२.८% वाढ).' : language === 'hi' ? 'प्याज दर ₹ 2,800 / क्विंटल (+2.8% वृद्धि)।' : 'Onion rate +2.8% at Lasalgaon APMC (₹2,800/Q).',
    },
    {
      id: 3,
      title: language === 'mr' ? 'वाहतूक बुकिंग स्वीकारले' : language === 'hi' ? 'वाहन बुकिंग स्वीकृत' : 'Load Request Accepted',
      time: language === 'mr' ? '१ तासापूर्वी' : language === 'hi' ? '1 घंटे पहले' : '1 hour ago',
      text: language === 'mr' ? 'जय महाराष्ट्र कोल्ड ट्रान्सपोर्टने १० टन कांदा वाहतूक निश्चित केली.' : language === 'hi' ? 'जय महाराष्ट्र कोल्ड ट्रांसपोर्ट ने 10 टन प्याज परिवहन कंफर्म किया।' : 'Jai Maharashtra Cold Transport confirmed pickup for 10T Onion.',
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setRoleDropdownOpen(false);
    if (role === 'farmer') setCurrentScreen('farmer-dashboard');
    else if (role === 'transporter') setCurrentScreen('transporter-dashboard');
    else if (role === 'admin') setCurrentScreen('admin-dashboard');
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/50 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentScreen('home')}>
            <div className="p-2 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl shadow-lg shadow-emerald-500/20 text-emerald-950">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-display">AgriConnect</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  महाराष्ट्र
                </span>
              </div>
              <p className="text-[10px] text-emerald-300/70 font-medium hidden sm:block">{t('tagline')}</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setCurrentScreen('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentScreen === 'home'
                  ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-700/50'
                  : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              {t('home')}
            </button>

            <button
              onClick={() => {
                if (userRole === 'farmer') setCurrentScreen('farmer-dashboard');
                else if (userRole === 'transporter') setCurrentScreen('transporter-dashboard');
                else setCurrentScreen('admin-dashboard');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                ['farmer-dashboard', 'transporter-dashboard', 'admin-dashboard'].includes(currentScreen)
                  ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-700/50'
                  : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('dashboard')}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('find-transport')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentScreen === 'find-transport'
                  ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-700/50'
                  : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('findTransporters')}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('live-tracking')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentScreen === 'live-tracking'
                  ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-700/50'
                  : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('liveTracking')}</span>
              {activeShipmentsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-amber-500 text-emerald-950 rounded-full animate-pulse">
                  {activeShipmentsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentScreen('invoices')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentScreen === 'invoices' || currentScreen === 'transactions'
                  ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-700/50'
                  : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('invoices')}</span>
            </button>

            <button
              onClick={() => setCurrentScreen('ai-assistant')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                currentScreen === 'ai-assistant'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-extrabold shadow-emerald-500/20'
                  : 'bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 hover:bg-emerald-800'
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-300" />
              <span>{t('aiAssistant')}</span>
            </button>
          </nav>

          {/* Right Actions: Language Switcher, Role Switcher & Notifications */}
          <div className="flex items-center space-x-2.5">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-emerald-900/90 border border-emerald-600/70 rounded-xl text-xs font-bold text-emerald-200 hover:bg-emerald-800 transition-all shadow-sm"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{LANGUAGE_LABELS[language].native}</span>
                <ChevronDown className="w-3 h-3 text-emerald-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-emerald-950 border border-emerald-800 rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-emerald-400/80 border-b border-emerald-900">
                    {t('languageSelect')}
                  </div>
                  {(['mr', 'hi', 'en'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageSelect(lang)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-900/60 ${
                        language === lang ? 'text-amber-300 font-bold bg-emerald-900/50' : 'text-emerald-100'
                      }`}
                    >
                      <span>{LANGUAGE_LABELS[lang].native} ({LANGUAGE_LABELS[lang].name})</span>
                      {language === lang && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-800/80 text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-all relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-emerald-950 border border-emerald-800 rounded-2xl shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-800/60">
                    <span className="text-xs font-bold text-emerald-200">{t('alerts')}</span>
                    <span className="text-[10px] text-emerald-400 cursor-pointer hover:underline" onClick={() => setNotificationsOpen(false)}>{t('markAllRead')}</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2 rounded-xl bg-emerald-900/40 hover:bg-emerald-900/80 transition-all text-left">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-emerald-300">{n.title}</span>
                          <span className="text-[9px] text-emerald-400/70">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-emerald-100/80 mt-1 leading-snug">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-900/80 border border-emerald-700/60 rounded-xl text-xs font-medium text-emerald-100 hover:bg-emerald-800/80 transition-all"
              >
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span className="capitalize font-semibold">
                  {userRole === 'farmer' ? t('farmerView') : userRole === 'transporter' ? t('transporterView') : t('adminView')}
                </span>
                <ChevronDown className="w-3 h-3 text-emerald-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-emerald-950 border border-emerald-800 rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-emerald-400/80 border-b border-emerald-900">
                    {t('switchRole')}
                  </div>
                  <button
                    onClick={() => handleRoleSelect('farmer')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-900/60 ${
                      userRole === 'farmer' ? 'text-emerald-300 font-bold bg-emerald-900/40' : 'text-emerald-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t('farmerPortal')}</span>
                    </div>
                    {userRole === 'farmer' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('transporter')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-900/60 ${
                      userRole === 'transporter' ? 'text-emerald-300 font-bold bg-emerald-900/40' : 'text-emerald-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Truck className="w-3.5 h-3.5 text-teal-400" />
                      <span>{t('transporterHub')}</span>
                    </div>
                    {userRole === 'transporter' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-900/60 ${
                      userRole === 'admin' ? 'text-emerald-300 font-bold bg-emerald-900/40' : 'text-emerald-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t('adminCommand')}</span>
                    </div>
                    {userRole === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-emerald-900/80 border border-emerald-700/60 text-emerald-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 border-b border-emerald-800 px-4 py-4 space-y-2">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between p-2 bg-emerald-900/50 rounded-xl mb-2">
            <span className="text-xs font-bold text-emerald-300">{t('languageSelect')}:</span>
            <div className="flex space-x-2">
              {(['mr', 'hi', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold ${
                    language === lang ? 'bg-amber-400 text-slate-950' : 'bg-emerald-800/60 text-emerald-200'
                  }`}
                >
                  {LANGUAGE_LABELS[lang].native}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setCurrentScreen('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-emerald-100 hover:bg-emerald-900/60"
          >
            {t('home')}
          </button>
          <button
            onClick={() => {
              if (userRole === 'farmer') setCurrentScreen('farmer-dashboard');
              else if (userRole === 'transporter') setCurrentScreen('transporter-dashboard');
              else setCurrentScreen('admin-dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-emerald-100 hover:bg-emerald-900/60"
          >
            {t('dashboard')}
          </button>
          <button
            onClick={() => { setCurrentScreen('find-transport'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-emerald-100 hover:bg-emerald-900/60"
          >
            {t('findTransporters')}
          </button>
          <button
            onClick={() => { setCurrentScreen('live-tracking'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-emerald-100 hover:bg-emerald-900/60"
          >
            {t('liveTracking')}
          </button>
          <button
            onClick={() => { setCurrentScreen('invoices'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-emerald-100 hover:bg-emerald-900/60"
          >
            {t('invoices')}
          </button>
          <button
            onClick={() => { setCurrentScreen('ai-assistant'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950"
          >
            {t('aiAssistant')}
          </button>
        </div>
      )}
    </header>
  );
};

