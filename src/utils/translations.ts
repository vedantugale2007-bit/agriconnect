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
};

// Vehicle translations mapping
export const VEHICLE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'Tata Ace Gold': { mr: 'टाटा एस गोल्ड', hi: 'टाटा एएस गोल्ड', en: 'Tata Ace Gold' },
  'Mahindra Bolero Pickup': { mr: 'महिंद्रा बोलेरो पिकअप', hi: 'महिंद्रा बोलेरो पिकअप', en: 'Mahindra Bolero Pickup' },
  'Mahindra Jeeto': { mr: 'महिंद्रा जितो', hi: 'महिंद्रा जीतो', en: 'Mahindra Jeeto' },
  'Ashok Leyland Dost': { mr: 'अशोक लेलँड दोस्त', hi: 'अशोक लेलैंड दोस्त', en: 'Ashok Leyland Dost' },
  'Eicher 14 ft': { mr: 'आयशर १४ फूट', hi: 'आयशर 14 फीट', en: 'Eicher 14 ft' },
  'BharatBenz Truck': { mr: 'भारतबेंझ ट्रक', hi: 'भारतबेंज ट्रक', en: 'BharatBenz Truck' },
  'Tata 407': { mr: 'टाटा ४०७', hi: 'टाटा 407', en: 'Tata 407' },
};

// APMC Market translations
export const MARKET_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'Lasalgaon APMC': { mr: 'लासलगाव कृषी उत्पन्न बाजार समिती', hi: 'लासलगांव एपीएमसी', en: 'Lasalgaon APMC' },
  'Nashik APMC': { mr: 'नाशिक एपीएमसी', hi: 'नासिक एपीएमसी', en: 'Nashik APMC' },
  'Pimpalgaon Baswant APMC': { mr: 'पिंपळगाव बसवंत एपीएमसी', hi: 'पिंपलगांव बसवंत एपीएमसी', en: 'Pimpalgaon Baswant APMC' },
  'Ahilyanagar Market': { mr: 'अहिल्यानगर कृषी बाजार', hi: 'अहिल्यानगर मंडी', en: 'Ahilyanagar Market' },
  'Pune Market Yard': { mr: 'पुणे मार्केट यार्ड', hi: 'पुणे मार्केट यार्ड', en: 'Pune Market Yard' },
  'Sangamner Market': { mr: 'संगमनेर बाजार', hi: 'संगमनेर मंडी', en: 'Sangamner Market' },
  'Kopargaon Market': { mr: 'कोपरगाव बाजार समिती', hi: 'कोपरगांव मंडी', en: 'Kopargaon Market' },
  'Rahuri Market': { mr: 'राहुरी कृषी उत्पन्न बाजार', hi: 'राहुरी मंडी', en: 'Rahuri Market' },
  'Yeola Market': { mr: 'येवला बाजार समिती', hi: 'येवला मंडी', en: 'Yeola Market' },
};

