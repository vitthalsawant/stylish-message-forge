
import React from 'react';
import { 
  Type, 
  AlignLeft, 
  List as ListIcon, 
  Image as ImageIcon, 
  Square, 
  Table2, 
  SeparatorHorizontal, 
  Minus,
  Share2,
  Code,
  Film,
  Menu as MenuIcon,
  Sticker,
  FileImage
} from 'lucide-react';

interface ContentBlockProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, icon, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="mb-2 text-gray-600">
        {icon}
      </div>
      <span className="text-xs text-center font-medium">{title}</span>
    </div>
  );
};

interface ContentBlocksProps {
  onInsertContent: (blockType: string) => void;
}

const ContentBlocks: React.FC<ContentBlocksProps> = ({ onInsertContent }) => {
  const blocks = [
    { title: 'TITLE', icon: <Type size={24} />, type: 'title' },
    { title: 'PARAGRAPH', icon: <AlignLeft size={24} />, type: 'paragraph' },
    { title: 'LIST', icon: <ListIcon size={24} />, type: 'list' },
    { title: 'IMAGE', icon: <ImageIcon size={24} />, type: 'image' },
    { title: 'BUTTON', icon: <Square size={24} />, type: 'button' },
    { title: 'TABLE', icon: <Table2 size={24} />, type: 'table' },
    { title: 'DIVIDER', icon: <SeparatorHorizontal size={24} />, type: 'divider' },
    { title: 'SPACER', icon: <Minus size={24} />, type: 'spacer' },
    { title: 'SOCIAL', icon: <Share2 size={24} />, type: 'social' },
    { title: 'HTML', icon: <Code size={24} />, type: 'html' },
    { title: 'VIDEO', icon: <Film size={24} />, type: 'video' },
    { title: 'ICONS', icon: <Square size={24} />, type: 'icons' },
    { title: 'MENU', icon: <MenuIcon size={24} />, type: 'menu' },
    { title: 'STICKER', icon: <Sticker size={24} />, type: 'sticker' },
    { title: 'GIF', icon: <FileImage size={24} />, type: 'gif' }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {blocks.map((block, index) => (
        <ContentBlock 
          key={index}
          title={block.title}
          icon={block.icon}
          onClick={() => onInsertContent(block.type)}
        />
      ))}
    </div>
  );
};

export default ContentBlocks;
