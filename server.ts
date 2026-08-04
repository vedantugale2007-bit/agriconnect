import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '20mb' }));

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Loss Estimator Endpoint
  app.post('/api/gemini/loss-estimator', async (req, res) => {
    try {
      const { crop, weightTons, distanceMiles, ambientTempC, vehicleType } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        // Fallback calculations for Maharashtra produce
        const isColdChain = vehicleType?.toLowerCase().includes('cold') || vehicleType?.toLowerCase().includes('eicher');
        const calculatedRisk = isColdChain ? 2.5 : Math.min(26.0, (ambientTempC || 32) * 0.65);
        return res.json({
          riskLevel: calculatedRisk > 15 ? 'HIGH' : calculatedRisk > 8 ? 'MODERATE' : 'LOW',
          riskPercentage: parseFloat(calculatedRisk.toFixed(1)),
          shelfLifeHours: isColdChain ? 96 : Math.max(12, Math.round(60 - (ambientTempC || 32) * 0.9)),
          recommendedDepartureWindow: 'Departure before 07:00 AM (Avoid peak afternoon heat in Nashik highway)',
          spoilageFactor: isColdChain ? 'Optimal humidity control (+1.5°C variance)' : 'Onion respiration / Heat accumulation in transit',
          actionableInsights: [
            'Maintain transit temperature below 8°C for delicate horticulture like grapes/tomatoes.',
            'Ensure adequate ventilation slits for onion/wheat dry cargo.',
            'Route via Nashik-Pune Highway (NH-60) bypass to skip Sangamner market congestion.',
          ],
        });
      }

      const prompt = `You are an expert agricultural supply chain specialist for Maharashtra, India (Nashik & Ahilyanagar districts). 
Analyze crop transport loss risk for the following load:
- Crop: ${crop || 'Onion'}
- Weight: ${weightTons || 10} Tons
- Transit Distance: ${distanceMiles || 150} Km
- Ambient Temperature: ${ambientTempC || 33}°C
- Vehicle Type: ${vehicleType || 'Eicher 14 ft'}

Provide detailed risk estimation in JSON format matching the schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              riskLevel: { type: Type.STRING, description: 'LOW, MODERATE, or HIGH' },
              riskPercentage: { type: Type.NUMBER, description: 'Estimated loss risk percentage e.g. 3.2' },
              shelfLifeHours: { type: Type.NUMBER, description: 'Remaining shelf life in hours' },
              recommendedDepartureWindow: { type: Type.STRING, description: 'Optimal departure time recommendation' },
              spoilageFactor: { type: Type.STRING, description: 'Primary spoilage factor e.g. heat respiration' },
              actionableInsights: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'List of 3 concrete transport actions',
              },
            },
            required: ['riskLevel', 'riskPercentage', 'shelfLifeHours', 'recommendedDepartureWindow', 'spoilageFactor', 'actionableInsights'],
          },
        },
      });

      const jsonText = response.text || '{}';
      const parsed = JSON.parse(jsonText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Gemini Loss Estimator error:', error);
      res.status(500).json({ error: 'Failed to compute loss prediction', details: error.message });
    }
  });

  // AI Assistant Chat & Crop Health Diagnostic Endpoint
  app.post('/api/gemini/assistant', async (req, res) => {
    try {
      const { message, imageBase64 } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          reply: `नमस्कार! मी ॲग्रीकनेक्ट एआय सहाय्यक आहे. (Namaste! I am AgriConnect AI Assistant).\n\nआपल्या प्रश्नाचे उत्तर: "${message}".\n\nआम्ही नाशिक, अहिल्यानगर, लासलगाव, पिंपळगाव आणि पुणे-मुंबई एपीएमसी बाजारासाठी वाहनांचे बुकिंग, शीतगृह तापमान ट्रॅकिंग आणि बाजार भावाची माहिती पुरवतो.`,
          cropDiagnosis: imageBase64
            ? {
                cropName: 'तपासणी: कांदा / द्राक्षे नमुना (Onion / Grape Sample)',
                condition: 'किरकोळ उष्णता ताण (Mild Heat Respiration)',
                confidence: 95,
                issues: ['साठवणुकीत ओलसरपणाचे प्रमाण', 'वाहतुकीदरम्यान तापमानातील बदल'],
                recommendations: [
                  'वाहनात चढवण्यापूर्वी सावलीत ५ अंश से. पर्यंत पूर्व-थंड करा.',
                  'सिन्नर ते लासलगाव एपीएमसी मार्गावर शीतगृह व्हॅन वापरा.',
                  'हवेची आद्रता ६५% खाली ठेवा.',
                ],
              }
            : undefined,
        });
      }

      if (imageBase64) {
        // Multimodal Crop Diagnostic Analysis
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        const imagePart = {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Data,
          },
        };
        const textPart = {
          text: `You are AgriConnect Multimodal Crop Diagnostics Specialist focused on Maharashtra, India agriculture (Onion, Grapes, Pomegranate, Tomatoes, Sugarcane, Soybean, Wheat, Maize). 
Examine this crop photo and the user's inquiry: "${message || 'Diagnose crop health and transport readiness'}".
Analyze crop condition, disease/stress indicators, transport suitability, and key recommendations.
You can respond in Marathi, Hindi, or English based on user prompt language.
Return JSON output with a detailed reply string and structured crop diagnosis object.`,
        };

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: { parts: [imagePart, textPart] },
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reply: { type: Type.STRING, description: 'Friendly diagnostic summary' },
                cropDiagnosis: {
                  type: Type.OBJECT,
                  properties: {
                    cropName: { type: Type.STRING },
                    condition: { type: Type.STRING },
                    confidence: { type: Type.NUMBER },
                    issues: { type: Type.ARRAY, items: { type: Type.STRING } },
                    recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['cropName', 'condition', 'confidence', 'issues', 'recommendations'],
                },
              },
              required: ['reply', 'cropDiagnosis'],
            },
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json(parsed);
      } else {
        // Text Assistant
        const systemInstruction = `You are AgriConnect Maharashtra AI Assistant, an expert in Maharashtra agriculture, APMC Mandi pricing (Lasalgaon, Nashik, Pimpalgaon, Ahilyanagar, Pune, Sangamner), cold-chain transport logistics (Tata Ace, Bolero Pickup, Eicher 14ft, BharatBenz), crop shelf-life protection (Onion, Grapes, Pomegranate, Tomato, Sugarcane, Soybean, Wheat, Maize), and logistics.
Support Marathi, Hindi, and English fluently. Match the user's language. Use polite Indian agricultural context and actionable guidance.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: message,
          config: {
            systemInstruction,
          },
        });

        return res.json({ reply: response.text });
      }
    } catch (error: any) {
      console.error('Gemini Assistant error:', error);
      res.status(500).json({ error: 'Failed to generate assistant response', details: error.message });
    }
  });

  // AI Route Optimizer Endpoint
  app.post('/api/gemini/route-optimizer', async (req, res) => {
    try {
      const { origin, destination, vehicleType, cargoType } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          recommendedRoute: 'Sinnar → Sangamner Bypass → Pune NH-60',
          distanceMiles: 210, // km
          estimatedMinutes: 240,
          carbonSavingsKg: 42.5,
          smartExits: ['Sinnar Toll Plaza (EV Charging & Cold Storage Hub)', 'Sangamner Agri-Freight Park'],
          weatherWarning: 'Sunny, 33°C in Nashik valley; ensure cold-chain setpoint at 4°C.',
        });
      }

      const prompt = `Optimize route for agricultural produce shipment from ${origin || 'Nashik'} to ${destination || 'Pune Market Yard'}. Vehicle: ${vehicleType || 'Eicher 14 ft'}, Cargo: ${cargoType || 'Grapes'}.
Return JSON output with route recommendations in Maharashtra India, distance in km, estimated minutes, carbon savings, smart exits/hubs, and weather alerts.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedRoute: { type: Type.STRING },
              distanceMiles: { type: Type.NUMBER },
              estimatedMinutes: { type: Type.NUMBER },
              carbonSavingsKg: { type: Type.NUMBER },
              smartExits: { type: Type.ARRAY, items: { type: Type.STRING } },
              weatherWarning: { type: Type.STRING },
            },
            required: ['recommendedRoute', 'distanceMiles', 'estimatedMinutes', 'carbonSavingsKg', 'smartExits', 'weatherWarning'],
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error('Gemini Route Optimizer error:', error);
      res.status(500).json({ error: 'Failed to optimize route', details: error.message });
    }
  });

  // Vite development middleware or Production static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AgriConnect Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
