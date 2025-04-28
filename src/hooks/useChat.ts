import { useState } from 'react';
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

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (content: string) => {
    setIsLoading(true);
    const newMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, newMessage]);

    try {
      const userLang = navigator.language.startsWith('en') ? 'en' : 'de';

      const response = await fetch('/functions/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          lang: userLang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Chat server error.");
      }

      const data = await response.json();
      const reply = data.message || "No reply received.";
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
  };
};
