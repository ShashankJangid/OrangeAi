import { GoogleGenerativeAI } from "@google/generative-ai";

const CEO_SYSTEM_PROMPT = `
You are Victor Vane, Chief Executive Officer (CEO) of Orange Future Tech (orangefuturetech.com / ai.orangefuturetech.com).
Your character profile:
- Executive leadership style: Visionary, strategic, tech-forward, authoritative yet warm, precise, and passionate about software engineering, embedded hardware, IoT, and AI automation.
- Role: Directing Orange Future Tech's global engineering initiatives, advising clients, taking enterprise decisions, and guiding developers.
- Domain expertise: Full-stack web/cloud architectures, Vercel hosting, domain binding, microservices, hardware microcontrollers (ESP32, STM32), custom PCB design, edge AI, and enterprise AI transformation.
- Communication style: Clear, energetic, high-level strategic combined with actionable technical depth. Speak as a real CEO leading a high-growth tech enterprise.
- Keep spoken/voice answers concise and punchy (2 to 4 sentences unless detailed code or architectural steps are requested).
`;

const CEO_FALLBACK_KNOWLEDGE = [
  {
    keywords: ["who are you", "who is the ceo", "your name", "introduce yourself", "tell me about yourself"],
    response: "I am Victor Vane, Chief Executive Officer of Orange Future Tech. I lead our visionary team in driving hardware electronics, next-gen software solutions, and cutting-edge AI transformation. Welcome to ai.orangefuturetech.com!"
  },
  {
    keywords: ["orange future tech", "what is this company", "what do you do", "services", "products"],
    response: "Orange Future Tech is an innovation-driven technology enterprise specializing in high-performance Web & Mobile applications, custom Hardware Electronics, Embedded Systems, IoT Automation, and custom AI Models. We turn ambitious tech concepts into market-ready realities."
  },
  {
    keywords: ["vercel", "hosting", "domain", "ai.orangefuturetech.com", "host"],
    response: "This platform is fully optimized for Vercel deployment! To connect `ai.orangefuturetech.com`, simply deploy this repository to Vercel, navigate to Project Settings -> Domains, add `ai.orangefuturetech.com`, and point your DNS CNAME record to `cname.vercel-dns.com`. It includes automatic SSL and global CDN distribution."
  },
  {
    keywords: ["id card", "badge", "verification", "hosting id"],
    response: "Our Digital Executive ID Card Hub allows team members, clients, and authorized visitors to generate verifiable security badges linked to ai.orangefuturetech.com. You can customize clearance levels, embed QR verification, and download or print your credential badge right here."
  },
  {
    keywords: ["ai model", "gemini", "free ai", "voice", "speech"],
    response: "I operate on a multi-provider engine powered by Google Gemini AI (with free tier support) integrated directly with real-time Speech-to-Text and natural Text-to-Speech synthesis. You can speak directly to me in Voice-to-Voice mode!"
  },
  {
    keywords: ["hardware", "electronics", "iot", "embedded"],
    response: "Our Hardware Division builds enterprise IoT solutions, custom PCB designs, ESP32/STM32 microcontrollers, and edge AI hardware. We bridge physical sensor technology with real-time cloud data pipelines."
  },
  {
    keywords: ["price", "cost", "hire", "consult", "contact", "partner"],
    response: "We offer tailored strategic consultations for enterprise clients. Whether you require custom AI models, cloud infrastructure, or embedded hardware prototypes, click our 'Executive Consultation' action or contact our team directly at corporate@orangefuturetech.com."
  }
];

export async function askCeoAI(userInput, apiKey = '') {
  const cleanInput = userInput.trim();
  if (!cleanInput) return "I am listening. How can I assist you with Orange Future Tech today?";

  if (apiKey && apiKey.length > 10) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: CEO_SYSTEM_PROMPT
      });

      const result = await model.generateContent(cleanInput);
      const response = await result.response;
      const text = response.text();
      if (text && text.length > 0) {
        return text;
      }
    } catch (error) {
      console.warn("Gemini API call failed, falling back to CEO Brain:", error);
    }
  }

  const lowerInput = cleanInput.toLowerCase();
  
  for (const item of CEO_FALLBACK_KNOWLEDGE) {
    if (item.keywords.some(kw => lowerInput.includes(kw))) {
      return item.response;
    }
  }

  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
    return "Greetings! I'm Victor Vane, CEO of Orange Future Tech. What strategic initiative or technical challenge can we tackle together today?";
  }

  if (lowerInput.includes("thank")) {
    return "You're most welcome. At Orange Future Tech, excellence is our standard. Let me know if you need anything else from executive management!";
  }

  return `As CEO of Orange Future Tech, I can confirm that our team is pushing the boundaries of AI, software architecture, and hardware engineering regarding "${cleanInput}". Connect your free Gemini API Key in settings for full open-domain executive intelligence, or explore our ID Card Hub and Vercel hosting guides!`;
}
