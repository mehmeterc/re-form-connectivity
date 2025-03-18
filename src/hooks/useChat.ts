import { useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const popularQuestions = [
  "Was ist der Re:Form Hub?",
  "Wo befindet sich der Re:Form Hub?",
  "Wer sind die Initiatoren des Re:Form Hubs?"
];

export const useChat = () => {
  const initialMessages: Message[] = [
    {
      role: 'assistant',
      content: `Beliebte Fragen:\n${popularQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\nKlicke auf eine Frage oder schreib mir direkt!`,
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      const newMessage: Message = { role: 'user', content };
      setMessages(prev => [...prev, newMessage]);

      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: [...messages, newMessage] }
      });

      if (error) throw new Error(error.message || 'Failed to send message');
      if (!data?.message) throw new Error('Invalid response from chat function');

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages(initialMessages);
  };

  return {
    messages,
    sendMessage,
    isLoading,
    clearMessages,
    popularQuestions,
  };
};
