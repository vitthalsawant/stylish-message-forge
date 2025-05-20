
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface HeaderProps {
  onSave?: () => void;
  onSend?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSave, onSend }) => {
  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      toast({
        title: "Template Saved",
        description: "Your template has been saved successfully!",
      });
    }
  };

  const handleSend = () => {
    if (onSend) {
      onSend();
    } else {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully!",
      });
    }
  };

  return (
    <div className="border-b border-border py-4 px-6 flex justify-between items-center bg-white">
      <div className="flex items-center gap-3">
        <Link to="/" className="mr-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft size={16} /> Back
          </Button>
        </Link>
        <div className="w-8 h-8 bg-editor-purple rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-sm">SM</span>
        </div>
        <h1 className="text-lg font-medium text-editor-purple">Email Template Editor</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={handleSave}
        >
          <Save size={16} />
          Save Template
        </Button>
        <Button 
          size="sm" 
          className="gap-2 bg-editor-purple hover:bg-editor-dark-purple"
          onClick={handleSend}
        >
          <Send size={16} />
          Send Email
        </Button>
      </div>
    </div>
  );
};

export default Header;
