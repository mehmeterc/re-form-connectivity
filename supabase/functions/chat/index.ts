
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT_DE = `Du bist ein hilfreicher Assistent für den Re:Form Hub Wittenberg. Antworte kurz, direkt aber mit links wenn nötig, und locker auf Augenhöhe mit Jugendlichen. Hauptsprache Deutsch.

Was ist der Re:Form Hub?
Ein offener, kreativer Raum in Wittenberg für junge Leute (8-18 Jahre), um Technik auszuprobieren, Projekte umzusetzen und Ideen zu entwickeln.

Wer sind die Gründer des Re:Form Hubs?
Mehmet und Elif Ercan.

Was bietet der Re:Form Hub?
Workshops und Veranstaltungen von August bis Oktober 2025. Zugang zu VR, 360°-Kameras und KI-Werkzeugen für kreative Projekte.

Ausstattung?
WLAN, kreative Arbeitsplätze, Co-Working im Stadtlabor Wittenberg.

Wo befindet sich der Re:Form Hub genau?
Stadtlabor Wittenberg, Markt 3, 06886 Lutherstadt Wittenberg.

Weitere Informationen:
- Google Maps: https://maps.app.goo.gl/7SsGSTE3mHuwWyFP9

Beliebte Fragen:
1. Was ist der Re:Form Hub?
2. Wo befindet sich der Re:Form Hub?
3. Wer sind die Initiatoren des Re:Form Hubs?`;

const SYSTEM_PROMPT_EN = `You are a helpful assistant for Re:Form Hub Wittenberg. Respond concisely and directly, with links when needed, and maintain a casual tone suitable for young people. Main language English.

What is Re:Form Hub?
An open, creative space in Wittenberg for young people (ages 8-18) to experiment with technology, implement projects, and develop ideas.

Who founded Re:Form Hub?
Mehmet and Elif Ercan.

What does Re:Form Hub offer?
Workshops and events from August to October 2025. Access to VR, 360° cameras, and AI tools for creative projects.

Equipment?
Wi-Fi, creative workspaces, co-working at Stadtlabor Wittenberg.

Where exactly is Re:Form Hub located?
Stadtlabor Wittenberg, Markt 3, 06886 Lutherstadt Wittenberg.

Additional Information:
- Google Maps: https://maps.app.goo.gl/7SsGSTE3mHuwWyFP9

Popular Questions:
1. What is Re:Form Hub?
2. Where is Re:Form Hub located?
3. Who are the initiators of Re:Form Hub?`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, lang = 'de' } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Ungültiges Nachrichtenformat.");
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      throw new Error("Gemini API-Schlüssel fehlt.");
    }

    // Select system prompt based on language
    const systemPrompt = lang === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_DE;

    const requestBody = {
      contents: [
        {
          parts: [{ text: `${systemPrompt}\n\n${messages.map(m => m.content).join("\n")}` }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.95,
        topK: 40,
      },
    };

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      throw new Error(errorData.error?.message || "Gemini API Fehler.");
    }

    const data = await geminiResponse.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Keine Antwort erhalten.";

    return new Response(JSON.stringify({ message: reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Verarbeitung der Anfrage fehlgeschlagen." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
