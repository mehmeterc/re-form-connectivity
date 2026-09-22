import { useEffect, useState } from 'react';
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

const STORAGE_KEY = 'reformhub-chat';
const MAX_MESSAGE_LENGTH = 500;

const loadMessages = (): Message[] => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  } catch {
    return [];
  }
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage failures (private mode)
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!trimmed) return;

    setIsLoading(true);
    const newMessage: Message = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, newMessage]);

    try {
      const userLang = navigator.language.startsWith('de') ? 'de' : 'en';

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, newMessage].slice(-6),
          lang: userLang,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.message) {
        throw new Error(data?.error || 'Nachricht konnte nicht gesendet werden.');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
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
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
    clearMessages,
    popularQuestions,
  };
};
