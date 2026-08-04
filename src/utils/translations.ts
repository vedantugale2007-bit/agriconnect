import { Language } from '../types';

export const LANGUAGE_LABELS: Record<Language, { native: string; name: string }> = {
  mr: { native: 'मराठी', name: 'Marathi' },
  hi: { native: 'हिंदी', name: 'Hindi' },
  en: { native: 'English', name: 'English' },
};

// Crop translations mapping
export const CROP_TRANSLATIONS: Record<string, Record<Language, string>> = {
  Onion: { mr: 'कांदा', hi: 'प्याज', en: 'Onion' },
  Grapes: { mr: 'द्राक्षे', hi: 'अंगूर', en: 'Grapes' },
  Tomato: { mr: 'टोमॅटो', hi: 'टमाटर', en: 'Tomato' },
  Pomegranate: { mr: 'डाळिंब', hi: 'अनार', en: 'Pomegranate' },
  Sugarcane: { mr: 'ऊस', hi: 'गन्ना', en: 'Sugarcane' },
  Soybean: { mr: 'सोयाबीन', hi: 'सोयाबीन', en: 'Soybean' },
  Wheat: { mr: 'गहू', hi: 'गेहूं', en: 'Wheat' },
  Maize: { mr: 'मका', hi: 'मक्का', en: 'Maize' },
  'Fresh Tomatoes': { mr: 'ताजे टोमॅटो', hi: 'ताजे टमाटर', en: 'Fresh Tomatoes' },
  'Export Grapes': { mr: 'निर्यात द्राक्षे', hi: 'निर्यात अंगूर', en: 'Export Grapes' },
};

// Vehicle translations mapping
export const VEHICLE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'Tata Ace Gold': { mr: 'टाटा एस गोल्ड', hi: 'टाटा एस गोल्ड', en: 'Tata Ace Gold' },
  'Mahindra Bolero Pickup': { mr: 'महिंद्रा बोलेरो पिकअप', hi: 'महिंद्रा बोलेरो पिकअप', en: 'Mahindra Bolero Pickup' },
  'Mahindra Jeeto': { mr: 'महिंद्रा जितो', hi: 'महिंद्रा जीतो', en: 'Mahindra Jeeto' },
  'Ashok Leyland Dost': { mr: 'अशोक लेलँड दोस्त', hi: 'अशोक लेलैंड दोस्त', en: 'Ashok Leyland Dost' },
  'Eicher 14 ft': { mr: 'आयशर १४ फूट', hi: 'आयशर 14 फीट', en: 'Eicher 14 ft' },
  'BharatBenz Truck': { mr: 'भारतबेंझ ट्रक', hi: 'भारतबेंज ट्रक', en: 'BharatBenz Truck' },
  'Tata 407': { mr: 'टाटा ४०७', hi: 'टाटा 407', en: 'Tata 407' },
};

// APMC Market translations
export const MARKET_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'Lasalgaon APMC': { mr: 'लासलगाव एपीएमसी', hi: 'लासलगांव एपीएमसी', en: 'Lasalgaon APMC' },
  'Nashik APMC': { mr: 'नाशिक एपीएमसी', hi: 'नासिक एपीएमसी', en: 'Nashik APMC' },
  'Pimpalgaon Baswant APMC': { mr: 'पिंपळगाव बसवंत एपीएमसी', hi: 'पिंपलगांव बसवंत एपीएमसी', en: 'Pimpalgaon Baswant APMC' },
  'Ahilyanagar Market': { mr: 'अहिल्यानगर बाजार', hi: 'अहिल्यानगर मंडी', en: 'Ahilyanagar Market' },
  'Pune Market Yard': { mr: 'पुणे मार्केट यार्ड', hi: 'पुणे मार्केट यार्ड', en: 'Pune Market Yard' },
  'Sangamner Market': { mr: 'संगमनेर बाजार', hi: 'संगमनेर मंडी', en: 'Sangamner Market' },
  'Kopargaon Market': { mr: 'कोपरगाव बाजार', hi: 'कोपरगांव मंडी', en: 'Kopargaon Market' },
  'Rahuri Market': { mr: 'राहुरी बाजार', hi: 'राहुरी मंडी', en: 'Rahuri Market' },
  'Yeola Market': { mr: 'येवला बाजार', hi: 'येवला मंडी', en: 'Yeola Market' },
};

