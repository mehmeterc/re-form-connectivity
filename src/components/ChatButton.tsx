
import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import ChatInterface from './ChatInterface';

const ChatButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-reform-teal hover:bg-reform-teal-light shadow-lg"
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] p-0">
        <ChatInterface onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default ChatButton;
