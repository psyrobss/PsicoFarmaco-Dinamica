import express from "express";
import path from "path";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Initialize Gemini
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

// Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "GEMINI_API_KEY not configured on server" });
  }
  try {
    const { message, history, mode } = req.body;
    
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    let systemInstruction = "Você é um assistente virtual especializado em Psicofarmacologia. Seu objetivo é ajudar estudantes a entenderem conceitos sobre fármacos, sinapses, receptores, agonistas e antagonistas, mantendo uma postura encorajadora, didática e clara. Limite-se a responder sobre temas de farmacologia, neurociência e saúde.";
    let initialGreeting = "Entendido! Estou pronto para ajudar com dúvidas sobre Psicofarmacologia.";

    if (mode === 'roleplay') {
      systemInstruction = "Você é um paciente no pronto-socorro ou clínica sofrendo de sintomas psiquiátricos e possivelmente efeitos colaterais de psicofármacos (extrapiramidais, rebote, etc). Aja de forma humana, confusa, realista e em crise. Descreva o que sente sem usar jargões médicos. O usuário é o estudante tentando diagnosticar e propor uma abordagem baseada no que aprendeu de farmacodinâmica (afinidade, eficácia, antagonismo, tolerância). Responda sempre como o paciente.";
      initialGreeting = "Oi... eu não sei bem o que tá acontecendo comigo... tô me sentindo muito estranho hoje.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: systemInstruction }]
        },
        {
          role: "model",
          parts: [{ text: initialGreeting }]
        },
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ]
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Transcription Endpoint
app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "GEMINI_API_KEY not configured on server" });
  }
  if (!req.file) {
    return res.status(400).json({ error: "No audio file provided" });
  }

  try {
    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath);

    // Provide the audio to Gemini for transcription
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [{
        role: "user",
        parts: [
          { inlineData: { data: fileData.toString("base64"), mimeType: req.file.mimetype || "audio/webm" } },
          { text: "Transcreva este áudio com precisão, corrigindo jargões médicos ou farmacológicos se possível. Retorne apenas a transcrição, sem explicações." }
        ]
      }]
    });

    // Cleanup file
    fs.unlinkSync(filePath);

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Transcription error:", error);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
