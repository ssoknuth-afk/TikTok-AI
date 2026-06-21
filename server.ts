import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini SDK
// Fails gracefully if no key is provided, so the UI can still load
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (err) {
  console.warn("Gemini API key missing or invalid.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // ------------------------------
  // AI ANALYSIS ENGINE
  // ------------------------------
  app.post("/api/analyze", async (req, res) => {
    try {
      const { input } = req.body;
      
      if (!input) {
        return res.status(400).json({ error: "Input text is required" });
      }

      if (!ai) {
        return res.status(503).json({ error: "Gemini API key is not configured on the server." });
      }

      const systemPrompt = `
      You are an AI assistant for a social media bot. Analyze the user's request and return ONLY valid JSON:
      {
          "intent": "video_processing | analytics | ai_generate | text_analysis | subscription | help | general_question | unknown",
          "confidence": 0-100,
          "action": "trim_video | extract_text | generate_prompt | get_stats | compare_plans | explain_feature | etc",
          "platform": "tiktok | youtube | instagram | none",
          "extracted_data": "username | link | text | topic | query",
          "response": "friendly answer or instruction for the user"
      }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\nUser input: ${input}`,
        config: {
            temperature: 0.2,
            responseMimeType: "application/json"
        }
      });
      
      let analysisOutput;
      try {
        analysisOutput = JSON.parse(response.text() || "{}");
      } catch (err) {
        console.error("Failed to parse Gemini response", response.text());
        analysisOutput = {
            intent: "unknown",
            confidence: 0,
            action: "ask_clarification",
            platform: "none",
            extracted_data: "",
            response: "I didn't understand that. Please try again."
        };
      }

      res.json(analysisOutput);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred during AI analysis." });
    }
  });

  // ------------------------------
  // TIKTOK ANALYTICS ENDPOINT 
  // ------------------------------
  app.get("/api/analytics/:platform/:username", async (req, res) => {
    const { platform, username } = req.params;

    if (platform.toLowerCase() !== "tiktok") {
        return res.status(400).json({ error: "Platform not supported" });
    }

    // In a real scenario, you would initialize TikAPI here using process.env.TIKAPI_KEY
    // For this demonstration, we map it to mock-like data simulating the Python response format.
    
    const mockData = {
        username: username.replace("@", "").strip(),
        nickname: "Creator",
        followers: Math.floor(Math.random() * 5000000) + 10000,
        following: Math.floor(Math.random() * 1000) + 50,
        total_likes: Math.floor(Math.random() * 100000000) + 500000,
        videos_count: Math.floor(Math.random() * 1000) + 20,
        engagement_rate: (Math.random() * 15 + 2).toFixed(2),
        top_videos: [
            {
                desc: "Check out my new coding setup! #programming",
                views: 125400, likes: 14200, comments: 840, shares: 3200
            },
            {
                desc: "How to center a div in 2026...",
                views: 89000, likes: 9800, comments: 420, shares: 890
            }
        ],
        last_updated: new Date().toISOString()
    };

    res.json(mockData);
  });

  // ------------------------------
  // STATUS ENDPOINT
  // ------------------------------
  app.get("/api/status", (req, res) => {
    res.json({
        status: "running",
        bot_active: true,
        timestamp: new Date().toISOString()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
