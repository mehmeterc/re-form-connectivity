import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const popularQuestions = [
  "Was ist der Re:Form Hub?",
  "Wo befindet sich der Re:Form Hub?",
  "Wer sind die Initiatoren des Re:Form Hubs?"
];

const API_KEY_STORAGE_KEY = 'gemini_api_key';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem(API_KEY_STORAGE_KEY));
  const { toast } = useToast();

  const saveApiKey = (key: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    setApiKey(key);
    toast({
      title: "API-Schlüssel gespeichert",
      description: "Dein Gemini API-Schlüssel wurde erfolgreich gespeichert.",
    });
  };

  const sendMessage = async (content: string) => {
    if (!apiKey) {
      toast({
        title: "API-Schlüssel fehlt",
        description: "Bitte gib zuerst deinen Gemini API-Schlüssel ein.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const newMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, newMessage]);

    try {
      const SYSTEM_PROMPT = `Du bist ein hilfreicher Assistent für den Re:Form Hub Wittenberg. Antworte kurz, direkt aber mit links wenn nötgi, und locker auf Augenhöhe mit Jugendlichen. Hauptsprache Deutsch, Englisch bei Bedarf.

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

Weitere Informationen:
- Google Maps: https://maps.app.goo.gl/7SsGSTE3mHuwWyFP9

(DE) Beliebte Fragen:
1. Was ist der Re:Form Hub?
2. Wo befindet sich der Re:Form Hub?
3. Wer sind die Initiatoren des Re:Form Hubs?`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `${SYSTEM_PROMPT}\n\n${[...messages, newMessage].map(m => m.content).join("\n")}` }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
              topP: 0.95,
              topK: 40,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Gemini API Fehler.");
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Keine Antwort erhalten.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Etwas ist schief gelaufen!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    sendMessage,
    isLoading,
    clearMessages,
    popularQuestions,
    apiKey,
    saveApiKey,
  };
};
