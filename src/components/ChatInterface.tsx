
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, X, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useChat } from '@/hooks/useChat';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const { t } = useLanguage();
  const { messages, sendMessage, isLoading, clearMessages } = useChat();
  const [input, setInput] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      try {
        setError(null);
        await sendMessage(input);
        setInput('');
      } catch (err) {
        setError(err.message || 'Failed to send message');
      }
    }
  };

  const handleReset = () => {
    clearMessages();
    setError(null);
  };

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-lg">Re:Form Hub AI Assistant</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleReset}
            title="Reset conversation"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4" ref={scrollRef}>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground p-4">
              Ask me anything about Re:Form Hub, education reform, or community development...
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-reform-teal text-white ml-4'
                    : 'bg-muted mr-4'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 bg-muted mr-4">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce delay-75"></div>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat.placeholder') || "Ask me anything about Re:Form Hub..."}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-reform-teal hover:bg-reform-teal-light"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
