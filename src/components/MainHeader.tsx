
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Settings2, User, Home } from 'lucide-react';

const MainHeader: React.FC = () => {
  return (
    <header className="border-b border-border py-4 px-6 flex justify-between items-center bg-white sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-editor-purple rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-xl">SM</span>
        </div>
        <h1 className="text-xl font-semibold text-editor-purple">Stylish Message Forge</h1>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-gray-600 hover:text-editor-purple transition-colors flex items-center gap-1">
          <Home size={18} />
          <span>Home</span>
        </Link>
        <Link to="/editor" className="text-gray-600 hover:text-editor-purple transition-colors flex items-center gap-1">
          <Mail size={18} />
          <span>Editor</span>
        </Link>
        <Link to="/" className="text-gray-600 hover:text-editor-purple transition-colors flex items-center gap-1">
          <Settings2 size={18} />
          <span>Settings</span>
        </Link>
        <Link to="/" className="text-gray-600 hover:text-editor-purple transition-colors flex items-center gap-1">
          <User size={18} />
          <span>Account</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/editor">
          <Button 
            className="gap-2 bg-editor-purple hover:bg-editor-dark-purple"
          >
            Create New Email
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default MainHeader;