// Region / district translations
export const REGION_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'Nashik District': { mr: 'नाशिक जिल्हा', hi: 'नासिक जिला', en: 'Nashik District' },
  'Ahilyanagar District': { mr: 'अहिल्यानगर जिल्हा', hi: 'अहिल्यानगर जिला', en: 'Ahilyanagar District' },
};

// UI Text Translation Dictionaries
const UI_STRINGS: Record<string, Record<Language, string>> = {
  // Navigation & General
  appName: { mr: 'ॲग्रीकनेक्ट महाराष्ट्र', hi: 'एग्रीकनेक्ट महाराष्ट्र', en: 'AgriConnect Maharashtra' },
  brandRegion: { mr: 'महाराष्ट्र', hi: 'महाराष्ट्र', en: 'Maharashtra' },
  tagline: { mr: 'बुद्धिमान कृषी लॉजिस्टिक्स व शीतगृह साखळी', hi: 'स्मार्ट कृषि लॉजिस्टिक्स एवं कोल्ड-चेन नेटवर्क', en: 'Intelligent Agricultural Logistics & Cold-Chain Network' },
  home: { mr: 'मुख्य पृष्ठ', hi: 'होम', en: 'Home' },
  dashboard: { mr: 'डॅशबोर्ड', hi: 'डैशबोर्ड', en: 'Dashboard' },
  findTransporters: { mr: 'वाहतूकदार शोधा', hi: 'ट्रांसपोर्टर खोजें', en: 'Find Transporters' },
  liveTracking: { mr: 'थेट ट्रॅकिंग', hi: 'लाइव ट्रैकिंग', en: 'Live Tracking' },
  invoices: { mr: 'जीएसटी बिले', hi: 'जीएसटी बिल', en: 'Invoices' },
  aiAssistant: { mr: 'कृषी एआय सहाय्यक', hi: 'कृषि एआई सहायक', en: 'Agri AI Assistant' },
  alerts: { mr: 'सूचना व अपडेट्स', hi: 'अधिसूचनाएं एवं अपडेट', en: 'Alerts & Updates' },
  markAllRead: { mr: 'सर्व वाचले म्हणून दाखवा', hi: 'सभी पढ़ा हुआ चिह्नित करें', en: 'Mark all read' },
  switchRole: { mr: 'भूमिका बदला', hi: 'रोल बदलें', en: 'Switch Perspective' },
  farmerPortal: { mr: 'शेतकरी पोर्टल', hi: 'किसान पोर्टल', en: 'Farmer Portal' },
  transporterHub: { mr: 'वाहतूकदार केंद्र', hi: 'ट्रांसपोर्टर हब', en: 'Transporter Hub' },
  adminCommand: { mr: 'प्रशासकीय नियंत्रण', hi: 'एडमिन कंट्रोल', en: 'Admin Command' },
  farmerView: { mr: 'शेतकरी दृश्य', hi: 'किसान दृश्य', en: 'Farmer View' },
  transporterView: { mr: 'वाहतूकदार दृश्य', hi: 'ट्रांसपोर्टर दृश्य', en: 'Transporter View' },
  adminView: { mr: 'प्रशासक दृश्य', hi: 'एडमिन दृश्य', en: 'Admin View' },
  languageSelect: { mr: 'भाषा निवडा', hi: 'भाषा चुनें', en: 'Language' },
  notifications: { mr: 'सूचना', hi: 'सूचनाएं', en: 'Notifications' },

  // Shared field labels
  cropType: { mr: 'पिकाचा प्रकार', hi: 'फसल का प्रकार', en: 'Crop Type' },
  weightKg: { mr: 'वजन', hi: 'वजन', en: 'Weight' },
  vehicleRequired: { mr: 'आवश्यक वाहन', hi: 'आवश्यक वाहन', en: 'Vehicle Required' },
  pickupLocation: { mr: 'पिकअप ठिकाण', hi: 'पिकअप स्थान', en: 'Pickup Location' },
  destinationLocation: { mr: 'गंतव्य ठिकाण', hi: 'गंतव्य स्थान', en: 'Destination' },
  totalPayable: { mr: 'एकूण देय रक्कम', hi: 'कुल देय राशि', en: 'Total Payable' },
  inTransit: { mr: 'मार्गस्थ', hi: 'रास्ते में', en: 'In-Transit' },
  callDriver: { mr: 'चालकाला कॉल करा', hi: 'चालक को कॉल करें', en: 'Call Driver' },
  ton: { mr: 'टन', hi: 'टन', en: 'Tons' },
  kg: { mr: 'किग्रा', hi: 'किग्रा', en: 'Kg' },
  km: { mr: 'किमी', hi: 'किमी', en: 'Km' },
  quintal: { mr: 'क्विंटल', hi: 'क्विंटल', en: 'Quintal' },

  // Hero Section
  heroBadge: { mr: 'महाराष्ट्र कृषी व वाहतूक डिजिटल नेटवर्क', hi: 'महाराष्ट्र कृषि एवं परिवहन डिजिटल नेटवर्क', en: 'Maharashtra Agri Logistics Network' },
  heroTitleLead: { mr: 'महाराष्ट्रातील शेतकऱ्यांसाठी', hi: 'महाराष्ट्र के किसानों के लिए', en: 'Intelligent Supply Chain For' },
  heroTitleAccent: { mr: 'स्मार्ट कृषी वाहतूक यंत्रणा', hi: 'स्मार्ट कृषि परिवहन प्रणाली', en: 'Maharashtra Farmers & Transporters' },
  heroSub: { mr: 'नाशिक व अहिल्यानगर जिल्ह्यातील प्रमाणित वाहतूकदारांशी थेट जोडा, जेमिनी एआय द्वारे पिकांचे नुकसान टाळा आणि लासलगाव एपीएमसीसह सर्व प्रमुख बाजारांचे थेट भाव एकाच ठिकाणी मिळवा.', hi: 'नासिक और अहिल्यानगर जिले के प्रमाणित ट्रांसपोर्टरों से सीधे जुड़ें, जेमिनी एआई से फसल नुकसान से बचें और लासलगांव एपीएमसी सहित सभी प्रमुख मंडियों के लाइव भाव एक ही जगह पाएं।', en: 'Connect directly with certified Maharashtra transporters, eliminate crop spoilage with real-time Gemini AI risk analysis, and access live APMC Mandi rates in one dashboard.' },
  bookTransport: { mr: 'वाहन बुक करा', hi: 'वाहन बुक करें', en: 'Start Shipping Crop' },
  viewMandiPrices: { mr: 'एपीएमसी बाजार भाव पहा', hi: 'एपीएमसी मंडी भाव देखें', en: 'View Mandi Rates' },
  askAiAssistant: { mr: 'एआय सहाय्यकास विचारा', hi: 'एआई सहायक से पूछें', en: 'Ask AI Assistant' },

  // Farmer Dashboard
  farmerDashboardSub: { mr: 'सिन्नर-निफाड कृषी पट्टा, नाशिक जिल्हा', hi: 'सिन्नर-निफाड कृषि क्षेत्र, नासिक जिला', en: 'Sinnar-Niphad Agri Belt, Nashik District' },
  postNewLoad: { mr: 'नवीन माल नोंदवा', hi: 'नई फसल दर्ज करें', en: 'Post New Crop Load' },
  searchTransporters: { mr: 'वाहतूकदार शोधा', hi: 'ट्रांसपोर्टर खोजें', en: 'Find Transporters' },
  totalBookings: { mr: 'एकूण बुकिंग्स', hi: 'कुल बुकिंग', en: 'Total Bookings' },
  activeShipments: { mr: 'सक्रिय वाहतूक', hi: 'सक्रिय शिपमेंट', en: 'Active Shipments' },
  savedCropLoss: { mr: 'वाचवलेले नुकसान', hi: 'बचाया गया नुकसान', en: 'Saved Crop Loss' },
  apmcMandis: { mr: 'बाजार समित्या', hi: 'एपीएमसी मंडियां', en: 'APMC Mandis' },
  mandiPrices: { mr: 'थेट एपीएमसी बाजार भाव', hi: 'लाइव एपीएमसी मंडी भाव', en: 'Live APMC Mandi Rates' },
  mandiSubtitle: { mr: 'नाशिक व अहिल्यानगर मधील प्रमुख बाजार समित्या', hi: 'नासिक व अहिल्यानगर की प्रमुख मंडियां', en: 'Major APMC markets in Nashik & Ahilyanagar' },
  liveSync: { mr: 'थेट अपडेट', hi: 'लाइव सिंक', en: 'Live Sync' },
  lossEstimator: { mr: 'एआय पीक नुकसान अंदाज', hi: 'एआई फसल नुकसान अनुमान', en: 'AI Crop Loss Estimator' },
  geminiPowered: { mr: 'जेमिनी एआय द्वारे संचालित', hi: 'जेमिनी एआई द्वारा संचालित', en: 'Powered by Gemini AI' },
  calculateRisk: { mr: 'नुकसान धोका मोजा', hi: 'नुकसान जोखिम जांचें', en: 'Predict Loss Risk' },
  spoilageRisk: { mr: 'खराब होण्याचा धोका', hi: 'खराब होने का जोखिम', en: 'Spoilage Risk' },
  analyzing: { mr: 'विश्लेषण सुरू आहे...', hi: 'विश्लेषण जारी है...', en: 'Analyzing...' },

  // Transporter Dashboard
  transporterDashboard: { mr: 'वाहतूकदार फ्लीट हब', hi: 'ट्रांसपोर्टर फ्लीट हब', en: 'Transporter Fleet Hub' },
  transporterSub: { mr: 'जय महाराष्ट्र लॉजिस्टिक्स • नोंदणी क्र. MH-15-2024', hi: 'जय महाराष्ट्र लॉजिस्टिक्स • पंजीकरण क्र. MH-15-2024', en: 'Jai Maharashtra Logistics • Reg. No. MH-15-2024' },
  totalEarnings: { mr: 'एकूण कमाई', hi: 'कुल कमाई', en: 'Total Earnings' },

  // Admin Dashboard
  adminDashboard: { mr: 'प्रशासकीय पडताळणी नियंत्रण कक्ष', hi: 'प्रशासनिक सत्यापन नियंत्रण कक्ष', en: 'Admin Verification Command Center' },
  adminSub: { mr: 'महाराष्ट्र राज्य कृषी लॉजिस्टिक्स नियंत्रण कक्ष (नाशिक व अहिल्यानगर)', hi: 'महाराष्ट्र राज्य कृषि लॉजिस्टिक्स नियंत्रण कक्ष (नासिक व अहिल्यानगर)', en: 'Maharashtra State Agri Logistics Control (Nashik & Ahilyanagar)' },

  // Reset / misc
  reset: { mr: 'रीसेट', hi: 'रीसेट', en: 'Reset' },
};

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export const localizeNumber = (value: number | string, lang: Language): string => {
  const raw = typeof value === 'number' ? value.toLocaleString('en-IN') : String(value);
  if (lang === 'en') return raw;
  return raw.replace(/[0-9]/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
};

export const t = (key: string, lang: Language): string => {
  if (UI_STRINGS[key] && UI_STRINGS[key][lang]) {
    return UI_STRINGS[key][lang];
  }
  if (UI_STRINGS[key] && UI_STRINGS[key]['en']) {
    return UI_STRINGS[key]['en'];
  }
  return key;
};

export const getCropName = (cropKey: string, lang: Language): string => {
  if (CROP_TRANSLATIONS[cropKey] && CROP_TRANSLATIONS[cropKey][lang]) {
    return CROP_TRANSLATIONS[cropKey][lang];
  }
  return cropKey;
};

export const getVehicleName = (vehicleKey: string, lang: Language): string => {
  if (VEHICLE_TRANSLATIONS[vehicleKey] && VEHICLE_TRANSLATIONS[vehicleKey][lang]) {
    return VEHICLE_TRANSLATIONS[vehicleKey][lang];
  }
  return vehicleKey;
};

export const getMarketName = (marketKey: string, lang: Language): string => {
  if (MARKET_TRANSLATIONS[marketKey] && MARKET_TRANSLATIONS[marketKey][lang]) {
    return MARKET_TRANSLATIONS[marketKey][lang];
  }
  return marketKey;
};

export const getRegionName = (regionKey: string, lang: Language): string => {
  if (REGION_TRANSLATIONS[regionKey] && REGION_TRANSLATIONS[regionKey][lang]) {
    return REGION_TRANSLATIONS[regionKey][lang];
  }
  return regionKey;
};
