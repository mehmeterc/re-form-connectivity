import { useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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

      if (error) {
        throw new Error(error.message || 'Failed to send message');
      }

      if (!data?.message) {
        throw new Error('Invalid response from chat function');
      }

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
    setMessages([]);
  };

  const initialMessages: Message[] = [
    {
      role: 'assistant',
      content: `Beliebte Fragen:
1. Was ist der Re:Form Hub?
2. Wo befindet sich der Re:Form Hub?
3. Wer sind die Initiatoren des Re:Form Hubs?

Klicke auf eine Frage oder schreib mir direkt!`,
    },
  ];

  return {
    messages: messages.length ? messages : initialMessages,
    sendMessage,
    isLoading,
    clearMessages,
  };
};
