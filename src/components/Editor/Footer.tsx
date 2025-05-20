
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bold, Italic, Underline } from 'lucide-react';

interface FooterProps {
  content: string;
  onChange: (content: string) => void;
}

const Footer: React.FC<FooterProps> = ({ content, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(content);

  const handleBold = () => {
    document.execCommand('bold', false);
  };

  const handleItalic = () => {
    document.execCommand('italic', false);
  };

  const handleUnderline = () => {
    document.execCommand('underline', false);
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setEditableContent(e.currentTarget.innerHTML);
  };

  const saveChanges = () => {
    onChange(editableContent);
    setIsEditing(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Email Footer</CardTitle>
        {isEditing ? (
          <div className="space-x-2">
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={saveChanges}>
              Save
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            Edit Footer
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div>
            <div className="flex items-center space-x-1 mb-2">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleBold}>
                <Bold size={16} />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleItalic}>
                <Italic size={16} />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleUnderline}>
                <Underline size={16} />
              </Button>
            </div>
            <div
              contentEditable
              className="min-h-[60px] border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              dangerouslySetInnerHTML={{ __html: editableContent }}
              onInput={handleContentChange}
              onBlur={handleContentChange}
            />
          </div>
        ) : (
          <div 
            className="text-sm text-muted-foreground py-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default Footer;
