import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import ChatInterface from './ChatInterface';
const ChatButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] p-0">
        <ChatInterface onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>;
};
export default ChatButton;