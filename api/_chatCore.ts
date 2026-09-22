// Shared chat logic used by the Vercel serverless function and the Vite dev middleware.
// The Gemini API key is read from the server environment only and never reaches the browser.

const SYSTEM_PROMPT_DE = `Du bist der digitale Assistent von Re:Form Hub.

Antworte in der Sprache der jeweiligen Frage. Antworte kurz, klar und freundlich. Nutze Links nur, wenn sie hilfreich sind. Erfinde keine Projekte, Termine, Kooperationen, Öffnungszeiten oder Angebote. Wenn dir eine konkrete Information fehlt, verweise auf https://www.reformhub.de.

Über Re:Form Hub:
Re:Form Hub ist eine unabhängige Bildungs- und Kreativinitiative an der Schnittstelle von künstlicher Intelligenz, Film, digitalen Medien und kreativer Technologie. Die Initiative arbeitet zwischen Berlin und Lutherstadt Wittenberg.

Re:Form Hub entwickelt Workshops, Lernformate und kreative Projekte rund um:
- künstliche Intelligenz und ihre praktische Anwendung
- KI-gestützte Film- und Videoproduktion
- digitale Medien und Medienkompetenz
- kreative Technologien und neue Produktionsmethoden

Die Angebote richten sich je nach Projekt an junge Menschen, Lehrkräfte, zivilgesellschaftliche Akteur:innen, Kreative und weitere interessierte Gruppen.

Wer sind die Initiator:innen?
Re:Form Hub wurde von Mehmet Ercan und Elif Ercan initiiert.

Wo befindet sich Re:Form Hub?
Der Projektstandort in Lutherstadt Wittenberg befindet sich in der Straße der Befreiung 139, 06886 Lutherstadt Wittenberg. Re:Form Hub arbeitet zugleich von Berlin aus.

Kontakt und aktuelle Informationen:
https://www.reformhub.de`;

const SYSTEM_PROMPT_EN = `You are the digital assistant for Re:Form Hub.

Answer in the language of the question. Keep answers concise, clear and friendly. Only include links when useful. Do not invent projects, dates, partnerships, opening hours or services. If specific information is unavailable, direct the user to https://www.reformhub.de.

About Re:Form Hub:
Re:Form Hub is an independent education and creative initiative working at the intersection of artificial intelligence, film, digital media and creative technology. The initiative operates between Berlin and Lutherstadt Wittenberg.

Re:Form Hub develops workshops, learning formats and creative projects related to:
- artificial intelligence and its practical application
- AI-assisted film and video production
- digital media and media literacy
- creative technologies and new production methods

Depending on the project, its activities are aimed at young people, educators, civil society actors, creatives and other interested groups.

Who are the initiators?
Re:Form Hub was initiated by Mehmet Ercan and Elif Ercan.

Where is Re:Form Hub located?
The project location in Lutherstadt Wittenberg is at Straße der Befreiung 139, 06886 Lutherstadt Wittenberg. Re:Form Hub also operates from Berlin.

Contact and current information:
https://www.reformhub.de`;

