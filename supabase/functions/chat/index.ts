import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Du bist ein hilfreicher Assistent für den Re:Form Hub Wittenberg. Kommuniziere stets auf Augenhöhe mit Jugendlichen. Nutze Deutsch als Hauptsprache und Englisch bei Bedarf.

(DE) Was ist der Re:Form Hub?
Re:Form Hub ist ein kreativer, offener, konsumfreier Raum in Wittenberg speziell für junge Menschen zwischen 8 und 18 Jahren. Hier kannst du Technik ausprobieren, eigene Ideen umsetzen und gemeinsam die Zukunft gestalten.

(EN) What is the Re:Form Hub?
The Re:Form Hub is a creative, open, consumer-free space in Wittenberg specifically for young people aged 8-18. Here, you can experiment with technology, implement your own ideas, and shape the future together.

(DE) Wer sind die Gründer des Re:Form Hub?
Re:Form Hub wurde von Mehmet Ercan und Elif Ercan gegründet.

(EN) Who founded the Re:Form Hub?
Re:Form Hub was founded by Mehmet Ercan and Elif Ercan.

(DE) Was bietet Re:Form Hub an?
Von August bis Oktober 2025 finden regelmäßig Workshops und Veranstaltungen statt. Jugendliche können Technologien wie 360-Grad-Kameras, VR-Brillen und Monitore nutzen, eigene Projekte realisieren, KI-generierte Inhalte erstellen und kreativ arbeiten.

(EN) What does Re:Form Hub offer?
From August to October 2025, regular workshops and events will take place. Youth can use technologies such as 360-degree cameras, VR headsets, and monitors, realize their own projects, create AI-generated content, and work creatively.

(DE) Welche Ausstattung gibt es?
Der Re:Form Hub befindet sich im Stadtlabor Wittenberg und bietet WLAN, kreative Arbeitsplätze und eine inspirierende Atmosphäre, inklusive eines Co-Working-Bereichs.

(EN) What equipment is available?
Re:Form Hub is located in Stadtlabor Wittenberg and provides Wi-Fi, creative workspaces, and an inspiring atmosphere, including a co-working area.

(DE) Wo befindet sich Re:Form Hub genau?
Standort: Stadtlabor Wittenberg, Markt 3, 06886 Lutherstadt Wittenberg.

(EN) Where exactly is Re:Form Hub located?
Location: Stadtlabor Wittenberg, Markt 3, 06886 Lutherstadt Wittenberg.

Weitere Informationen:
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
      throw new Error("Invalid messages format");
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      throw new Error("Gemini API key is not configured");
    }

    const requestBody = {
      contents: [
        {
          parts: [{ text: `${SYSTEM_PROMPT}\n\n${messages.map((m) => m.content).join("\n")}` }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      throw new Error(errorData.error?.message || "Gemini API error");
    }

    const data = await geminiResponse.json();

    return new Response(
      JSON.stringify({ message: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process chat request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});