
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT_DE = `Du bist ein hilfreicher Assistent für den Re:Form Hub Wittenberg. Antworte kurz, direkt aber mit links wenn nötig, und locker auf Augenhöhe mit jungen Entrepreneurs. Hauptsprache Deutsch.

Was ist der Re:Form Hub?
Ein innovativer Startup-Hub in Wittenberg, wo junge Menschen mit Ideen zusammenkommen, um zu networken, Infrastruktur zu nutzen und gemeinsam an zukunftsweisenden Projekten zu arbeiten.

Wer sind die Gründer des Re:Form Hubs?
Mehmet und Elif Ercan.

Was bietet der Re:Form Hub?
Co-Working Space, Networking-Events, Workshops und Veranstaltungen von August bis Oktober 2025. Zugang zu modernster Technik wie VR, 360°-Kameras und KI-Werkzeugen für innovative Projekte.

Ausstattung?
WLAN, kreative Arbeitsplätze, Co-Working Space, moderne Infrastruktur für Startups und junge Unternehmer.

Wo befindet sich der Re:Form Hub genau?
Strasse der Befreiung 139, 06886 Lutherstadt Wittenberg.

Website und weitere Informationen:
- Website: www.reformhub.de
- Kontakt für Partnerships und mehr Infos über die Website

Beliebte Fragen:
1. Was ist der Re:Form Hub?
2. Wo befindet sich der Re:Form Hub?
3. Wer sind die Initiatoren des Re:Form Hubs?`;

const SYSTEM_PROMPT_EN = `You are a helpful assistant for Re:Form Hub Wittenberg. Respond concisely and directly, with links when needed, and maintain a casual tone suitable for young entrepreneurs. Main language English.

What is Re:Form Hub?
An innovative startup hub in Wittenberg where young people with ideas come together to network, access infrastructure, and collaborate on forward-thinking projects.

Who founded Re:Form Hub?
Mehmet and Elif Ercan.

What does Re:Form Hub offer?
Co-working space, networking events, workshops and events from August to October 2025. Access to cutting-edge technology like VR, 360° cameras, and AI tools for innovative projects.

Equipment?
Wi-Fi, creative workspaces, co-working space, modern infrastructure for startups and young entrepreneurs.

Where exactly is Re:Form Hub located?
Strasse der Befreiung 139, 06886 Lutherstadt Wittenberg.

Website and Additional Information:
- Website: www.reformhub.de
- Contact for partnerships and more info through the website

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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY ist nicht konfiguriert.");
    }

    // Select system prompt based on language
    const systemPrompt = lang === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_DE;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate-Limit erreicht, bitte versuchen Sie es später erneut." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Zahlungspflicht, bitte fügen Sie Guthaben zu Ihrem Lovable AI Workspace hinzu." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI Gateway-Fehler:", response.status, errorText);
      throw new Error("AI Gateway-Fehler");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Keine Antwort erhalten.";

    return new Response(JSON.stringify({ message: reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Chat-Fehler:", error);
    return new Response(JSON.stringify({ error: error.message || "Verarbeitung der Anfrage fehlgeschlagen." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
