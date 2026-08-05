import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  Gauge,
  Sunrise,
  Sunset,
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  MapPin,
  RefreshCw,
  Truck,
  Sprout,
  Calendar,
  ChevronRight,
  TrendingDown,
  Umbrella,
} from 'lucide-react';
import { ScreenType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { REGIONAL_WEATHER, fetchDistrictWeather, WeatherInfo } from '../../utils/weather';

interface WeatherScreenProps {
  setCurrentScreen: (screen: ScreenType) => void;
}

const MAHARASHTRA_DISTRICTS = [
  'Nashik',
  'Ahilyanagar',
  'Pune',
  'Lasalgaon',
  'ChhatrapatiSambhajinagar',
  'Solapur',
  'Jalgaon',
  'Kolhapur',
];

export const WeatherScreen: React.FC<WeatherScreenProps> = ({ setCurrentScreen }) => {
  const { language, t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nashik');
  const [weatherData, setWeatherData] = useState<WeatherInfo>(REGIONAL_WEATHER['Nashik']);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'agri' | 'logistics'>('overview');

  useEffect(() => {
    loadWeather(selectedDistrict);
  }, [selectedDistrict]);

  const loadWeather = async (district: string) => {
    setLoading(true);
    try {
      const data = await fetchDistrictWeather(district);
      setWeatherData(data);
    } catch (e) {
      console.warn('Error loading weather:', e);
    } finally {
      setLoading(false);
    }
  };

  const getAlertBadge = (level: WeatherInfo['alertLevel']) => {
    switch (level) {
      case 'HEAT_WARNING':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'उष्णतेचा इशारा (Heat Alert)' : language === 'hi' ? 'लू का अलर्ट (Heat Alert)' : 'Heat Warning'}</span>
          </span>
        );
      case 'RAIN_ALERT':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-bold">
            <CloudRain className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'पावसाची शक्यता (Rain Warning)' : language === 'hi' ? 'बारिश की चेतावनी' : 'Heavy Rain Warning'}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'अनुकूल हवामान (Normal)' : language === 'hi' ? 'अनुकूल मौसम (Normal)' : 'Normal Conditions'}</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border-b border-emerald-800/50 pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 mb-1">
                <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  {language === 'mr' ? 'थेट हवामान व शेती सल्ला' : language === 'hi' ? 'लाइव मौसम और कृषि सलाह' : 'Live Agri Weather & Climate Advisory'}
                </span>
                {weatherData.isLiveApi && (
                  <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-400/40">
                    OpenWeather API Live
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {language === 'mr' ? 'महाराष्ट्र प्रादेशिक हवामान केंद्र' : language === 'hi' ? 'महाराष्ट्र क्षेत्रीय मौसम केंद्र' : 'Maharashtra District Climate Intelligence'}
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                {language === 'mr'
                  ? 'पिकांचे संरक्षण, जल व्यवस्थापन आणि बाजार वाहतुकीसाठी रिअल-टाइम हवामान अंदाज व कृषी सल्ला.'
                  : language === 'hi'
                  ? 'फसलों की सुरक्षा, जल प्रबंधन और बाजार परिवहन के लिए रियल-टाइम मौसम और कृषि सलाह।'
                  : 'Real-time weather telemetry, 7-day agricultural forecasts, rain risk predictions & transport logistics advice.'}
              </p>
            </div>

            {/* Refresh Button & District Switcher */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => loadWeather(selectedDistrict)}
                disabled={loading}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-2xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{language === 'mr' ? 'अपडेट करा' : language === 'hi' ? 'अपडेट करें' : 'Refresh'}</span>
              </button>

              <button
                onClick={() => setCurrentScreen('farmer-dashboard')}
                className="px-4 py-3 bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-2xl hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                {t('dashboard')}
              </button>
            </div>
          </div>

          {/* District Selector Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {MAHARASHTRA_DISTRICTS.map((distKey) => {
              const info = REGIONAL_WEATHER[distKey];
              const isSelected = selectedDistrict === distKey;
              return (
                <button
                  key={distKey}
                  onClick={() => setSelectedDistrict(distKey)}
                  className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all border cursor-pointer flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                  <span>
                    {language === 'mr'
                      ? info?.districtMr.split(' ')[0]
                      : language === 'hi'
                      ? info?.districtHi.split(' ')[0]
                      : info?.district}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 space-y-8">
        
        {/* Main Weather Telemetry Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Primary Temp & Condition */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>
                    {language === 'mr' ? weatherData.districtMr : language === 'hi' ? weatherData.districtHi : weatherData.district}, {weatherData.state}
                  </span>
                </div>
                {getAlertBadge(weatherData.alertLevel)}
              </div>

              <div className="flex items-baseline space-x-4">
                <span className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 font-display">
                  {weatherData.tempCelsius}°C
                </span>
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-slate-300">
                    {language === 'mr' ? weatherData.conditionMr : language === 'hi' ? weatherData.conditionHi : weatherData.conditionEn}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {language === 'mr' ? `जाणवणारे तापमान: ${weatherData.feelsLikeCelsius}°C` : language === 'hi' ? `महसूस: ${weatherData.feelsLikeCelsius}°C` : `Feels like ${weatherData.feelsLikeCelsius}°C`}
                  </div>
                  <div className="text-xs text-slate-500">
                    Min {weatherData.tempMin}°C • Max {weatherData.tempMax}°C
                  </div>
                </div>
              </div>

              {/* Rain Probability Banner */}
              <div className="bg-blue-950/40 border border-blue-800/40 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400">
                    <CloudRain className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-200">
                      {language === 'mr' ? 'पावसाचा धोका व अंदाज' : language === 'hi' ? 'बारिश की संभावना' : 'Rain Risk Prediction'}
                    </div>
                    <div className="text-[11px] text-blue-300/80">
                      {language === 'mr' ? `पुढील २४ तासात ${weatherData.rainMmNext24h} मिमी वर्षाव` : language === 'hi' ? `अगले 24 घंटे में ${weatherData.rainMmNext24h} मिमी बारिश` : `${weatherData.rainMmNext24h} mm predicted in next 24 hrs`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-300">{weatherData.rainProbability}%</div>
                  <div className="text-[10px] text-blue-400 uppercase font-bold">{language === 'mr' ? 'शक्यता' : language === 'hi' ? 'संभावना' : 'Chance'}</div>
                </div>
              </div>
            </div>

            {/* Secondary Environmental Gauges */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>{language === 'mr' ? 'आर्द्रता' : language === 'hi' ? 'नमी' : 'Humidity'}</span>
                  <Droplets className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-xl font-black text-white">{weatherData.humidityPercent}%</div>
                <div className="text-[10px] text-slate-500">{weatherData.humidityPercent > 70 ? 'High Moisture' : 'Optimal Curing'}</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>{language === 'mr' ? 'वाऱ्याचा वेग' : language === 'hi' ? 'हवा गति' : 'Wind Speed'}</span>
                  <Wind className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-xl font-black text-white">{weatherData.windSpeedKm} km/h</div>
                <div className="text-[10px] text-slate-500">{weatherData.windDirection}</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>{language === 'mr' ? 'युव्ही इंडेक्स' : language === 'hi' ? 'यूवी इंडेक्स' : 'UV Index'}</span>
                  <Sun className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl font-black text-amber-300">{weatherData.uvIndex}</div>
                <div className="text-[10px] text-amber-400/80">{weatherData.uvIndex > 7 ? 'High Sun Intensity' : 'Moderate'}</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>{language === 'mr' ? 'हवेचा दाब' : language === 'hi' ? 'वायुदाब' : 'Pressure'}</span>
                  <Gauge className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-xl font-black text-white">{weatherData.pressureHpa} hPa</div>
                <div className="text-[10px] text-slate-500">Barometric Stable</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>{language === 'mr' ? 'दृश्यमानता' : language === 'hi' ? 'दृश्यता' : 'Visibility'}</span>
                  <Eye className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl font-black text-white">{weatherData.visibilityKm} km</div>
                <div className="text-[10px] text-slate-500">Highway Transit Safe</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>{language === 'mr' ? 'सूर्योदय / सूर्यास्त' : language === 'hi' ? 'सूर्योदय / सूर्यास्त' : 'Sun Timing'}</span>
                  <Sunrise className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xs font-black text-white">{weatherData.sunriseTime}</div>
                <div className="text-[10px] text-slate-400">{weatherData.sunsetTime}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast Timeline */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-extrabold text-white">
                {language === 'mr' ? 'तासनिहाय हवामान अंदाज (Hourly Telemetry)' : language === 'hi' ? 'प्रति घंटा मौसम पूर्वानुमान' : '24-Hour Hourly Forecast'}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {language === 'mr' ? 'तापमान व पावसाचा अंदाज' : language === 'hi' ? 'तापमान और बारिश' : 'Temp & Rain Probability'}
            </span>
          </div>

          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
            {weatherData.hourlyForecast.map((hour, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 min-w-[110px] text-center space-y-2 shrink-0 transition-all hover:scale-[1.02]"
              >
                <div className="text-xs font-bold text-slate-400">{hour.time}</div>
                <div className="flex justify-center text-amber-300 my-1">
                  <Sun className="w-6 h-6" />
                </div>
                <div className="text-lg font-black text-white">{hour.tempCelsius}°C</div>
                <div className="text-[10px] text-slate-300 font-medium truncate">
                  {language === 'mr' ? hour.conditionMr : language === 'hi' ? hour.conditionHi : hour.conditionEn}
                </div>
                <div className="flex items-center justify-center space-x-1 text-[10px] text-blue-400 font-bold bg-blue-950/60 py-0.5 rounded-full">
                  <Droplets className="w-3 h-3" />
                  <span>{hour.rainProb}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs for Detailed Advisory & Forecast */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'mr' ? '७-दिवसीय अंदाज' : language === 'hi' ? '7-दिन पूर्वानुमान' : '7-Day Forecast'}</span>
          </button>

          <button
            onClick={() => setActiveTab('agri')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'agri'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>{language === 'mr' ? 'कृषी पीक सल्ला' : language === 'hi' ? 'कृषि फसल सलाह' : 'Crop Agriculture Advice'}</span>
          </button>

          <button
            onClick={() => setActiveTab('logistics')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'logistics'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>{language === 'mr' ? 'वाहतूक व वाहतूक सल्ला' : language === 'hi' ? 'परिवहन सुरक्षा सलाह' : 'Logistics & Transit Advisory'}</span>
          </button>
        </div>

        {/* Tab 1: 7-Day Forecast Grid */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weatherData.dailyForecast.map((day, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-emerald-500/40 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="font-extrabold text-sm text-white">{day.dayName}</h4>
                    <span className="text-[11px] text-slate-400">{day.dateStr}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-amber-300">{day.tempMax}°C</span>
                    <span className="text-xs text-slate-400 ml-1.5">/ {day.tempMin}°C</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">
                    {language === 'mr' ? day.conditionMr : language === 'hi' ? day.conditionHi : day.conditionEn}
                  </span>
                  <div className="flex items-center space-x-1 text-blue-400 font-bold bg-blue-950/40 px-2 py-0.5 rounded-md">
                    <CloudRain className="w-3.5 h-3.5" />
                    <span>{day.rainProb}%</span>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-xs text-emerald-300 space-y-1">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[10px] uppercase">
                    <Sprout className="w-3 h-3" />
                    <span>{language === 'mr' ? 'कृषी सल्ला' : language === 'hi' ? 'कृषि सलाह' : 'Advisory'}</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    {language === 'mr' ? day.agriculturalAdviceMr : language === 'hi' ? day.agriculturalAdviceHi : day.agriculturalAdviceEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Specific Crop Agriculture Advisory */}
        {activeTab === 'agri' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">
                  {language === 'mr' ? 'प्रमुख पिकांसाठी विशेष हवामान सल्ला' : language === 'hi' ? 'मुख्य फसलों हेतु मौसम आधारित सलाह' : 'Crop-Specific Weather Action Advisory'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'mr' ? 'नाशिक व महाराष्ट्र कृषी विद्यापीठ शिफारशींवर आधारित' : language === 'hi' ? 'महाराष्ट्र कृषि विश्वविद्यालय द्वारा अनुशंसित' : 'Based on MPKV Rahuri & Regional Agriculture Research Station recommendations'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Onion Advice */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-amber-300 font-bold text-sm">
                  <span>🧅 {language === 'mr' ? 'कांदा पीक (Onion)' : language === 'hi' ? 'प्याज फसल (Onion)' : 'Onion Crop'}</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md">
                    {weatherData.humidityPercent > 60 ? 'Humidity Risk' : 'Optimal Drying'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'mr'
                    ? weatherData.agriculturalAdviceMr
                    : language === 'hi'
                    ? weatherData.agriculturalAdviceHi
                    : weatherData.agriculturalAdviceEn}
                </p>
              </div>

              {/* Grapes Advice */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-purple-300 font-bold text-sm">
                  <span>🍇 {language === 'mr' ? 'द्राक्ष बाग (Export Grapes)' : language === 'hi' ? 'अंगूर बाग (Export Grapes)' : 'Grapes Vineyard'}</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md">
                    Temp: {weatherData.tempCelsius}°C
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'mr'
                    ? 'सकाळी ९ पूर्वी तुषार सिंचन करून बागेतील तापमान नियंत्रित ठेवा. डावणी व भुरी रोगाचा प्रादुर्भाव रोखण्यासाठी बुरशीनाशक फवारा.'
                    : language === 'hi'
                    ? 'सुबह 9 बजे से पहले सिंचाई कर तापमान नियंत्रित रखें। फफूंदनाशी का छिड़काव करें।'
                    : 'Maintain vineyard canopy humidity. Spray bio-fungicide to mitigate Downy Mildew risks during cloud cover.'}
                </p>
              </div>

              {/* Tomato Advice */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-red-300 font-bold text-sm">
                  <span>🍅 {language === 'mr' ? 'टोमॅटो (Tomato Crop)' : language === 'hi' ? 'टमाटर फसल (Tomato Crop)' : 'Tomato Crop'}</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-md">
                    Rain Risk: {weatherData.rainProbability}%
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'mr'
                    ? 'तोडणी केलेले टोमॅटो थेट उन्हात ठेवू नका. लांबच्या वाहतुकीसाठी ८०% पिकलेले टोमॅटो निवडून कॅरेटमध्ये पॅक करा.'
                    : language === 'hi'
                    ? 'कटाई किए टमाटर धूप में न रखें। लंबी यात्रा हेतु 80% पके टमाटर का चुनाव करें।'
                    : 'Avoid direct sun exposure on harvested crates. Select 80% ripe tomatoes for long-haul interstate shipments.'}
                </p>
              </div>

              {/* Pomegranate Advice */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-pink-300 font-bold text-sm">
                  <span>🍎 {language === 'mr' ? 'डाळिंब (Pomegranate)' : language === 'hi' ? 'अनार फसल (Pomegranate)' : 'Pomegranate'}</span>
                  <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-md">
                    UV: {weatherData.uvIndex}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'mr'
                    ? 'उष्ण वाऱ्यापासून फळांचे रक्षण करण्यासाठी पिकांवर बटर पेपर बॅगिंग किंवा म्युरिएट फवारणी उपयुक्त ठरेल.'
                    : language === 'hi'
                    ? 'गर्मी से बचाने हेतु फलों की पेपर बैगिंग या सूक्ष्म पोषक छिड़काव करें।'
                    : 'Use paper bagging or micronutrient sprays to protect pomegranate skins from sunburn during high UV index.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Transport & Cold Chain Weather Advisory */}
        {activeTab === 'logistics' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">
                  {language === 'mr' ? 'वाहतूकदार व चालक हवामान सल्ला' : language === 'hi' ? 'ट्रांसपोर्टर व ड्राइवर मौसम सलाह' : 'Transport & Logistics Transit Advisory'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'mr' ? 'हायवे प्रवास व कोल्ड चेन सुरक्षेसाठी मार्गदर्शक तत्त्वे' : language === 'hi' ? 'हाईवे सफर व कोल्ड चेन सुरक्षा निर्देश' : 'Cold chain setpoints & highway safety protocols'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                  <Sun className="w-4 h-4" />
                  <span>{language === 'mr' ? 'वाहतूक वेळ नियोजन' : language === 'hi' ? 'परिवहन समय' : 'Dispatch Timing'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'mr' ? weatherData.transportAdviceMr : language === 'hi' ? weatherData.transportAdviceHi : weatherData.transportAdviceEn}
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                  <Thermometer className="w-4 h-4" />
                  <span>{language === 'mr' ? 'रेफ्रीजरेटेड तापमान' : language === 'hi' ? 'रीफर तापमान' : 'Reefer Setpoint'}</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                  <li>• {language === 'mr' ? 'द्राक्षे:' : language === 'hi' ? 'अंगूर:' : 'Grapes:'} 0.5°C - 2.0°C</li>
                  <li>• {language === 'mr' ? 'टोमॅटो:' : language === 'hi' ? 'टमाटर:' : 'Tomatoes:'} 12.0°C - 15.0°C</li>
                  <li>• {language === 'mr' ? 'डाळिंब:' : language === 'hi' ? 'अनार:' : 'Pomegranates:'} 5.0°C - 8.0°C</li>
                </ul>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
                  <Umbrella className="w-4 h-4" />
                  <span>{language === 'mr' ? 'पाऊस व सुरक्षा' : language === 'hi' ? 'बारिश सुरक्षा' : 'Rain Safety'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'mr'
                    ? 'कांदा व कडधान्य वाहतुकीसाठी ताडपत्रीचे दोन्ही काठ घट्ट बांधा. महामार्गावर धुके असल्यास फॉग लाईट्स सुरू ठेवा.'
                    : language === 'hi'
                    ? 'प्याज गाड़ियों में तिरपाल कसकर बांधें। हाईवे पर कोहरा होने पर फॉग लाइट का प्रयोग करें।'
                    : 'Secure tarpaulin edges for cereal loads. Enable fog lamps during early morning highway transit.'}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
