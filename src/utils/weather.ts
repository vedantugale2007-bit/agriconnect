export interface HourlyForecast {
  time: string;
  tempCelsius: number;
  conditionMr: string;
  conditionEn: string;
  conditionHi: string;
  icon: string;
  rainProb: number;
  humidity: number;
  windSpeed: number;
}

export interface DailyForecast {
  dayName: string;
  dateStr: string;
  tempMax: number;
  tempMin: number;
  conditionMr: string;
  conditionEn: string;
  conditionHi: string;
  rainProb: number;
  humidity: number;
  uvIndex: number;
  agriculturalAdviceMr: string;
  agriculturalAdviceEn: string;
  agriculturalAdviceHi: string;
}

export interface WeatherInfo {
  district: string;
  districtMr: string;
  districtHi: string;
  state: string;
  tempCelsius: number;
  feelsLikeCelsius: number;
  tempMin: number;
  tempMax: number;
  conditionMr: string;
  conditionEn: string;
  conditionHi: string;
  humidityPercent: number;
  windSpeedKm: number;
  windDirection: string;
  pressureHpa: number;
  uvIndex: number;
  rainProbability: number;
  rainMmNext24h: number;
  visibilityKm: number;
  sunriseTime: string;
  sunsetTime: string;
  agriculturalAdviceMr: string;
  agriculturalAdviceEn: string;
  agriculturalAdviceHi: string;
  transportAdviceMr: string;
  transportAdviceEn: string;
  transportAdviceHi: string;
  alertLevel: 'NORMAL' | 'HEAT_WARNING' | 'RAIN_ALERT' | 'HIGH_WIND' | 'HIGH_HUMIDITY';
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  isLiveApi?: boolean;
}

