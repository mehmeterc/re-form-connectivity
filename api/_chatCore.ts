// Shared chat logic used by the Vercel serverless function and the Vite dev middleware.
// The Gemini API key is read from the server environment only and never reaches the browser.

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

export const MAX_MESSAGE_LENGTH = 500;
const MAX_CONTEXT_MESSAGES = 6;

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function getFallbackResponse(userMessage: string, lang: string): string {
  const m = (userMessage || '').toLowerCase();

  if (lang === 'de') {
    if (m.includes('was ist') || m.includes('re:form hub?') || m.includes('reform hub?')) {
      return 'Der Re:Form Hub ist ein innovativer Startup-Hub in Wittenberg, wo junge Menschen mit Ideen zusammenkommen, um zu networken, Infrastruktur zu nutzen und gemeinsam an zukunftsweisenden Projekten zu arbeiten. Mehr Infos: www.reformhub.de';
    }
    if (m.includes('wo') || m.includes('adresse') || m.includes('standort')) {
      return 'Strasse der Befreiung 139, 06886 Lutherstadt Wittenberg. Mehr Infos: www.reformhub.de';
    }
    if (m.includes('gründer') || m.includes('grunder') || m.includes('initiator')) {
      return 'Die Initiatoren sind Mehmet und Elif Ercan. Mehr Infos: www.reformhub.de';
    }
    if (m.includes('angebot') || m.includes('bietet') || m.includes('ausstattung') || m.includes('technik')) {
      return 'Co-Working Space, Networking-Events, Workshops und Veranstaltungen von August bis Oktober 2025 – plus Zugang zu VR, 360°-Kameras und KI-Werkzeugen. Mehr Infos: www.reformhub.de';
    }
    return 'Unsere Bots sind gerade ziemlich beschäftigt. Schau gern später nochmal vorbei oder finde alles Wichtige auf www.reformhub.de – wir freuen uns auf dich!';
  }

  if (m.includes('what is') || m.includes('re:form hub?') || m.includes('reform hub?')) {
    return 'Re:Form Hub is an innovative startup hub in Wittenberg where young people with ideas come together to network, access infrastructure and build forward-thinking projects. More: www.reformhub.de';
  }
  if (m.includes('where') || m.includes('address') || m.includes('location')) {
    return 'Strasse der Befreiung 139, 06886 Lutherstadt Wittenberg. More: www.reformhub.de';
  }
  if (m.includes('founder') || m.includes('initiator')) {
    return 'The initiators are Mehmet and Elif Ercan. More: www.reformhub.de';
  }
  if (m.includes('offer') || m.includes('equipment') || m.includes('tech')) {
    return 'Co-working space, networking events, workshops and events from August to October 2025 – plus access to VR, 360° cameras and AI tools. More: www.reformhub.de';
  }
  return 'Our bots are pretty busy right now. Please come back a bit later or find everything you need on www.reformhub.de – we would love to hear from you!';
}

const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?$/i,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/i,
  /^https:\/\/(www\.)?reformhub\.de$/i,
  /^https:\/\/([a-z0-9-]+\.)*lovable\.app$/i,
  /^https:\/\/([a-z0-9-]+\.)*lovableproject\.com$/i,
  /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i,
];

export function isAllowedOrigin(origin?: string | null): boolean {
  if (!origin) return true; // same-origin requests often omit the header
  return ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin));
}

export function corsHeadersFor(origin?: string | null): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin && isAllowedOrigin(origin) ? origin : 'https://www.reformhub.de',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

export async function handleChat(
  payload: unknown,
  apiKey?: string
): Promise<{ status: number; body: Record<string, unknown> }> {
  const data = (payload || {}) as { messages?: unknown; lang?: unknown };
  const lang = data.lang === 'en' ? 'en' : 'de';

  if (!Array.isArray(data.messages) || data.messages.length === 0) {
    return { status: 400, body: { error: 'Invalid message format.' } };
  }

  const messages: ChatMessage[] = (data.messages as ChatMessage[])
    .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (messages.length === 0) {
    return { status: 400, body: { error: 'Invalid message format.' } };
  }

  const lastMessage = messages[messages.length - 1].content;
  const context = messages.slice(-MAX_CONTEXT_MESSAGES);
  const systemPrompt = lang === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_DE;

  if (!apiKey) {
    return { status: 200, body: { message: getFallbackResponse(lastMessage, lang) } };
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: context.map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
        }),
      }
    );

    if (!response.ok) {
      return { status: 200, body: { message: getFallbackResponse(lastMessage, lang) } };
    }

    const json = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const reply = json.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim();

    return {
      status: 200,
      body: { message: reply || getFallbackResponse(lastMessage, lang) },
    };
  } catch {
    return { status: 200, body: { message: getFallbackResponse(lastMessage, lang) } };
  }
}