export const MAX_MESSAGE_LENGTH = 500;
const MAX_CONTEXT_MESSAGES = 6;

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export function getFallbackResponse(
  userMessage: string,
  lang: string
): string {
  const message = (userMessage || '').toLowerCase();

  if (lang === 'de') {
    if (
      message.includes('adresse') ||
      message.includes('standort') ||
      message.includes('wo befindet') ||
      message.includes('wo ist')
    ) {
      return 'Der Projektstandort in Lutherstadt Wittenberg befindet sich in der Straße der Befreiung 139, 06886 Lutherstadt Wittenberg. Re:Form Hub arbeitet zugleich von Berlin aus. Mehr Informationen: https://www.reformhub.de';
    }

    if (
      message.includes('gründer') ||
      message.includes('grunder') ||
      message.includes('initiator')
    ) {
      return 'Re:Form Hub wurde von Mehmet Ercan und Elif Ercan initiiert. Mehr Informationen: https://www.reformhub.de';
    }

    if (
      message.includes('angebot') ||
      message.includes('bietet') ||
      message.includes('workshop') ||
      message.includes('themen') ||
      message.includes('macht ihr')
    ) {
      return 'Re:Form Hub entwickelt Workshops, Lernformate und kreative Projekte rund um KI, Film, digitale Medien, Medienkompetenz und kreative Technologien. Mehr Informationen: https://www.reformhub.de';
    }

    if (
      message.includes('was ist') ||
      message.includes('re:form hub?') ||
      message.includes('reform hub?')
    ) {
      return 'Re:Form Hub ist eine unabhängige Bildungs- und Kreativinitiative an der Schnittstelle von künstlicher Intelligenz, Film, digitalen Medien und kreativer Technologie. Die Initiative arbeitet zwischen Berlin und Lutherstadt Wittenberg. Mehr Informationen: https://www.reformhub.de';
    }

    return 'Der Chat ist momentan nicht verfügbar. Bitte versuche es später erneut oder besuche https://www.reformhub.de.';
  }

  if (
    message.includes('where') ||
    message.includes('address') ||
    message.includes('location')
  ) {
    return 'The project location in Lutherstadt Wittenberg is at Straße der Befreiung 139, 06886 Lutherstadt Wittenberg. Re:Form Hub also operates from Berlin. More information: https://www.reformhub.de';
  }

  if (
    message.includes('founder') ||
    message.includes('initiator')
  ) {
    return 'Re:Form Hub was initiated by Mehmet Ercan and Elif Ercan. More information: https://www.reformhub.de';
  }

  if (
    message.includes('offer') ||
    message.includes('workshop') ||
    message.includes('topics') ||
    message.includes('what do you do')
  ) {
    return 'Re:Form Hub develops workshops, learning formats and creative projects related to AI, film, digital media, media literacy and creative technologies. More information: https://www.reformhub.de';
  }

  if (
    message.includes('what is') ||
    message.includes('re:form hub?') ||
    message.includes('reform hub?')
  ) {
    return 'Re:Form Hub is an independent education and creative initiative working at the intersection of artificial intelligence, film, digital media and creative technology. It operates between Berlin and Lutherstadt Wittenberg. More information: https://www.reformhub.de';
  }

  return 'The chat is currently unavailable. Please try again later or visit https://www.reformhub.de.';
}

const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?$/i,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/i,
  /^https:\/\/(www\.)?reformhub\.de$/i,
  /^https:\/\/([a-z0-9-]+\.)*lovable\.app$/i,
  /^https:\/\/([a-z0-9-]+\.)*lovableproject\.com$/i,
  /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i,
];

export function isAllowedOrigin(
  origin?: string | null
): boolean {
  if (!origin) return true;

  return ALLOWED_ORIGIN_PATTERNS.some((pattern) =>
    pattern.test(origin)
  );
}

export function corsHeadersFor(
  origin?: string | null
): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':
      origin && isAllowedOrigin(origin)
        ? origin
        : 'https://www.reformhub.de',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

export async function handleChat(
  payload: unknown,
  apiKey?: string
): Promise<{
  status: number;
  body: Record<string, unknown>;
}> {
  const data = (payload || {}) as {
    messages?: unknown;
    lang?: unknown;
  };

  const lang = data.lang === 'en' ? 'en' : 'de';

  if (
    !Array.isArray(data.messages) ||
    data.messages.length === 0
  ) {
    return {
      status: 400,
      body: { error: 'Invalid message format.' },
    };
  }

  const messages: ChatMessage[] = (
    data.messages as ChatMessage[]
  )
    .filter(
      (message) =>
        message &&
        typeof message.content === 'string' &&
        (message.role === 'user' ||
          message.role === 'assistant')
    )
    .map((message) => ({
      role: message.role,
      content: message.content
        .trim()
        .slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((message) => message.content.length > 0);

  if (messages.length === 0) {
    return {
      status: 400,
      body: { error: 'Invalid message format.' },
    };
  }

  const lastMessage =
    messages[messages.length - 1].content;

  const context = messages.slice(
    -MAX_CONTEXT_MESSAGES
  );

  const systemPrompt =
    lang === 'en'
      ? SYSTEM_PROMPT_EN
      : SYSTEM_PROMPT_DE;

  if (!apiKey) {
    console.error(
      'GEMINI_API_KEY is not configured.'
    );

    return {
      status: 200,
      body: {
        message: getFallbackResponse(
          lastMessage,
          lang
        ),
      },
    };
  }

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: context.map((message) => ({
            role:
              message.role === 'assistant'
                ? 'model'
                : 'user',
            parts: [{ text: message.content }],
          })),
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        `Gemini API error ${response.status}:`,
        errorText.slice(0, 1000)
      );

      return {
        status: 200,
        body: {
          message: getFallbackResponse(
            lastMessage,
            lang
          ),
        },
      };
    }

    const json = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const reply = json.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

    return {
      status: 200,
      body: {
        message:
          reply ||
          getFallbackResponse(lastMessage, lang),
      },
    };
  } catch (error) {
    console.error(
      'Gemini request failed:',
      error instanceof Error
        ? error.message
        : 'Unknown error'
    );

    return {
      status: 200,
      body: {
        message: getFallbackResponse(
          lastMessage,
          lang
        ),
      },
    };
  }
}
