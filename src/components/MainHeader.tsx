
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const MainHeader: React.FC = () => {
  return (
    <header className="border-b border-border py-4 px-6 flex justify-between items-center bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-editor-purple rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-xl">SM</span>
        </div>
        <h1 className="text-xl font-semibold text-editor-purple">Stylish Message Forge</h1>
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
