
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
      // Add user message to chat
      const newMessage: Message = { role: 'user', content };
      setMessages(prev => [...prev, newMessage]);

      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: [...messages, newMessage] }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to send message');
      }

      if (!data?.message) {
        throw new Error('Invalid response from chat function');
      }
      
      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
};
