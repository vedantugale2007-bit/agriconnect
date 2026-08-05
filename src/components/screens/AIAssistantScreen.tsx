import React, { useState } from 'react';
import {
  Bot,
  Send,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Sprout,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Volume2,
  Mic,
  Globe,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { ScreenType, ChatMessage } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface AIAssistantScreenProps {
  setCurrentScreen: (screen: ScreenType) => void;
}

export const AIAssistantScreen: React.FC<AIAssistantScreenProps> = ({ setCurrentScreen }) => {
  const { language, setLanguage, t } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: language === 'mr'
        ? 'नमस्कार! मी अ‍ॅग्रीकनेक्ट AI सहाय्यक आहे. मी नाशिक आणि अहिल्यानगर भागातील शेतकरी बांधवांना कांदा, द्राक्षे आणि टोमॅटो पिकांच्या वाहतूक सुरक्षेसाठी, लासलगाव APMC बाजारभाव आणि गाडी जुळवणीसाठी मदत करू शकतो.'
        : 'Hello! I am AgriConnect AI Assistant. I can help compute crop shelf-life predictions, optimize transport routes for Maharashtra crops (Onion, Grapes, Tomatoes), and check live Lasalgaon & Nashik Mandi rates.',
      timestamp: 'आत्ताच',
    },
  ]);

  const [input, setInput] = useState('');
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert(language === 'mr' ? 'तुमच्या ब्राऊजरमध्ये व्हॉइस इनपुट उपलब्ध नाही.' : 'Voice recognition not supported in browser.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.continuous = false;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const topicCategories = language === 'mr' ? [
    { id: 'crops', label: '🌾 पीक सल्ला' },
    { id: 'disease', label: '🔬 रोग व किड निदान' },
    { id: 'fertilizer', label: '🧪 खत व औषध नियोजन' },
    { id: 'weather', label: '⛅ हवामान सल्ला' },
    { id: 'harvest', label: '✂️ काढणीची वेळ' },
    { id: 'prices', label: '📈 बाजारभाव अंदाज' },
    { id: 'logistics', label: '🚚 वाहतूक जुळवणी' },
  ] : language === 'hi' ? [
    { id: 'crops', label: '🌾 फसल सलाह' },
    { id: 'disease', label: '🔬 बीमारी पहचान' },
    { id: 'fertilizer', label: '🧪 उर्वरक सलाह' },
    { id: 'weather', label: '⛅ मौसम सलाह' },
    { id: 'harvest', label: '✂️ कटाई समय' },
    { id: 'prices', label: '📈 मंडी भाव अनुमान' },
    { id: 'logistics', label: '🚚 परिवहन सलाह' },
  ] : [
    { id: 'crops', label: '🌾 Crop Advice' },
    { id: 'disease', label: '🔬 Disease Diagnosis' },
    { id: 'fertilizer', label: '🧪 Fertilizer Guide' },
    { id: 'weather', label: '⛅ Weather Advice' },
    { id: 'harvest', label: '✂️ Harvest Timing' },
    { id: 'prices', label: '📈 Price Predictions' },
    { id: 'logistics', label: '🚚 Logistics Recs' },
  ];

  const quickPromptsMap: Record<string, string[]> = {
    crops: language === 'mr' ? [
      'नाशिक हवामानात कांदा पिकासाठी कोणत्या जमिनीत लागवड करावी?',
      'द्राक्ष पिकासाठी ठिबक सिंचन आणि छाटणीची योग्य वेळ कोणती?',
      'कमी पाण्यात येणारी फायदेशीर फळपिके कोणती आहेत?',
    ] : [
      'Which crop varieties are best suited for Nashik soil and monsoon?',
      'What are the optimal irrigation schedules for export quality grapes?',
      'Suggest drought-tolerant profitable crops for Ahilyanagar district.',
    ],
    disease: language === 'mr' ? [
      'कांद्यावरील करपा (Purple Blotch) रोगासाठी काय फवारणी करावी?',
      'द्राक्षावरील दावण्या (Downy Mildew) रोगाची सुरुवातीची लक्षणे कशी ओळखावीत?',
      'टोमॅटो पिकातील तांबड्या कोळी कीडीवर उपाय सांगा.',
    ] : [
      'What organic spray controls Purple Blotch disease in onion crops?',
      'How to prevent Downy Mildew fungal outbreak in grape vineyards during humidity?',
      'Symptoms and treatment for Tomato Leaf Curl virus.',
    ],
    fertilizer: language === 'mr' ? [
      'उसाच्या पिकासाठी NPK खतांची मात्रा कशी द्यावी?',
      'कांद्याचा आकार आणि गुणवत्ता वाढवण्यासाठी कोणत्या सूक्ष्म अन्नद्रव्यांची गरज असते?',
      'सेंद्रिय खते आणि जिवाणू खतांचा वापर कसा करावा?',
    ] : [
      'NPK fertilizer ratio for high-yield onion bulb development.',
      'Micro-nutrient dosage for pomegranate size and color enhancement.',
      'Bio-fertilizer application schedule for wheat farming.',
    ],
    weather: language === 'mr' ? [
      'सिन्नर भागात पुढील ४ दिवसांत पावसाची शक्यता आहे का?',
      'उष्णतेच्या लाटेत टोमॅटो पिकाचे संरक्षण कसे करावे?',
      'धुके आणि अचानक तापमानातील घसरणीचा द्राक्ष पिकावर काय परिणाम होतो?',
    ] : [
      'How to protect tomato crops during heatwaves above 38°C in Nashik?',
      'Weather forecast and spraying advisory for grape orchards this week.',
      'Humidity control techniques for cold storage transit during heavy rain.',
    ],
    harvest: language === 'mr' ? [
      'लाल कांदा काढणीसाठी कधी तयार होतो? ओळखण्याच्या खुणा सांगा.',
      'निर्यातक्षम द्राक्षांची गोडी (TSS sugar) कधी व कशी मोजावी?',
      'टोमॅटोची तोडणी कोणत्या टप्प्यावर करावी जेणेकरून वाहतुकीत खराब होणार नाही?',
    ] : [
      'How to determine maturity indices for red onion harvesting?',
      'Brix sugar level check for export table grapes harvesting.',
      'Ideal picking stage for tomatoes intended for long-distance transport to Delhi.',
    ],
    prices: language === 'mr' ? [
      'लासलगाव APMC मध्ये पुढील आठवड्यात कांद्याचे दर कसे राहतील?',
      'पिंपळगाव बाजारात टोमॅटोच्या आवकनुसार बाजारभावाचा अंदाज सांगा.',
      'सोलापूर आणि पुणे एपीएमसी मधील डाळिंबाचे सरासरी दर काय आहेत?',
    ] : [
      'Lasalgaon APMC onion price trend prediction for next week.',
      'Demand-supply price forecast for tomatoes at Pimpalgaon Market.',
      'Pomegranate export pricing trends at Pune and Mumbai APMC.',
    ],
    logistics: language === 'mr' ? [
      '१० टन कांदा नाशिक ते मुंबई वाहून नेण्यासाठी कोणता ट्रक योग्य राहील?',
      'नाशिक ते दिल्ली द्राक्ष वाहतुकीसाठी रेफ्रिजरेटेड टेम्परेचर काय ठेवावे?',
      'नाशिक-पुणे महामार्गावर सर्वात कमी भाड्यात गाडी कशी शोधावी?',
    ] : [
      'Which truck is most cost-effective for 10 Ton onion transport from Nashik to Mumbai?',
      'Reefer container setpoint temperature for grape transit to JNPT Port.',
      'How to optimize transport route from Sinnar to Delhi to cut fuel costs?',
    ],
  };

  const [activeTopic, setActiveTopic] = useState<string>('crops');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (promptText?: string) => {
    const textToSend = promptText || input;
    if (!textToSend && !selectedImageBase64) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend || (language === 'mr' ? 'पिकाच्या फोटोचे विश्लेषण करा.' : 'Uploaded crop photo for diagnostic analysis.'),
      imageUrl: selectedImageBase64 || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    const tempImage = selectedImageBase64;
    setSelectedImageBase64(null);
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          imageBase64: tempImage,
        }),
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || (language === 'mr' ? 'मी तुमच्या विनंतीचे विश्लेषण केले आहे. वाहनाचे तापमान ५.०°C वर नियंत्रित ठेवा.' : 'I analyzed your request. Ensure optimal refrigerated setpoint at 5.0°C.'),
        cropDiagnosis: data.cropDiagnosis,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI assistant error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20">
            <Bot className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white font-display">AgriConnect AI Assistant</h1>
            <p className="text-xs text-slate-400">Gemini-powered Maharashtra Crop & Cold-Chain Advisor</p>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-2xl">
          <Globe className="w-4 h-4 text-emerald-400 ml-2" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-transparent text-xs text-white font-bold outline-none pr-2 cursor-pointer"
          >
            <option value="mr" className="bg-slate-950">मराठी (Marathi)</option>
            <option value="hi" className="bg-slate-950">हिंदी (Hindi)</option>
            <option value="en" className="bg-slate-950">English</option>
          </select>
        </div>
      </div>

      {/* Topic Categories Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {topicCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTopic(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
              activeTopic === cat.id
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Quick Prompts Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">
          {language === 'mr' ? 'त्वरित प्रश्न:' : 'Quick Queries:'}
        </span>
        {(quickPromptsMap[activeTopic] || quickPromptsMap['crops']).map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp)}
            className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:border-emerald-500 hover:text-white transition-all shrink-0 cursor-pointer"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Chat History Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-[480px] overflow-y-auto space-y-4 shadow-2xl flex flex-col justify-between">
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed space-y-3 ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-semibold'
                    : 'bg-slate-950 border border-slate-800 text-slate-200'
                }`}
              >
                {/* User Image Preview if uploaded */}
                {m.imageUrl && (
                  <img
                    src={m.imageUrl}
                    alt="Uploaded crop"
                    className="w-48 h-32 object-cover rounded-xl border border-slate-700"
                  />
                )}

                <p>{m.text}</p>

                {/* Multimodal Crop Diagnosis Render */}
                {m.cropDiagnosis && (
                  <div className="bg-slate-900 border border-emerald-800 p-4 rounded-xl text-xs space-y-2 mt-2">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span>{m.cropDiagnosis.cropName}</span>
                      <span>{m.cropDiagnosis.confidence}% AI विश्वासार्हता</span>
                    </div>
                    <div className="text-slate-300 font-semibold">
                      स्थिती: <span className="text-amber-300">{m.cropDiagnosis.condition}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">महत्त्वाच्या नोंदी:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                        {m.cropDiagnosis.issues.map((iss, i) => (
                          <li key={i}>{iss}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] text-emerald-400 uppercase font-bold block">सुचवलेले उपाय:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-200 font-medium">
                        {m.cropDiagnosis.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/50">
                  {m.sender === 'ai' && (
                    <button
                      onClick={() => speakText(m.text)}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 cursor-pointer text-[10px]"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{language === 'mr' ? 'ऐका (Listen)' : 'Listen'}</span>
                    </button>
                  )}
                  <div className="text-[9px] text-slate-400 ml-auto">{m.timestamp}</div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs text-emerald-400 flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>{language === 'mr' ? 'Agri AI माहिती प्रक्रिया करत आहे...' : 'Agri AI is processing your query...'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl space-y-3 shadow-xl">
        
        {selectedImageBase64 && (
          <div className="flex items-center space-x-3 p-2 bg-slate-950 rounded-xl border border-slate-800">
            <img src={selectedImageBase64} alt="Crop sample" className="w-10 h-10 object-cover rounded-lg" />
            <span className="text-xs text-slate-300 font-bold">
              {language === 'mr' ? 'पिकाचा फोटो जोडला आहे' : 'Crop photo attached for diagnostic scan'}
            </span>
            <button
              onClick={() => setSelectedImageBase64(null)}
              className="text-xs text-rose-400 hover:underline ml-auto"
            >
              {language === 'mr' ? 'काढून टाका' : 'Remove'}
            </button>
          </div>
        )}

        <div className="flex items-center space-x-2">
          
          {/* Upload Image Button */}
          <label className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 cursor-pointer" title="Upload Crop Image">
            <ImageIcon className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* Voice Input Mic Button */}
          <button
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-emerald-400'
            }`}
            title="Voice Input (मराठी/हिंदी/English)"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={language === 'mr' ? 'कांदा, द्राक्षे, तापमान किंवा लासलगाव बाजारभावाबद्दल विचारा...' : 'Ask about crop loss, reefer temperature setpoints, or Mandi rates...'}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 outline-none"
          />

          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

    </div>
  );
};

