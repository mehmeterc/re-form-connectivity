import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      toast.success(t('chat.messageSent'), {
        description: t('chat.responseTime'),
      });
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 glassmorphism rounded-xl overflow-hidden shadow-lg animate-slide-up">
          <div className="bg-reform-teal dark:bg-reform-teal-dark p-4 text-white flex justify-between items-center">
            <h3 className="font-medium">{t('chat.title')}</h3>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto bg-background/95">
            <div className="bg-secondary/50 p-3 rounded-lg mb-4 max-w-[80%]">
              <p className="text-sm">{t('chat.greeting')}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 flex gap-2 border-t border-border">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('chat.placeholder')}
              className="flex-grow"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="bg-reform-teal hover:bg-reform-teal-light dark:bg-reform-teal dark:hover:bg-reform-teal-light text-white"
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </form>
        </div>
      )}
      
      <Button
        onClick={toggleChat}
        size="icon"
        className={`h-14 w-14 rounded-full shadow-lg cyber-glow bg-reform-teal hover:bg-reform-teal-light dark:bg-reform-teal dark:hover:bg-reform-teal-light text-white`}
        aria-label={isOpen ? t('chat.close') : t('chat.open')}
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default ChatButton;
