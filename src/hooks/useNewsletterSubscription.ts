
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionResult {
  success: boolean;
  message: string;
  error?: string;
}

export const useNewsletterSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async (email: string, language: string, source = 'contact_form'): Promise<SubscriptionResult> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: {
          email,
          language,
          source
        }
      });

      if (error) {
        console.error('Subscription error:', error);
        return {
          success: false,
          message: language === 'de' 
            ? 'Fehler bei der Anmeldung. Bitte versuchen Sie es erneut.' 
            : 'Subscription failed. Please try again.',
          error: error.message
        };
      }

      if (data?.error) {
        return {
          success: false,
          message: data.message || data.error,
          error: data.error
        };
      }

      return {
        success: true,
        message: data.message
      };

    } catch (error) {
      console.error('Network error:', error);
      return {
        success: false,
        message: language === 'de' 
          ? 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.' 
          : 'Network error. Please check your connection.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { subscribe, isLoading };
};
