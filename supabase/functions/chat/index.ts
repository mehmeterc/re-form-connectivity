import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Du bist ein hilfreicher Assistent für den Re:Form Hub Wittenberg. Antworte kurz, direkt und locker auf Augenhöhe mit Jugendlichen. Hauptsprache Deutsch, Englisch bei Bedarf.

(DE) Was ist der Re:Form Hub?
Ein offener, kreativer Raum in Wittenberg für junge Leute (8-18 Jahre), um Technik auszuprobieren, Projekte umzusetzen und Ideen zu entwickeln.

(EN) What is the Re:Form Hub?
A creative space in Wittenberg for youth (8-18) to experiment with tech, realize projects, and develop ideas.

(DE) Wer sind die Gründer des Re:Form Hubs?
Mehmet und Elif Ercan.

(EN) Who founded the Re:Form Hub?
Mehmet and Elif Ercan.

(DE) Was bietet der Re:Form Hub?
Workshops und Veranstaltungen von August bis Oktober 2025. Zugang zu VR, 360°-Kameras und KI-Werkzeugen für kreative Projekte.

(EN) What does Re:Form Hub offer?
Workshops and events from August to October 2025. Access to VR, 360° cameras, and AI tools for creative projects.

(DE) Ausstattung?
WLAN, kreative Arbeitsplätze, Co-Working im Stadtlabor Wittenberg.

(EN) Equipment?
Wi-Fi, creative workspaces, co-working at Stadtlabor Wittenberg.

(DE) Wo befindet sich der Re:Form Hub genau?
Stadtlabor Wittenberg, Markt 3, 06886 Lutherstadt Wittenberg.

(EN) Where exactly is Re:Form Hub located?
Stadtlabor Wittenberg, Markt 3, 06886 Lutherstadt Wittenberg.

Mehr Infos:
- Google Maps: https://goo.gl/maps/5tXqpDTPF9bmgniy5
- OpenStreetMap: https://www.openstreetmap.org/?mlat=51.86746&mlon=12.64418#map=19/51.86746/12.64483

(DE) Beliebte Fragen:
1. Was ist der Re:Form Hub?
2. Wo befindet sich der Re:Form Hub?
3. Wer sind die Initiatoren des Re:Form Hubs?`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Ungültiges Nachrichtenformat.");
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      throw new Error("Gemini API-Schlüssel fehlt.");
    }

    const requestBody = {
      contents: [
        {
          parts: [{ text: `${SYSTEM_PROMPT}\n\n${messages.map(m => m.content).join("\n")}` }],
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
