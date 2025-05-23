
import React from 'react';
import { Link } from 'react-router-dom';

const MainFooter: React.FC = () => {
  return (
    <footer className="border-t border-border py-6 px-6 mt-auto bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-editor-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">SM</span>
            </div>
            <span className="text-sm text-muted-foreground">© 2025 Stylish Message Forge. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-editor-purple transition-colors">Home</Link>
            <Link to="/editor" className="text-sm text-muted-foreground hover:text-editor-purple transition-colors">Editor</Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-editor-purple transition-colors">Features</Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-editor-purple transition-colors">Templates</Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-editor-purple transition-colors">Help</Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-editor-purple transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
