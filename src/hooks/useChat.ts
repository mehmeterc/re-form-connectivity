
import { useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from "@/integrations/supabase/client";

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
      // Get user's browser language and simplify to 'en' or 'de'
      const userLang = navigator.language.startsWith('de') ? 'de' : 'en';

      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: [...messages, newMessage],
          lang: userLang 
        },
      });

      if (error) {
        throw new Error(error.message || 'Nachricht konnte nicht gesendet werden.');
      }

      if (!data?.message) {
        throw new Error('Ungültige Antwort vom Server.');
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
  };

  return {
    messages,
    sendMessage,
    isLoading,
    clearMessages,
    popularQuestions,
  };
};