// UI Text Translation Dictionaries
const UI_STRINGS: Record<string, Record<Language, string>> = {
  // Navigation & General
  appName: { mr: 'ॲग्रीकनेक्ट महाराष्ट्र', hi: 'एग्रीकनेक्ट महाराष्ट्र', en: 'AgriConnect Maharashtra' },
  tagline: { mr: 'बुद्धिमत्तापूर्ण कृषी लॉजिस्टिक्स व शीतगृह साखळी', hi: 'स्मार्ट कृषि लॉजिस्टिक्स एवं कोल्ड-चेन नेटवर्क', en: 'Intelligent Agricultural Logistics & Cold-Chain Network' },
  home: { mr: 'मुख्य पृष्ठ', hi: 'होम', en: 'Home' },
  dashboard: { mr: 'डॅशबोर्ड', hi: 'डैशबोर्ड', en: 'Dashboard' },
  findTransporters: { mr: 'वाहतूकदार शोधा', hi: 'ट्रांसपोर्टर खोजें', en: 'Find Transporters' },
  liveTracking: { mr: 'थेट ट्रॅकिंग', hi: 'लाइव ट्रैकिंग', en: 'Live Tracking' },
  invoices: { mr: 'जीएसटी बिले', hi: 'जीएसटी बिल', en: 'Invoices' },
  aiAssistant: { mr: 'कृषी एआय सहाय्यक', hi: 'कृषि एआई सहायक', en: 'Agri AI Assistant' },
  weatherAdvisor: { mr: 'हवामान अंदाज', hi: 'मौसम पूर्वानुमान', en: 'Weather Advisor' },
  alerts: { mr: 'सूचना व अपडेट्स', hi: 'अधिसूचनाएं एवं अपडेट', en: 'Alerts & Updates' },
  markAllRead: { mr: 'सर्व वाचलेले दाखवा', hi: 'सभी पढ़ा हुआ चिन्हित करें', en: 'Mark all read' },
  switchRole: { mr: 'भूमिका बदला', hi: 'रोल बदलें', en: 'Switch Perspective' },
  farmerPortal: { mr: 'शेतकरी पोर्टल', hi: 'किसान पोर्टल', en: 'Farmer Portal' },
  transporterHub: { mr: 'वाहतूकदार केंद्र', hi: 'ट्रांसपोर्टर हब', en: 'Transporter Hub' },
  adminCommand: { mr: 'प्रशासकीय नियंत्रण', hi: 'एडमिन कंट्रोल', en: 'Admin Command' },
  farmerView: { mr: 'शेतकरी दृश्य', hi: 'किसान दृश्य', en: 'Farmer View' },
  transporterView: { mr: 'वाहतूकदार दृश्य', hi: 'ट्रांसपोर्टर दृश्य', en: 'Transporter View' },
  adminView: { mr: 'प्रशासक दृश्य', hi: 'एडमिन दृश्य', en: 'Admin View' },
  languageSelect: { mr: 'भाषा निवडा', hi: 'भाषा चुनें', en: 'Language' },

  // Hero Section
  heroTitle1: { mr: 'महाराष्ट्रातील शेतकरी व वाहतूकदारांसाठी', hi: 'महाराष्ट्र के किसानों एवं ट्रांसपोर्टरों के लिए', en: 'Smart Agricultural Logistics For' },
  heroTitle2: { mr: 'स्मार्ट व सुरक्षित कृषी वाहतूक', hi: 'स्मार्ट एवं सुरक्षित कृषि परिवहन', en: 'Maharashtra Farmers & Transporters' },
  heroSub: { mr: 'नाशिक व अहिल्यानगर जिल्ह्यातील शेतकऱ्यांसाठी लासलगाव, पिंपळगाव आणि मुंबई-पुणे बाजारासाठी थेट वाहतूक बुकिंग, एआय नुकसान अंदाज आणि एपीएमसी बाजार भाव.', hi: 'नासिक और अहिल्यानगर जिलों से लासलगांव, पिंपलगांव और पुणे-मुंबई मंडियों के लिए सीधी वाहन बुकिंग, एआई नुकसान अनुमान और एपीएमसी मंडी भाव।', en: 'Direct refrigerated & open truck booking from Nashik & Ahilyanagar to Lasalgaon, Pune, & Mumbai APMCs with Gemini AI crop loss prediction.' },
  startShipping: { mr: 'वाहतूक बुक करा', hi: 'वाहन बुक करें', en: 'Start Shipping Crop' },
  viewMandiRates: { mr: 'एपीएमसी बाजार भाव पहा', hi: 'एपीएमसी मंडी भाव देखें', en: 'View Mandi Rates' },
  askAiAssistant: { mr: 'एआय मित्रास विचारा', hi: 'एआई सहायक से पूछें', en: 'Ask AI Assistant' },

  // Home Trust Stats
  metric1Val: { mr: '५०,०००+ टन', hi: '50,000+ टन', en: '50,000+ Tons' },
  metric1Lbl: { mr: 'माल वाहतूक पूर्ण', hi: 'फसल परिवहन संपन्न', en: 'Produce Transported' },
  metric2Val: { mr: '९९.६%', hi: '99.6%', en: '99.6%' },
  metric2Lbl: { mr: 'वेळेवर पोहोचणारी वाहतूक', hi: 'समय पर डिलीवरी', en: 'On-Time Delivery' },
  metric3Val: { mr: '₹ २.८ कोटी+', hi: '₹ 2.8 करोड़+', en: '₹ 2.8 Cr+' },
  metric3Lbl: { mr: 'शेतकऱ्यांची बचत', hi: 'किसानों की कुल बचत', en: 'Farmer Savings' },

  // Farmer Dashboard
  farmerDashboardTitle: { mr: 'शेतकरी कमांड सेंटर', hi: 'किसान कमांड सेंटर', en: 'Farmer Command Center' },
  farmerWelcome: { mr: 'नमस्कार, शंकर पाटील (नाशिक)', hi: 'नमस्ते, शंकर पाटिल (नासिक)', en: 'Welcome back, Shankar Patil (Nashik)' },
  postNewLoad: { mr: 'नवीन माल वाहतूक नोंदवा', hi: 'नई फसल बुकिंग दर्ज करें', en: 'Post New Crop Load' },
  selectCrop: { mr: 'पिकाचा प्रकार निवडा', hi: 'फसल का प्रकार चुनें', en: 'Select Crop Type' },
  weightInKg: { mr: 'वजन (किलोग्राम / टन)', hi: 'वजन (किलोग्राम / टन)', en: 'Weight (Kg / Tons)' },
  pickupAddress: { mr: 'पिकअप ठिकाण (शेत/गाव)', hi: 'पिकअप स्थान (खेत/गांव)', en: 'Pickup Location (Farm/Village)' },
  deliveryMarket: { mr: 'गंतव्य एपीएमसी / बाजार समिती', hi: 'गंतव्य एपीएमसी / मंडी', en: 'Destination APMC Market' },
  calculateLossRisk: { mr: 'एआय द्वारे नुकसान अंदाज काढा', hi: 'एआई फसल नुकसान जोखिम जांचें', en: 'Predict Crop Loss Risk (Gemini AI)' },
  mandiPricesHeading: { mr: 'महाराष्ट्रातील प्रमुख एपीएमसी बाजार भाव', hi: 'महाराष्ट्र प्रमुख एपीएमसी मंडी भाव', en: 'Maharashtra Live APMC Mandi Rates' },
  activeBookings: { mr: 'तुमच्या सक्रिय वाहतूक बुकिंग्स', hi: 'आपकी सक्रिय परिवहन बुकिंग', en: 'Your Active Shipment Bookings' },

  // Transporter Dashboard
  transporterDashboardTitle: { mr: 'वाहतूकदार हब', hi: 'ट्रांसपोर्टर हब', en: 'Transporter Fleet Hub' },
  transporterWelcome: { mr: 'सह्याद्री किसान लॉजिस्टिक्स (नाशिक)', hi: 'सह्याद्रि किसान लॉजिस्टिक्स (नासिक)', en: 'Sahyadri Kisan Logistics (Nashik Fleet)' },
  availableLoads: { mr: 'उपलब्ध शेतकरी माल मागणी', hi: 'उपलब्ध किसान फसल लोड', en: 'Available Farmer Crop Loads' },
  acceptLoad: { mr: 'वाहतूक स्वीकारा', hi: 'बुकिंग स्वीकारें', en: 'Accept & Lock Freight' },
  fleetStatus: { mr: 'गाड्यांची स्थिती', hi: 'वाहनों की स्थिति', en: 'Fleet Vehicle Status' },

  // Admin Dashboard
  adminDashboardTitle: { mr: 'प्रशासकीय नियंत्रण कक्ष', hi: 'प्रशासनिक नियंत्रण कक्ष', en: 'Admin Verification Command Center' },
  verifiedFarmers: { mr: 'प्रमाणित शेतकरी', hi: 'सत्यापित किसान', en: 'Verified Farmers' },
  verifiedTransporters: { mr: 'प्रमाणित वाहतूकदार', hi: 'सत्यापित ट्रांसपोर्टर', en: 'Verified Transporters' },
  totalVolumeMoved: { mr: 'एकूण वाहतूक केलेले धान्य/फळे', hi: 'कुल कुल परिवहन मात्रा', en: 'Total Cargo Moved' },

  // Find Transporters Screen
  searchTransportersTitle: { mr: 'महाराष्ट्रातील विश्वासू वाहतूकदार शोधा', hi: 'महाराष्ट्र के विश्वसनीय ट्रांसपोर्टर खोजें', en: 'Find Trusted Transporters in Maharashtra' },
  filterByVehicle: { mr: 'वाहनानुसार फिल्टर करा', hi: 'वाहन प्रकार से फ़िल्टर करें', en: 'Filter by Vehicle' },
  perTonKm: { mr: 'प्रति टन-किमी दर', hi: 'प्रति टन-किमी दर', en: 'Rate per Ton-Km' },
  bookNow: { mr: 'आत्ताच बुक करा', hi: 'अभी बुक करें', en: 'Book Transport Now' },

  // Checkout & Invoice
  checkoutTitle: { mr: 'सुरक्षित पेमेंट व बुकिंग पुष्टीकरण', hi: 'सुरक्षित भुगतान एवं बुकिंग पुष्टि', en: 'Secure Payment & Booking Checkout' },
  payViaUpi: { mr: 'युपीआय द्वारे पेमेंट करा (PhonePe / GPay / BHIM)', hi: 'यूपीआई द्वारा भुगतान करें (PhonePe / GPay / BHIM)', en: 'Pay via UPI (PhonePe / Google Pay / BHIM)' },
  gstInvoiceHeading: { mr: 'जीएसटी कर पावती', hi: 'जीएसटी कर चालान', en: 'GST Tax Invoice' },
  downloadInvoice: { mr: 'बिल डाउनलोड करा (PDF)', hi: 'बिल डाउनलोड करें (PDF)', en: 'Download Invoice (PDF)' },

  // AI Assistant
  aiAssistantWelcome: { mr: 'नमस्कार! मी तुमचा कृषी मित्र एआय सहाय्यक आहे.', hi: 'नमस्ते! मैं आपका कृषि मित्र एआई सहायक हूँ।', en: 'Namaste! I am your AgriConnect AI Logistics & Crop Care Assistant.' },
  aiAssistantPlaceholder: { mr: 'कांदा, द्राक्षे किंवा भाड्याच्या दराविषयी विचारा...', hi: 'प्याज, अंगूर या वाहन भाड़े के बारे में पूछें...', en: 'Ask about crops, APMC prices, or truck rates...' },
  diagnoseCropPhoto: { mr: 'पिकाचा फोटो अपलोड करून तपासणी करा', hi: 'फसल का फोटो अपलोड करके जांच करें', en: 'Upload Crop Photo for Diagnostics' },
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
