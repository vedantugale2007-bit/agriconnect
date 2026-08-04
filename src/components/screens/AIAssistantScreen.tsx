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

  const quickPrompts = language === 'mr' ? [
    '३८°C तापमानात सिन्नर ते मुंबई १० टन टोमॅटो पिकाचे नुकसान कसे टाळावे?',
    'पिंपळगाव वरून द्राक्ष निर्यातीसाठी सर्वोत्तम टेम्परेचर काय असावे?',
    'लासलगाव APMC मध्ये आज कांद्याचे कमाल व किमान बाजारभाव काय आहेत?',
  ] : [
    'Estimate crop loss for 10T Tomatoes from Sinnar to Mumbai in 38°C heat',
    'What temperature is best for Export Grapes from Pimpalgaon to JNPT Port?',
    'What are today\'s onion Mandi prices at Lasalgaon APMC?',
  ];

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

      {/* Quick Prompts Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">
          {language === 'mr' ? 'त्वरित प्रश्न:' : 'Quick Queries:'}
        </span>
        {quickPrompts.map((qp, idx) => (
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

                <div className="text-[9px] text-slate-400 text-right">{m.timestamp}</div>
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

