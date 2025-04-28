
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, X, RefreshCw, Key } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useChat, popularQuestions } from '@/hooks/useChat';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const { t } = useLanguage();
  const { messages, sendMessage, isLoading, clearMessages, apiKey, saveApiKey } = useChat();
  const [input, setInput] = React.useState('');
  const [apiKeyInput, setApiKeyInput] = React.useState('');
  const [showApiKeyDialog, setShowApiKeyDialog] = React.useState(!apiKey);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      try {
        setError(null);
        await sendMessage(input);
        setInput('');
      } catch (err: any) {
        setError(err.message || 'Nachricht konnte nicht gesendet werden.');
      }
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      saveApiKey(apiKeyInput.trim());
      setShowApiKeyDialog(false);
      setApiKeyInput('');
    }
  };

  const handleReset = () => {
    clearMessages();
    setError(null);
  };

  const handlePopularQuestionClick = async (question: string) => {
    await sendMessage(question);
    setInput('');
  };

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessageWithLinks = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    return content.split(urlRegex).map((part, idx) =>
      urlRegex.test(part) ? (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-lg">Re:Form Hub AI Assistant</h3>
        <div className="flex gap-2">
          <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Key className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gemini API-Schlüssel eingeben</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleApiKeySubmit} className="space-y-4">
                <Input
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Dein Gemini API-Schlüssel"
                  type="password"
                />
                <Button type="submit" disabled={!apiKeyInput.trim()}>
                  Speichern
                </Button>
              </form>
              <p className="text-sm text-muted-foreground mt-4">
                Der API-Schlüssel wird sicher in deinem Browser gespeichert.
              </p>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="icon" onClick={handleReset}>
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
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!apiKey && (
            <Alert>
              <AlertTitle>API-Schlüssel erforderlich</AlertTitle>
              <AlertDescription>
                Bitte gib deinen Gemini API-Schlüssel ein, um den Chat zu nutzen.
                Klicke auf das Schlüssel-Symbol oben rechts.
              </AlertDescription>
            </Alert>
          )}

          <div className="text-center text-muted-foreground p-4">
            <p className="font-semibold mb-2">Beliebte Fragen:</p>
            {popularQuestions.map((question, idx) => (
              <Button
                key={idx}
                variant="link"
                className="block mx-auto"
                onClick={() => handlePopularQuestionClick(question)}
              >
                {question}
              </Button>
            ))}
            <p className="mt-4">Klicke auf eine Frage oder schreib mir direkt!</p>
          </div>

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap break-words ${
                  msg.role === 'user'
                    ? 'bg-reform-teal text-white ml-4'
                    : 'bg-muted mr-4'
                }`}
              >
                {renderMessageWithLinks(msg.content)}
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
            placeholder={t('chat.placeholder') || 'Frag mich etwas über Re:Form Hub...'}
            disabled={isLoading || !apiKey}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim() || !apiKey}
            variant="teal"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
