import React, { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Send,
  Image as ImageIcon,
  RefreshCw,
  X,
  Sparkles,
  Sprout,
} from 'lucide-react';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAssistant } from '../context/AssistantContext';

export const AIAssistantWidget: React.FC = () => {
  const { language, tr } = useLanguage();
  const { isOpen, openAssistant, closeAssistant } = useAssistant();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const welcomeText = tr({
    mr: 'नमस्कार! मी ॲग्रीकनेक्ट एआय सहाय्यक आहे. मी कांदा, द्राक्षे व टोमॅटो पिकांची वाहतूक सुरक्षा, लासलगाव एपीएमसी बाजारभाव आणि गाडी जुळवणीसाठी मदत करू शकतो.',
    hi: 'नमस्ते! मैं एग्रीकनेक्ट एआई सहायक हूं। मैं प्याज, अंगूर व टमाटर की परिवहन सुरक्षा, लासलगांव एपीएमसी मंडी भाव और वाहन मिलान में मदद कर सकता हूं।',
    en: 'Hello! I am the AgriConnect AI Assistant. I can help with crop shelf-life for Onion, Grapes and Tomato, live Lasalgaon APMC rates, and matching the right transport vehicle.',
  });

  // Seed the welcome message whenever language changes and there is no conversation yet.
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, isOpen]);

  const quickPrompts = tr({
    mr: 'ऊन ३८°C असताना सिन्नर ते मुंबई १० टन टोमॅटो नुकसान कसे टाळावे?|पिंपळगावहून द्राक्ष निर्यातीसाठी योग्य तापमान किती?|आज लासलगाव एपीएमसीत कांद्याचा भाव काय आहे?',
    hi: '38°C गर्मी में सिन्नर से मुंबई 10 टन टमाटर का नुकसान कैसे रोकें?|पिंपलगांव से अंगूर निर्यात के लिए सही तापमान क्या है?|आज लासलगांव एपीएमसी में प्याज का भाव क्या है?',
    en: 'Reduce loss for 10T Tomatoes from Sinnar to Mumbai in 38°C heat|Best temperature for export grapes from Pimpalgaon to JNPT?|What are today\'s onion rates at Lasalgaon APMC?',
  }).split('|');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImageBase64(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (promptText?: string) => {
    const textToSend = promptText || input;
    if (!textToSend && !selectedImageBase64) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend || tr({ mr: 'पिकाच्या फोटोचे विश्लेषण करा.', hi: 'फसल के फोटो का विश्लेषण करें।', en: 'Analyze this crop photo.' }),
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
        body: JSON.stringify({ message: textToSend, imageBase64: tempImage, language }),
      });
      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text:
          data.reply ||
          tr({
            mr: 'मी तुमच्या विनंतीचे विश्लेषण केले आहे. वाहनाचे तापमान ५°C वर नियंत्रित ठेवा.',
            hi: 'मैंने आपके अनुरोध का विश्लेषण किया है। वाहन का तापमान 5°C पर रखें।',
            en: 'I analyzed your request. Keep the reefer setpoint around 5°C.',
          }),
        cropDiagnosis: data.cropDiagnosis,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('[v0] AI assistant error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: tr({
            mr: 'क्षमस्व, सध्या उत्तर मिळू शकले नाही. कृपया पुन्हा प्रयत्न करा.',
            hi: 'क्षमा करें, अभी उत्तर नहीं मिल सका। कृपया पुनः प्रयास करें।',
            en: 'Sorry, I could not respond right now. Please try again.',
          }),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher button */}
      {!isOpen && (
        <button
          onClick={openAssistant}
          aria-label={tr({ mr: 'एआय सहाय्यक उघडा', hi: 'एआई सहायक खोलें', en: 'Open AI Assistant' })}
          className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-3.5 text-slate-950 font-bold text-sm shadow-2xl shadow-emerald-500/30 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer"
        >
          <Bot className="w-5 h-5 stroke-[2.5]" />
          <span className="hidden sm:inline">{tr({ mr: 'कृषी एआय', hi: 'कृषि एआई', en: 'Agri AI' })}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-950 animate-pulse" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-96 h-[560px] max-h-[calc(100vh-2.5rem)] flex flex-col rounded-3xl bg-slate-900 border border-emerald-800/70 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-950 border-b border-emerald-800/60">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950">
                <Bot className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{tr({ mr: 'कृषी एआय सहाय्यक', hi: 'कृषि एआई सहायक', en: 'Agri AI Assistant' })}</div>
                <div className="text-[10px] text-emerald-300/80 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{tr({ mr: 'जेमिनी द्वारे संचालित', hi: 'जेमिनी द्वारा संचालित', en: 'Powered by Gemini' })}</span>
                </div>
              </div>
            </div>
            <button
              onClick={closeAssistant}
              aria-label={tr({ mr: 'बंद करा', hi: 'बंद करें', en: 'Close' })}
              className="p-1.5 rounded-lg text-emerald-200 hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-950">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed space-y-2 ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-semibold'
                      : 'bg-slate-900 border border-slate-800 text-slate-200'
                  }`}
                >
                  {m.imageUrl && (
                    <img src={m.imageUrl} alt="crop" className="w-40 h-28 object-cover rounded-lg border border-slate-700" />
                  )}
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {m.cropDiagnosis && (
                    <div className="bg-slate-950 border border-emerald-800 p-3 rounded-xl space-y-1.5 mt-1">
                      <div className="flex items-center justify-between text-emerald-400 font-bold">
                        <span>{m.cropDiagnosis.cropName}</span>
                        <span>{m.cropDiagnosis.confidence}%</span>
                      </div>
                      <div className="text-slate-300">
                        {tr({ mr: 'स्थिती', hi: 'स्थिति', en: 'Condition' })}: <span className="text-amber-300">{m.cropDiagnosis.condition}</span>
                      </div>
                      {m.cropDiagnosis.recommendations?.length > 0 && (
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-200">
                          {m.cropDiagnosis.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  <div className="text-[9px] opacity-70 text-right">{m.timestamp}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-xs text-emerald-400 flex items-center space-x-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{tr({ mr: 'एआय विचार करत आहे...', hi: 'एआई सोच रहा है...', en: 'AI is thinking...' })}</span>
                </div>
              </div>
            )}

            {messages.length <= 1 && !loading && (
              <div className="space-y-2 pt-1">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(qp)}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-[11px] hover:border-emerald-500 hover:text-white transition-all cursor-pointer flex items-center space-x-2"
                  >
                    <Sprout className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{qp}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2">
            {selectedImageBase64 && (
              <div className="flex items-center space-x-2 p-2 bg-slate-950 rounded-xl border border-slate-800">
                <img src={selectedImageBase64} alt="attached crop" className="w-8 h-8 object-cover rounded-lg" />
                <span className="text-[11px] text-slate-300 font-semibold">
                  {tr({ mr: 'फोटो जोडला', hi: 'फोटो जोड़ा', en: 'Photo attached' })}
                </span>
                <button onClick={() => setSelectedImageBase64(null)} className="text-[11px] text-rose-400 hover:underline ml-auto cursor-pointer">
                  {tr({ mr: 'काढा', hi: 'हटाएं', en: 'Remove' })}
                </button>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <label
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 cursor-pointer"
                title={tr({ mr: 'फोटो अपलोड करा', hi: 'फोटो अपलोड करें', en: 'Upload photo' })}
              >
                <ImageIcon className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) handleSendMessage();
                }}
                placeholder={tr({
                  mr: 'पीक, तापमान किंवा बाजारभावाबद्दल विचारा...',
                  hi: 'फसल, तापमान या मंडी भाव के बारे में पूछें...',
                  en: 'Ask about crops, temperature, or Mandi rates...',
                })}
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500 outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer"
                aria-label={tr({ mr: 'पाठवा', hi: 'भेजें', en: 'Send' })}
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