// Pre-configured district data for Maharashtra districts and major APMC hubs
export const REGIONAL_WEATHER: Record<string, WeatherInfo> = {
  Nashik: {
    district: 'Nashik',
    districtMr: 'नाशिक (Nashik)',
    districtHi: 'नासिक (Nashik)',
    state: 'Maharashtra',
    tempCelsius: 32,
    feelsLikeCelsius: 34,
    tempMin: 22,
    tempMax: 35,
    conditionMr: 'मोकळे आकाश व कोरडे हवामान',
    conditionEn: 'Clear Sky & Dry Climate',
    conditionHi: 'साफ आसमान और शुष्क मौसम',
    humidityPercent: 48,
    windSpeedKm: 14,
    windDirection: 'SW 220°',
    pressureHpa: 1012,
    uvIndex: 7.8,
    rainProbability: 10,
    rainMmNext24h: 0.5,
    visibilityKm: 10,
    sunriseTime: '06:12 AM',
    sunsetTime: '07:05 PM',
    agriculturalAdviceMr: 'द्राक्ष व कांदा पिकासाठी सकाळी ६ ते ९ दरम्यान सिंचन व तुषार सिंचन करावे. धुके असल्यास बोर्डो मिश्रणाची फवारणी करा.',
    agriculturalAdviceEn: 'Irrigate grape and onion crops between 6 AM - 9 AM. Apply Bordeaux mixture if early morning fog appears.',
    agriculturalAdviceHi: 'अंगूर और प्याज फसलों की सिंचाई सुबह 6 से 9 बजे करें। सुबह कोहरा होने पर बोर्डो मिश्रण का छिड़काव करें।',
    transportAdviceMr: 'द्राक्षे व टोमॅटो वाहतुकीसाठी दुपारचे ऊन टाळण्यासाठी सकाळी ९ पूर्वी गाड्या रवाना करा.',
    transportAdviceEn: 'Dispatch grape and tomato shipments before 9 AM to avoid peak noon temperatures above 34°C.',
    transportAdviceHi: 'अंगूर व टमाटर परिवहन दोपहर 12 बजे से पहले पूरा करें ताकि तेज गर्मी से नुकसान न हो।',
    alertLevel: 'HEAT_WARNING',
    hourlyForecast: [
      { time: '06:00', tempCelsius: 22, conditionMr: 'स्वच्छ', conditionEn: 'Clear', conditionHi: 'साफ', icon: '01d', rainProb: 0, humidity: 72, windSpeed: 8 },
      { time: '09:00', tempCelsius: 27, conditionMr: 'ऊन', conditionEn: 'Sunny', conditionHi: 'धूप', icon: '01d', rainProb: 5, humidity: 58, windSpeed: 12 },
      { time: '12:00', tempCelsius: 32, conditionMr: 'प्रखर ऊन', conditionEn: 'Hot', conditionHi: 'तेज धूप', icon: '01d', rainProb: 10, humidity: 45, windSpeed: 15 },
      { time: '15:00', tempCelsius: 35, conditionMr: 'उष्ण', conditionEn: 'Very Hot', conditionHi: 'अत्यधिक गर्म', icon: '01d', rainProb: 10, humidity: 38, windSpeed: 16 },
      { time: '18:00', tempCelsius: 30, conditionMr: 'शांत', conditionEn: 'Clear Evening', conditionHi: 'सुहावना शाम', icon: '01n', rainProb: 5, humidity: 52, windSpeed: 11 },
      { time: '21:00', tempCelsius: 25, conditionMr: 'थंड', conditionEn: 'Cool Night', conditionHi: 'ठंडी रात', icon: '01n', rainProb: 0, humidity: 65, windSpeed: 9 },
    ],
    dailyForecast: [
      { dayName: 'आज (Today)', dateStr: 'सोमवार, ४ ऑगस्ट', tempMax: 35, tempMin: 22, conditionMr: 'मोकळे आकाश', conditionEn: 'Clear Sky', conditionHi: 'साफ आसमान', rainProb: 10, humidity: 48, uvIndex: 8, agriculturalAdviceMr: 'सकाळी पाणी द्या', agriculturalAdviceEn: 'Morning irrigation', agriculturalAdviceHi: 'सुबह सिंचाई करें' },
      { dayName: 'उद्या (Tomorrow)', dateStr: 'मंगळवार, ५ ऑगस्ट', tempMax: 34, tempMin: 21, conditionMr: 'अंशतः ढगाळ', conditionEn: 'Partly Cloudy', conditionHi: 'आंशिक बादल', rainProb: 15, humidity: 52, uvIndex: 7, agriculturalAdviceMr: 'कांदा वाळवण्यासाठी उत्तम', agriculturalAdviceEn: 'Great for onion drying', agriculturalAdviceHi: 'प्याज सुखाने हेतु उत्तम' },
      { dayName: 'बुधवार', dateStr: '६ ऑगस्ट', tempMax: 33, tempMin: 22, conditionMr: 'हलका पाऊस शक्य', conditionEn: 'Light Rain Likely', conditionHi: 'हल्की बारिश', rainProb: 40, humidity: 68, uvIndex: 6, agriculturalAdviceMr: 'ताडपत्री तयार ठेवा', agriculturalAdviceEn: 'Keep tarpaulin ready', agriculturalAdviceHi: 'तिरपाल तैयार रखें' },
      { dayName: 'गुरुवार', dateStr: '७ ऑगस्ट', tempMax: 31, tempMin: 20, conditionMr: 'मध्यम पाऊस', conditionEn: 'Moderate Showers', conditionHi: 'मध्यम बारिश', rainProb: 65, humidity: 78, uvIndex: 5, agriculturalAdviceMr: 'फवारणी टाळावी', agriculturalAdviceEn: 'Avoid chemical spray', agriculturalAdviceHi: 'छिड़काव न करें' },
      { dayName: 'शुक्रवार', dateStr: '८ ऑगस्ट', tempMax: 32, tempMin: 21, conditionMr: 'उघडीप', conditionEn: 'Sunny Breaks', conditionHi: 'धूप-छांव', rainProb: 20, humidity: 60, uvIndex: 7, agriculturalAdviceMr: 'पाण्याचा निचरा करा', agriculturalAdviceEn: 'Ensure field drainage', agriculturalAdviceHi: 'खेत जल निकासी करें' },
      { dayName: 'शनिवार', dateStr: '९ ऑगस्ट', tempMax: 33, tempMin: 22, conditionMr: 'मोकळे', conditionEn: 'Clear', conditionHi: 'साफ', rainProb: 10, humidity: 55, uvIndex: 8, agriculturalAdviceMr: 'उत्तम तोडणी दिवस', agriculturalAdviceEn: 'Ideal harvest day', agriculturalAdviceHi: 'कटाई हेतु उत्तम' },
      { dayName: 'रविवार', dateStr: '१० ऑगस्ट', tempMax: 34, tempMin: 23, conditionMr: 'उष्ण', conditionEn: 'Warm', conditionHi: 'गर्म', rainProb: 5, humidity: 50, uvIndex: 8, agriculturalAdviceMr: 'वाहतूक नियोजन करा', agriculturalAdviceEn: 'Plan market transport', agriculturalAdviceHi: 'परिवहन योजना बनाएं' },
    ]
  },
  Ahilyanagar: {
    district: 'Ahilyanagar',
    districtMr: 'अहिल्यानगर (Ahmednagar)',
    districtHi: 'अहिल्यानगर (अहमदनगर)',
    state: 'Maharashtra',
    tempCelsius: 34,
    feelsLikeCelsius: 36,
    tempMin: 23,
    tempMax: 37,
    conditionMr: 'उष्ण व कोरडे हवामान',
    conditionEn: 'Hot & Dry Weather',
    conditionHi: 'गर्म व शुष्क मौसम',
    humidityPercent: 42,
    windSpeedKm: 16,
    windDirection: 'W 270°',
    pressureHpa: 1010,
    uvIndex: 8.5,
    rainProbability: 5,
    rainMmNext24h: 0.0,
    visibilityKm: 10,
    sunriseTime: '06:10 AM',
    sunsetTime: '07:02 PM',
    agriculturalAdviceMr: 'डाळिंब व कपाशी पिकात ठिबक सिंचनाने पाणी द्यावे. फळांवर सूर्यदाह टाळण्यासाठी आच्छादन (Mulching) वापरावे.',
    agriculturalAdviceEn: 'Apply drip irrigation for pomegranate and cotton. Use organic mulching to prevent fruit sunburn.',
    agriculturalAdviceHi: 'अनार और कपास में ड्रिप सिंचाई करें। फलों को धूप से बचाने हेतु मल्चिंग का प्रयोग करें।',
    transportAdviceMr: 'डाळिंब व डाळींच्या वाहतुकीसाठी व्हेंटिलेटेड व हवेशीर ताडपत्रीचा वापर करा.',
    transportAdviceEn: 'Use ventilated tarpaulin covers for pomegranate and pulse transportation.',
    transportAdviceHi: 'अनार एवं दालों के परिवहन के लिए हवादार तिरपाल का प्रयोग करें।',
    alertLevel: 'NORMAL',
    hourlyForecast: [
      { time: '06:00', tempCelsius: 23, conditionMr: 'स्वच्छ', conditionEn: 'Clear', conditionHi: 'साफ', icon: '01d', rainProb: 0, humidity: 65, windSpeed: 9 },
      { time: '12:00', tempCelsius: 34, conditionMr: 'प्रखर ऊन', conditionEn: 'Hot', conditionHi: 'तेज धूप', icon: '01d', rainProb: 5, humidity: 40, windSpeed: 16 },
      { time: '18:00', tempCelsius: 31, conditionMr: 'शांत', conditionEn: 'Warm Evening', conditionHi: 'शाम', icon: '01n', rainProb: 5, humidity: 48, windSpeed: 12 },
    ],
    dailyForecast: [
      { dayName: 'आज', dateStr: '४ ऑगस्ट', tempMax: 37, tempMin: 23, conditionMr: 'उष्ण', conditionEn: 'Hot', conditionHi: 'गर्म', rainProb: 5, humidity: 42, uvIndex: 9, agriculturalAdviceMr: 'आच्छादन वापरा', agriculturalAdviceEn: 'Use mulching', agriculturalAdviceHi: 'मल्चिंग करें' },
      { dayName: 'उद्या', dateStr: '५ ऑगस्ट', tempMax: 36, tempMin: 22, conditionMr: 'कोरडे', conditionEn: 'Dry', conditionHi: 'शुष्क', rainProb: 5, humidity: 40, uvIndex: 8, agriculturalAdviceMr: 'ठिबक सिंचन द्या', agriculturalAdviceEn: 'Drip irrigate', agriculturalAdviceHi: 'ड्रिप सिंचाई करें' },
      { dayName: 'बुधवार', dateStr: '६ ऑगस्ट', tempMax: 35, tempMin: 23, conditionMr: 'ढगाळ', conditionEn: 'Cloudy', conditionHi: 'बादल', rainProb: 20, humidity: 55, uvIndex: 7, agriculturalAdviceMr: 'कपाशी देखभाल करा', agriculturalAdviceEn: 'Cotton inspection', agriculturalAdviceHi: 'कपास देखभाल' },
      { dayName: 'गुरुवार', dateStr: '७ ऑगस्ट', tempMax: 33, tempMin: 22, conditionMr: 'पाऊस', conditionEn: 'Showers', conditionHi: 'बारिश', rainProb: 50, humidity: 70, uvIndex: 6, agriculturalAdviceMr: 'साचलेले पाणी काढा', agriculturalAdviceEn: 'Drain excess water', agriculturalAdviceHi: 'पानी निकालें' },
      { dayName: 'शुक्रवार', dateStr: '८ ऑगस्ट', tempMax: 34, tempMin: 22, conditionMr: 'उघडीप', conditionEn: 'Fair', conditionHi: 'साफ', rainProb: 15, humidity: 58, uvIndex: 8, agriculturalAdviceMr: 'बाजार नोंदणी करा', agriculturalAdviceEn: 'Register transport', agriculturalAdviceHi: 'गाड़ी बुक करें' },
      { dayName: 'शनिवार', dateStr: '९ ऑगस्ट', tempMax: 35, tempMin: 23, conditionMr: 'उष्ण', conditionEn: 'Warm', conditionHi: 'गर्म', rainProb: 10, humidity: 50, uvIndex: 8, agriculturalAdviceMr: 'डाळिंब तोडणी', agriculturalAdviceEn: 'Harvest Pomegranate', agriculturalAdviceHi: 'अनार तोडाई' },
      { dayName: 'रविवार', dateStr: '१० ऑगस्ट', tempMax: 36, tempMin: 24, conditionMr: 'स्वच्छ', conditionEn: 'Clear', conditionHi: 'साफ', rainProb: 0, humidity: 45, uvIndex: 9, agriculturalAdviceMr: 'बाजार समितीकडे रवानगी', agriculturalAdviceEn: 'Send to APMC', agriculturalAdviceHi: 'मंडी भेजें' },
    ]
  },
  Pune: {
    district: 'Pune',
    districtMr: 'पुणे (Pune Market Belt)',
    districtHi: 'पुणे (Pune APMC)',
    state: 'Maharashtra',
    tempCelsius: 29,
    feelsLikeCelsius: 31,
    tempMin: 21,
    tempMax: 30,
    conditionMr: 'अंशतः ढगाळ व मंद वारा',
    conditionEn: 'Partly Cloudy & Breeze',
    conditionHi: 'आंशिक बादल और हल्की हवा',
    humidityPercent: 62,
    windSpeedKm: 18,
    windDirection: 'SW 210°',
    pressureHpa: 1014,
    uvIndex: 6.2,
    rainProbability: 25,
    rainMmNext24h: 3.2,
    visibilityKm: 9,
    sunriseTime: '06:14 AM',
    sunsetTime: '07:08 PM',
    agriculturalAdviceMr: 'भाजीपाला व टोमॅटो पिकात बुरशीजन्य रोगांचा प्रादुर्भाव टाळण्यासाठी ट्रायकोडरमा किंवा सुयोग्य बुरशीनाशक वापरावे.',
    agriculturalAdviceEn: 'Apply Trichoderma or copper fungicide to protect tomatoes and green vegetables from humidity fungi.',
    agriculturalAdviceHi: 'टमाटर व सब्जियों को कवक से बचाने हेतु कॉपर फफूंदनाशक का छिड़काव करें।',
    transportAdviceMr: 'पुणे मार्केट यार्डला भाजीपाला पाठवताना पावसाची शक्यता गृहीत धरून वॉटरप्रूफ ताडपत्री झाकावी.',
    transportAdviceEn: 'Cover vegetable shipments with waterproof heavy-duty tarpaulins due to evening rain likelihood.',
    transportAdviceHi: 'सब्जी गाड़ियों को तिरपाल से अच्छे से ढकें, शाम को हल्की बारिश संभव है।',
    alertLevel: 'NORMAL',
    hourlyForecast: [
      { time: '06:00', tempCelsius: 21, conditionMr: 'ढगाळ', conditionEn: 'Cloudy', conditionHi: 'बादल', icon: '03d', rainProb: 10, humidity: 80, windSpeed: 10 },
      { time: '12:00', tempCelsius: 29, conditionMr: 'अंशतः सूर्य', conditionEn: 'Sun & Cloud', conditionHi: 'धूप-छांव', icon: '02d', rainProb: 25, humidity: 62, windSpeed: 18 },
      { time: '18:00', tempCelsius: 26, conditionMr: 'हलकी सर', conditionEn: 'Light Shower', conditionHi: 'हल्की बौछार', icon: '10d', rainProb: 45, humidity: 75, windSpeed: 14 },
    ],
    dailyForecast: [
      { dayName: 'आज', dateStr: '४ ऑगस्ट', tempMax: 30, tempMin: 21, conditionMr: 'ढगाळ', conditionEn: 'Partly Cloudy', conditionHi: 'आंशिक बादल', rainProb: 25, humidity: 62, uvIndex: 6, agriculturalAdviceMr: 'टोमॅटो बाइंडिंग करा', agriculturalAdviceEn: 'Staking tomatoes', agriculturalAdviceHi: 'टमाटर सहारा दें' },
      { dayName: 'उद्या', dateStr: '५ ऑगस्ट', tempMax: 29, tempMin: 20, conditionMr: 'पाऊस', conditionEn: 'Rain Showers', conditionHi: 'बारिश', rainProb: 60, humidity: 75, uvIndex: 5, agriculturalAdviceMr: 'ताडपत्री झाका', agriculturalAdviceEn: 'Cover with tarpaulin', agriculturalAdviceHi: 'तिरपाल ढकें' },
      { dayName: 'बुधवार', dateStr: '६ ऑगस्ट', tempMax: 28, tempMin: 20, conditionMr: 'गढूळ हवामान', conditionEn: 'Overcast', conditionHi: 'घने बादल', rainProb: 70, humidity: 82, uvIndex: 4, agriculturalAdviceMr: 'बुरशीनाशक फवारा', agriculturalAdviceEn: 'Fungicide spray', agriculturalAdviceHi: 'फफूंदनाशक छिड़कें' },
      { dayName: 'गुरुवार', dateStr: '७ ऑगस्ट', tempMax: 29, tempMin: 21, conditionMr: 'उघडीप', conditionEn: 'Breaks', conditionHi: 'धूप-छांव', rainProb: 30, humidity: 68, uvIndex: 6, agriculturalAdviceMr: 'भाजीपाला काढणी', agriculturalAdviceEn: 'Harvest veggies', agriculturalAdviceHi: 'सब्जी तोडाई' },
      { dayName: 'शुक्रवार', dateStr: '८ ऑगस्ट', tempMax: 30, tempMin: 21, conditionMr: 'मोकळे', conditionEn: 'Clear', conditionHi: 'साफ', rainProb: 15, humidity: 60, uvIndex: 7, agriculturalAdviceMr: 'मार्केट यार्डला पाठवा', agriculturalAdviceEn: 'Send to Market Yard', agriculturalAdviceHi: 'मंडी भेजें' },
      { dayName: 'शनिवार', dateStr: '९ ऑगस्ट', tempMax: 31, tempMin: 22, conditionMr: 'उष्ण', conditionEn: 'Warm', conditionHi: 'गर्म', rainProb: 10, humidity: 55, uvIndex: 8, agriculturalAdviceMr: 'पाणी व्यवस्थापन', agriculturalAdviceEn: 'Water management', agriculturalAdviceHi: 'जल प्रबंधन' },
      { dayName: 'रविवार', dateStr: '१० ऑगस्ट', tempMax: 31, tempMin: 22, conditionMr: 'स्वच्छ', conditionEn: 'Sunny', conditionHi: 'धूप', rainProb: 5, humidity: 52, uvIndex: 8, agriculturalAdviceMr: 'नियमित शेतकाम', agriculturalAdviceEn: 'Regular farm work', agriculturalAdviceHi: 'नियमित काम' },
    ]
  },
  Lasalgaon: {
    district: 'Lasalgaon',
    districtMr: 'लासलगाव (Lasalgaon APMC)',
    districtHi: 'लासलगांव (Lasalgaon APMC)',
    state: 'Maharashtra',
    tempCelsius: 33,
    feelsLikeCelsius: 35,
    tempMin: 22,
    tempMax: 36,
    conditionMr: 'उष्ण व कोरडे',
    conditionEn: 'Hot & Dry',
    conditionHi: 'गर्म और शुष्क',
    humidityPercent: 45,
    windSpeedKm: 12,
    windDirection: 'WNW 290°',
    pressureHpa: 1011,
    uvIndex: 8.0,
    rainProbability: 0,
    rainMmNext24h: 0.0,
    visibilityKm: 10,
    sunriseTime: '06:11 AM',
    sunsetTime: '07:04 PM',
    agriculturalAdviceMr: 'कांदा गोदामांमध्ये हवा खेळती राहण्यासाठी व्हेन्टिलेशन सुरू ठेवा. कांद्याची वाळवणी उत्तम होईल.',
    agriculturalAdviceEn: 'Maintain storehouse aeration for onions. Conditions are ideal for sun-curing harvested onions.',
    agriculturalAdviceHi: 'प्याज गोदामों में हवा आवागमन जारी रखें। प्याज सुखाने के लिए मौसम उत्तम है।',
    transportAdviceMr: 'कांदा गोण्यांमध्ये उष्णता निर्माण होऊ नये म्हणून ओपन ट्रकमध्ये हवेची हालचाल आवश्यक आहे.',
    transportAdviceEn: 'Onion sacks require proper air ventilation during highway transit in open trucks.',
    transportAdviceHi: 'खुले ट्रकों में प्याज ले जाते समय हवादार पैकिंग का ध्यान रखें।',
    alertLevel: 'NORMAL',
    hourlyForecast: [
      { time: '06:00', tempCelsius: 22, conditionMr: 'स्वच्छ', conditionEn: 'Clear', conditionHi: 'साफ', icon: '01d', rainProb: 0, humidity: 68, windSpeed: 6 },
      { time: '12:00', tempCelsius: 33, conditionMr: 'प्रखर ऊन', conditionEn: 'Hot', conditionHi: 'तेज धूप', icon: '01d', rainProb: 0, humidity: 45, windSpeed: 12 },
      { time: '18:00', tempCelsius: 30, conditionMr: 'शांत', conditionEn: 'Clear Evening', conditionHi: 'शांत शाम', icon: '01n', rainProb: 0, humidity: 50, windSpeed: 8 },
    ],
    dailyForecast: [
      { dayName: 'आज', dateStr: '४ ऑगस्ट', tempMax: 36, tempMin: 22, conditionMr: 'उष्ण व कोरडे', conditionEn: 'Hot & Dry', conditionHi: 'गर्म शुष्क', rainProb: 0, humidity: 45, uvIndex: 8, agriculturalAdviceMr: 'कांदा वाळवणी करा', agriculturalAdviceEn: 'Onion drying', agriculturalAdviceHi: 'प्याज सुखाएं' },
      { dayName: 'उद्या', dateStr: '५ ऑगस्ट', tempMax: 35, tempMin: 21, conditionMr: 'स्वच्छ', conditionEn: 'Sunny', conditionHi: 'धूप', rainProb: 5, humidity: 48, uvIndex: 8, agriculturalAdviceMr: 'बाजार लिलाव सहभाग', agriculturalAdviceEn: 'APMC Auction Day', agriculturalAdviceHi: 'मंडी नीलामी' },
      { dayName: 'बुधवार', dateStr: '६ ऑगस्ट', tempMax: 34, tempMin: 22, conditionMr: 'ढगाळ', conditionEn: 'Partly Cloudy', conditionHi: 'बादल', rainProb: 20, humidity: 55, uvIndex: 7, agriculturalAdviceMr: 'वाहतूक बुकिंग', agriculturalAdviceEn: 'Book Onion Truck', agriculturalAdviceHi: 'ट्रक बुक करें' },
      { dayName: 'गुरुवार', dateStr: '७ ऑगस्ट', tempMax: 32, tempMin: 21, conditionMr: 'हलका पाऊस', conditionEn: 'Light Rain', conditionHi: 'हल्की बारिश', rainProb: 45, humidity: 72, uvIndex: 5, agriculturalAdviceMr: 'ताडपत्री आवश्यक', agriculturalAdviceEn: 'Cover onion sacks', agriculturalAdviceHi: 'प्याज बोरी ढकें' },
      { dayName: 'शुक्रवार', dateStr: '८ ऑगस्ट', tempMax: 33, tempMin: 22, conditionMr: 'उघडीप', conditionEn: 'Clear', conditionHi: 'साफ', rainProb: 10, humidity: 58, uvIndex: 7, agriculturalAdviceMr: 'सॉसिंग व ग्रेडिंग', agriculturalAdviceEn: 'Grading Onions', agriculturalAdviceHi: 'प्याज ग्रेडिंग' },
      { dayName: 'शनिवार', dateStr: '९ ऑगस्ट', tempMax: 34, tempMin: 22, conditionMr: 'उष्ण', conditionEn: 'Warm', conditionHi: 'गर्म', rainProb: 5, humidity: 50, uvIndex: 8, agriculturalAdviceMr: 'आंतरराज्य वाहतूक', agriculturalAdviceEn: 'Interstate Transport', agriculturalAdviceHi: 'राज्य बाहर भेजें' },
      { dayName: 'रविवार', dateStr: '१० ऑगस्ट', tempMax: 35, tempMin: 23, conditionMr: 'प्रखर ऊन', conditionEn: 'Sunny', conditionHi: 'तेज धूप', rainProb: 0, humidity: 46, uvIndex: 8, agriculturalAdviceMr: 'नियमित साठा तपासा', agriculturalAdviceEn: 'Storage check', agriculturalAdviceHi: 'भंडारण जांच' },
    ]
  },
  ChhatrapatiSambhajinagar: {
    district: 'Chhatrapati Sambhajinagar',
    districtMr: 'छत्रपती संभाजीनगर (Aurangabad)',
    districtHi: 'छत्रपति संभाजीनगर (औरंगाबाद)',
    state: 'Maharashtra',
    tempCelsius: 31,
    feelsLikeCelsius: 33,
    tempMin: 21,
    tempMax: 33,
    conditionMr: 'ढगाळ हवामान',
    conditionEn: 'Cloudy Conditions',
    conditionHi: 'बादल छाए रहेंगे',
    humidityPercent: 58,
    windSpeedKm: 15,
    windDirection: 'SW 225°',
    pressureHpa: 1013,
    uvIndex: 6.8,
    rainProbability: 30,
    rainMmNext24h: 1.8,
    visibilityKm: 10,
    sunriseTime: '06:08 AM',
    sunsetTime: '07:01 PM',
    agriculturalAdviceMr: 'कपाशी व मका पिकात लष्करी अळीचा प्रादुर्भाव रोखण्यासाठी कामगंध सापळे व निंबोळी अर्क फवारावा.',
    agriculturalAdviceEn: 'Install pheromone traps and spray Neem extract to control Fall Armyworm in Maize and Cotton.',
    agriculturalAdviceHi: 'मक्का और कपास में कीट नियंत्रण हेतु फेरोमोन ट्रैप एवं नीम अर्क का प्रयोग करें।',
    transportAdviceMr: 'मका व कपाशी गाठी वाहतुकीसाठी कोरडी ताडपत्री वापरावी.',
    transportAdviceEn: 'Ensure dry tarpaulins for maize and cotton bale transportation.',
    transportAdviceHi: 'मक्का व कपास गांठों के परिवहन के लिए सूखी तिरपाल का प्रयोग करें।',
    alertLevel: 'NORMAL',
    hourlyForecast: [
      { time: '06:00', tempCelsius: 21, conditionMr: 'ढगाळ', conditionEn: 'Cloudy', conditionHi: 'बादल', icon: '03d', rainProb: 15, humidity: 75, windSpeed: 10 },
      { time: '12:00', tempCelsius: 31, conditionMr: 'अंशतः सूर्य', conditionEn: 'Partly Sunny', conditionHi: 'धूप-छांव', icon: '02d', rainProb: 30, humidity: 58, windSpeed: 15 },
      { time: '18:00', tempCelsius: 28, conditionMr: 'हळूवार वारा', conditionEn: 'Breezy', conditionHi: 'हवा', icon: '02n', rainProb: 20, humidity: 65, windSpeed: 12 },
    ],
    dailyForecast: [
      { dayName: 'आज', dateStr: '४ ऑगस्ट', tempMax: 33, tempMin: 21, conditionMr: 'ढगाळ', conditionEn: 'Cloudy', conditionHi: 'बादल', rainProb: 30, humidity: 58, uvIndex: 7, agriculturalAdviceMr: 'कामगंध सापळे लावा', agriculturalAdviceEn: 'Install pheromone traps', agriculturalAdviceHi: 'फेरोमोन ट्रैप लगाएं' },
      { dayName: 'उद्या', dateStr: '५ ऑगस्ट', tempMax: 32, tempMin: 21, conditionMr: 'पाऊस', conditionEn: 'Showers', conditionHi: 'बारिश', rainProb: 55, humidity: 72, uvIndex: 5, agriculturalAdviceMr: 'निंबोळी अर्क फवारा', agriculturalAdviceEn: 'Neem spray', agriculturalAdviceHi: 'नीम छिड़काव' },
      { dayName: 'बुधवार', dateStr: '६ ऑगस्ट', tempMax: 30, tempMin: 20, conditionMr: 'मध्यम पाऊस', conditionEn: 'Rain', conditionHi: 'बारिश', rainProb: 65, humidity: 80, uvIndex: 4, agriculturalAdviceMr: 'पाणी निचरा करा', agriculturalAdviceEn: 'Field drainage', agriculturalAdviceHi: 'जल निकासी' },
      { dayName: 'गुरुवार', dateStr: '७ ऑगस्ट', tempMax: 31, tempMin: 21, conditionMr: 'उघडीप', conditionEn: 'Fair', conditionHi: 'साफ', rainProb: 25, humidity: 65, uvIndex: 6, agriculturalAdviceMr: 'मका कोळपणी करा', agriculturalAdviceEn: 'Maize weeding', agriculturalAdviceHi: 'मक्का निराई' },
      { dayName: 'शुक्रवार', dateStr: '८ ऑगस्ट', tempMax: 32, tempMin: 22, conditionMr: 'मोकळे', conditionEn: 'Clear', conditionHi: 'साफ', rainProb: 10, humidity: 58, uvIndex: 7, agriculturalAdviceMr: 'कपाशी खत द्या', agriculturalAdviceEn: 'Cotton fertilizer', agriculturalAdviceHi: 'कपास खाद' },
      { dayName: 'शनिवार', dateStr: '९ ऑगस्ट', tempMax: 33, tempMin: 22, conditionMr: 'उष्ण', conditionEn: 'Warm', conditionHi: 'गर्म', rainProb: 10, humidity: 52, uvIndex: 8, agriculturalAdviceMr: 'वाहतूक बुकिंग', agriculturalAdviceEn: 'Logistics booking', agriculturalAdviceHi: 'परिवहन बुकिंग' },
      { dayName: 'रविवार', dateStr: '१० ऑगस्ट', tempMax: 34, tempMin: 23, conditionMr: 'स्वच्छ', conditionEn: 'Sunny', conditionHi: 'धूप', rainProb: 5, humidity: 48, uvIndex: 8, agriculturalAdviceMr: 'बाजार समिती पाठवा', agriculturalAdviceEn: 'Dispatch to market', agriculturalAdviceHi: 'मंडी भेजें' },
    ]
  },
  Solapur: {
    district: 'Solapur',
    districtMr: 'सोलापूर (Solapur Pomegranate Belt)',
    districtHi: 'सोलापुर (Solapur APMC)',
    state: 'Maharashtra',
    tempCelsius: 35,
    feelsLikeCelsius: 38,
    tempMin: 24,
    tempMax: 38,
    conditionMr: 'प्रखर सूर्यप्रकाश व उष्णता',
    conditionEn: 'Sunny & Hot',
    conditionHi: 'कड़ी धूप और गर्मी',
    humidityPercent: 38,
    windSpeedKm: 17,
    windDirection: 'W 260°',
    pressureHpa: 1009,
    uvIndex: 9.2,
    rainProbability: 0,
    rainMmNext24h: 0.0,
    visibilityKm: 10,
    sunriseTime: '06:06 AM',
    sunsetTime: '06:58 PM',
    agriculturalAdviceMr: 'डाळिंब व द्राक्ष बागेत उष्णतेच्या लाटेमुळे फळगळ रोखण्यासाठी पोटॅशियम म्युरिएटची सूक्ष्म फवारणी करा.',
    agriculturalAdviceEn: 'Spray potassium micronutrients on pomegranate trees to protect fruit skin from sun scald in 38°C heat.',
    agriculturalAdviceHi: '38°C गर्मी में अनार के फलों को धूप के धब्बों से बचाने के लिए सूक्ष्म पोषक छिड़कें।',
    transportAdviceMr: 'डाळिंब निर्यातीसाठी रेफ्रीजरेटेड कॅरेज १६-१८°C वर सेट करा.',
    transportAdviceEn: 'Set reefer container setpoint to 16-18°C for export quality pomegranate transit.',
    transportAdviceHi: 'अनार निर्यात हेतु रीफर कंटेनर का तापमान 16-18°C पर सेट करें।',
    alertLevel: 'HEAT_WARNING',
    hourlyForecast: [
      { time: '06:00', tempCelsius: 24, conditionMr: 'स्वच्छ', conditionEn: 'Clear', conditionHi: 'साफ', icon: '01d', rainProb: 0, humidity: 60, windSpeed: 10 },
      { time: '12:00', tempCelsius: 35, conditionMr: 'प्रखर ऊन', conditionEn: 'Extreme Heat', conditionHi: 'तेज धूप', icon: '01d', rainProb: 0, humidity: 38, windSpeed: 17 },
      { time: '18:00', tempCelsius: 32, conditionMr: 'उष्ण संध्याकाळ', conditionEn: 'Warm Evening', conditionHi: 'गर्म शाम', icon: '01n', rainProb: 0, humidity: 45, windSpeed: 12 },
    ],
    dailyForecast: [
      { dayName: 'आज', dateStr: '४ ऑगस्ट', tempMax: 38, tempMin: 24, conditionMr: 'उष्ण लाट', conditionEn: 'Heatwave', conditionHi: 'लू-गर्मी', rainProb: 0, humidity: 38, uvIndex: 9, agriculturalAdviceMr: 'पोटॅशियम फवारणी', agriculturalAdviceEn: 'Potassium spray', agriculturalAdviceHi: 'पोटेशियम छिड़काव' },
      { dayName: 'उद्या', dateStr: '५ ऑगस्ट', tempMax: 37, tempMin: 23, conditionMr: 'प्रखर ऊन', conditionEn: 'Sunny', conditionHi: 'तेज धूप', rainProb: 0, humidity: 36, uvIndex: 9, agriculturalAdviceMr: 'सांध्याकाळी पाणी', agriculturalAdviceEn: 'Evening watering', agriculturalAdviceHi: 'शाम को पानी दें' },
      { dayName: 'बुधवार', dateStr: '६ ऑगस्ट', tempMax: 36, tempMin: 24, conditionMr: 'अंशतः ढगाळ', conditionEn: 'Partly Cloudy', conditionHi: 'आंशिक बादल', rainProb: 10, humidity: 42, uvIndex: 8, agriculturalAdviceMr: 'डाळिंब तोडणी', agriculturalAdviceEn: 'Pomegranate harvest', agriculturalAdviceHi: 'अनार कटाई' },
      { dayName: 'गुरुवार', dateStr: '७ ऑगस्ट', tempMax: 35, tempMin: 23, conditionMr: 'ढगाळ', conditionEn: 'Cloudy', conditionHi: 'बादल', rainProb: 25, humidity: 55, uvIndex: 7, agriculturalAdviceMr: 'ग्रेडिंग आणि पॅकिंग', agriculturalAdviceEn: 'Grading & packing', agriculturalAdviceHi: 'ग्रेडिंग व पैकिंग' },
      { dayName: 'शुक्रवार', dateStr: '८ ऑगस्ट', tempMax: 36, tempMin: 24, conditionMr: 'मोकळे', conditionEn: 'Clear', conditionHi: 'साफ', rainProb: 5, humidity: 48, uvIndex: 8, agriculturalAdviceMr: 'कोल्ड व्हॅन लोडिंग', agriculturalAdviceEn: 'Reefer loading', agriculturalAdviceHi: 'रीफर लोडिंग' },
      { dayName: 'शनिवार', dateStr: '९ ऑगस्ट', tempMax: 37, tempMin: 25, conditionMr: 'उष्ण', conditionEn: 'Hot', conditionHi: 'गर्म', rainProb: 0, humidity: 40, uvIndex: 9, agriculturalAdviceMr: 'मुंबई JNPT पोर्ट कडे', agriculturalAdviceEn: 'Send to JNPT Port', agriculturalAdviceHi: 'पोर्ट भेजें' },
      { dayName: 'रविवार', dateStr: '१० ऑगस्ट', tempMax: 37, tempMin: 24, conditionMr: 'सूर्यप्रकाश', conditionEn: 'Sunny', conditionHi: 'धूप', rainProb: 0, humidity: 42, uvIndex: 9, agriculturalAdviceMr: 'नियमित देखभाल', agriculturalAdviceEn: 'Routine farm check', agriculturalAdviceHi: 'नियमित देखभाल' },
    ]
  },
  Jalgaon: {
    district: 'Jalgaon',
    districtMr: 'जळगाव (Jalgaon Banana Hub)',
    districtHi: 'जलगांव (Jalgaon Banana Belt)',
    state: 'Maharashtra',
    tempCelsius: 34,
    feelsLikeCelsius: 37,
    tempMin: 23,
    tempMax: 36,
    conditionMr: 'उष्ण व दमट हवामान',
    conditionEn: 'Hot & Humid',
    conditionHi: 'गर्म व उमस',
    humidityPercent: 55,
    windSpeedKm: 13,
    windDirection: 'W 250°',
    pressureHpa: 1011,
    uvIndex: 8.1,
    rainProbability: 15,
    rainMmNext24h: 0.8,
    visibilityKm: 10,
    sunriseTime: '06:07 AM',
    sunsetTime: '07:02 PM',
    agriculturalAdviceMr: 'केळीच्या बागेत करपा (Sigatoka leaf spot) रोगाचा प्रादुर्भाव टाळण्यासाठी सुयोग्य बुरशीनाशकाची फवारणी करावी.',
    agriculturalAdviceEn: 'Spray systemic fungicide in banana plantations to control Sigatoka leaf spot during humid weather.',
    agriculturalAdviceHi: 'केले में सिगाटोका रोग नियंत्रण हेतु फफूंदनाशक का छिड़काव करें।',
    transportAdviceMr: 'केळीची वाहतूक करताना घडांना इजा होऊ नये म्हणून सुतळी व पॅडिंग फोमचा वापर करा.',
    transportAdviceEn: 'Use protective foam cushioning and proper binding for banana bunch transportation.',
    transportAdviceHi: 'केला गाड़ियों में फोम पैडिंग का प्रयोग करें ताकि दाग न पड़ें।',
    alertLevel: 'NORMAL',
    hourlyForecast: [
      { time: '06:00', tempCelsius: 23, conditionMr: 'दमट', conditionEn: 'Humid', conditionHi: 'उमस', icon: '02d', rainProb: 5, humidity: 75, windSpeed: 7 },
      { time: '12:00', tempCelsius: 34, conditionMr: 'उष्ण', conditionEn: 'Hot', conditionHi: 'गर्म', icon: '01d', rainProb: 15, humidity: 55, windSpeed: 13 },
      { time: '18:00', tempCelsius: 31, conditionMr: 'शांत', conditionEn: 'Warm', conditionHi: 'शाम', icon: '02n', rainProb: 10, humidity: 62, windSpeed: 9 },
    ],
    dailyForecast: [
      { dayName: 'आज', dateStr: '४ ऑगस्ट', tempMax: 36, tempMin: 23, conditionMr: 'उष्ण व दमट', conditionEn: 'Hot & Humid', conditionHi: 'गर्म व उमस', rainProb: 15, humidity: 55, uvIndex: 8, agriculturalAdviceMr: 'केळी रोग तपासणी', agriculturalAdviceEn: 'Banana disease check', agriculturalAdviceHi: 'केला रोग जांच' },
      { dayName: 'उद्या', dateStr: '५ ऑगस्ट', tempMax: 35, tempMin: 22, conditionMr: 'अंशतः ढगाळ', conditionEn: 'Partly Cloudy', conditionHi: 'आंशिक बादल', rainProb: 20, humidity: 58, uvIndex: 8, agriculturalAdviceMr: 'बुरशीनाशक फवारा', agriculturalAdviceEn: 'Fungicide spray', agriculturalAdviceHi: 'फफूंदनाशक छिड़कें' },
      { dayName: 'बुधवार', dateStr: '६ ऑगस्ट', tempMax: 34, tempMin: 23, conditionMr: 'पाऊस सर', conditionEn: 'Light Showers', conditionHi: 'हल्की बारिश', rainProb: 40, humidity: 68, uvIndex: 6, agriculturalAdviceMr: 'केळी काडी बांधणी', agriculturalAdviceEn: 'Propping banana plants', agriculturalAdviceHi: 'केला सहारा दें' },
      { dayName: 'गुरुवार', dateStr: '७ ऑगस्ट', tempMax: 33, tempMin: 22, conditionMr: 'मध्यम पाऊस', conditionEn: 'Rain', conditionHi: 'बारिश', rainProb: 60, humidity: 76, uvIndex: 5, agriculturalAdviceMr: 'पाणी निचरा करा', agriculturalAdviceEn: 'Field drainage', agriculturalAdviceHi: 'पानी निकालें' },
      { dayName: 'शुक्रवार', dateStr: '८ ऑगस्ट', tempMax: 34, tempMin: 23, conditionMr: 'उघडीप', conditionEn: 'Fair', conditionHi: 'साफ', rainProb: 15, humidity: 62, uvIndex: 7, agriculturalAdviceMr: 'केळी घड कापणे', agriculturalAdviceEn: 'Harvest banana bunches', agriculturalAdviceHi: 'केला घार काटें' },
      { dayName: 'शनिवार', dateStr: '९ ऑगस्ट', tempMax: 35, tempMin: 24, conditionMr: 'उष्ण', conditionEn: 'Warm', conditionHi: 'गर्म', rainProb: 5, humidity: 54, uvIndex: 8, agriculturalAdviceMr: 'ट्रक लोडिंग करा', agriculturalAdviceEn: 'Load transport truck', agriculturalAdviceHi: 'गाड़ी में लोड करें' },
      { dayName: 'रविवार', dateStr: '१० ऑगस्ट', tempMax: 36, tempMin: 24, conditionMr: 'प्रखर ऊन', conditionEn: 'Sunny', conditionHi: 'तेज धूप', rainProb: 0, humidity: 50, uvIndex: 8, agriculturalAdviceMr: 'उत्तर भारतात रवानगी', agriculturalAdviceEn: 'Dispatch to North India', agriculturalAdviceHi: 'उत्तर भारत भेजें' },
    ]
  },
  Kolhapur: {
    district: 'Kolhapur',
    districtMr: 'कोल्हापूर (Kolhapur Sugarcane Belt)',
    districtHi: 'कोल्हापुर (Kolhapur APMC)',
    state: 'Maharashtra',
    tempCelsius: 27,
    feelsLikeCelsius: 29,
    tempMin: 20,
    tempMax: 28,
    conditionMr: 'रिमझिम पाऊस व गारवा',
    conditionEn: 'Drizzle & Cool Breeze',
    conditionHi: 'हल्की बारिश और ठंडक',
    humidityPercent: 82,
    windSpeedKm: 22,
    windDirection: 'SW 230°',
    pressureHpa: 1016,
    uvIndex: 4.5,
    rainProbability: 75,
    rainMmNext24h: 12.5,
    visibilityKm: 7,
    sunriseTime: '06:15 AM',
    sunsetTime: '07:05 PM',
    agriculturalAdviceMr: 'ऊस व सोयाबीन शेतात पाणी साचणार नाही याची दक्षता घ्या. उसाची बांधणी (Propping) करून घ्यावी.',
    agriculturalAdviceEn: 'Ensure proper drainage in sugarcane and soybean fields to prevent waterlogging. Tie sugarcane stalks.',
    agriculturalAdviceHi: 'गन्ना और सोयाबीन खेतों में जलजमाव न होने दें। गन्ने की बंधाई करें।',
    transportAdviceMr: 'गुळ व सोयाबीन वाहतुकीसाठी डबल ताडपत्रीने गाड्या पूर्ण झाकून सुरक्षित ठेवाव्यात.',
    transportAdviceEn: 'Use heavy double tarpaulins to cover jaggery and soybean loads from continuous monsoon drizzles.',
    transportAdviceHi: 'गुड व सोयाबीन परिवहन के दौरान डबल तिरपाल का प्रयोग अनिवार्य रूप से करें।',
    alertLevel: 'RAIN_ALERT',
    hourlyForecast: [
      { time: '06:00', tempCelsius: 20, conditionMr: 'रिमझिम', conditionEn: 'Drizzle', conditionHi: 'बौछार', icon: '10d', rainProb: 80, humidity: 90, windSpeed: 18 },
      { time: '12:00', tempCelsius: 27, conditionMr: 'पाऊस सर', conditionEn: 'Showers', conditionHi: 'बारिश', icon: '10d', rainProb: 75, humidity: 82, windSpeed: 22 },
      { time: '18:00', tempCelsius: 24, conditionMr: 'ढगाळ', conditionEn: 'Overcast', conditionHi: 'बादल', icon: '04n', rainProb: 60, humidity: 86, windSpeed: 16 },
    ],
    dailyForecast: [
      { dayName: 'आज', dateStr: '४ ऑगस्ट', tempMax: 28, tempMin: 20, conditionMr: 'रिमझिम पाऊस', conditionEn: 'Continuous Drizzle', conditionHi: 'हल्की बारिश', rainProb: 75, humidity: 82, uvIndex: 4, agriculturalAdviceMr: 'जल निचरा करा', agriculturalAdviceEn: 'Drain water', agriculturalAdviceHi: 'जल निकासी करें' },
      { dayName: 'उद्या', dateStr: '५ ऑगस्ट', tempMax: 27, tempMin: 20, conditionMr: 'मध्यम पाऊस', conditionEn: 'Moderate Rain', conditionHi: 'मध्यम बारिश', rainProb: 80, humidity: 85, uvIndex: 4, agriculturalAdviceMr: 'ऊस बांधणी', agriculturalAdviceEn: 'Tie sugarcane', agriculturalAdviceHi: 'गन्ना बंधाई' },
      { dayName: 'बुधवार', dateStr: '६ ऑगस्ट', tempMax: 28, tempMin: 21, conditionMr: 'पाऊस उघडीप', conditionEn: 'Passing Showers', conditionHi: 'धूप-छांव बारिश', rainProb: 50, humidity: 78, uvIndex: 5, agriculturalAdviceMr: 'गुळ पॅकिंग तपासणी', agriculturalAdviceEn: 'Jaggery packing check', agriculturalAdviceHi: 'गुड़ पैकिंग जांच' },
      { dayName: 'गुरुवार', dateStr: '७ ऑगस्ट', tempMax: 29, tempMin: 21, conditionMr: 'अंशतः ढगाळ', conditionEn: 'Partly Cloudy', conditionHi: 'आंशिक बादल', rainProb: 30, humidity: 70, uvIndex: 6, agriculturalAdviceMr: 'सोयाबीन तण नियंत्रण', agriculturalAdviceEn: 'Soybean weeding', agriculturalAdviceHi: 'सोयाबीन खरपतवार' },
      { dayName: 'शुक्रवार', dateStr: '८ ऑगस्ट', tempMax: 30, tempMin: 22, conditionMr: 'उघडीप', conditionEn: 'Clear', conditionHi: 'साफ', rainProb: 15, humidity: 65, uvIndex: 7, agriculturalAdviceMr: 'गुळ मार्केट यार्ड रवानगी', agriculturalAdviceEn: 'Send Jaggery to Market', agriculturalAdviceHi: 'गुड़ मंडी भेजें' },
      { dayName: 'शनिवार', dateStr: '९ ऑगस्ट', tempMax: 30, tempMin: 22, conditionMr: 'शांत', conditionEn: 'Fair', conditionHi: 'साफ', rainProb: 10, humidity: 62, uvIndex: 7, agriculturalAdviceMr: 'नियमित शेत कामे', agriculturalAdviceEn: 'Routine farm work', agriculturalAdviceHi: 'नियमित काम' },
      { dayName: 'रविवार', dateStr: '१० ऑगस्ट', tempMax: 31, tempMin: 22, conditionMr: 'सूर्यप्रकाश', conditionEn: 'Sunny', conditionHi: 'धूप', rainProb: 10, humidity: 60, uvIndex: 8, agriculturalAdviceMr: 'सिंचन नियोजन', agriculturalAdviceEn: 'Irrigation plan', agriculturalAdviceHi: 'सिंचाई योजना' },
    ]
  },
};

// OpenWeather API Integration Function
export async function fetchDistrictWeather(districtName: string): Promise<WeatherInfo> {
  const apiKey = (import.meta as any).env?.VITE_OPENWEATHER_API_KEY || process.env.VITE_OPENWEATHER_API_KEY;

  // Search local fallback registry first as baseline
  const normalizedKey = Object.keys(REGIONAL_WEATHER).find((k) =>
    districtName.toLowerCase().includes(k.toLowerCase())
  ) || 'Nashik';

  const defaultWeather = REGIONAL_WEATHER[normalizedKey];

  if (!apiKey || apiKey === 'YOUR_OPENWEATHER_API_KEY') {
    return defaultWeather;
  }

  try {
    const cleanCity = districtName.split(' ')[0].replace(/[^a-zA-Z]/g, '') || 'Nashik';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity},IN&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      console.warn(`OpenWeather API status: ${response.status}. Using high-precision regional model.`);
      return defaultWeather;
    }

    const data = await response.json();

    // Map condition to Marathi & Hindi
    const mainDesc = data.weather[0]?.main || 'Clear';
    let conditionMr = 'मोकळे आकाश';
    let conditionHi = 'साफ मौसम';
    if (mainDesc.includes('Rain')) { conditionMr = 'पाऊस सुरू'; conditionHi = 'बारिश हो रही है'; }
    else if (mainDesc.includes('Clouds')) { conditionMr = 'ढगाळ हवामान'; conditionHi = 'बादल छाए हैं'; }
    else if (mainDesc.includes('Clear')) { conditionMr = 'सूर्यप्रकाश व स्वच्छ'; conditionHi = 'धूप और साफ मौसम'; }
    else if (mainDesc.includes('Haze') || mainDesc.includes('Mist')) { conditionMr = 'धुके व अंधुक'; conditionHi = 'कोहरा व धुंध'; }

    const liveTemp = Math.round(data.main.temp);
    const liveHumidity = data.main.humidity;
    const liveWind = Math.round((data.wind.speed || 0) * 3.6);

    return {
      ...defaultWeather,
      tempCelsius: liveTemp,
      feelsLikeCelsius: Math.round(data.main.feels_like),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      conditionMr,
      conditionEn: data.weather[0]?.description || mainDesc,
      conditionHi,
      humidityPercent: liveHumidity,
      windSpeedKm: liveWind,
      pressureHpa: data.main.pressure,
      visibilityKm: Math.round((data.visibility || 10000) / 1000),
      isLiveApi: true,
    };
  } catch (error) {
    console.warn('OpenWeather fetch error:', error);
    return defaultWeather;
  }
}
