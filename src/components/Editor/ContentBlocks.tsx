
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
  onDragStart?: (e: React.DragEvent) => void;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, icon, onClick, onDragStart }) => {
  return (
    <div 
      className="content-block flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
      draggable="true"
      onDragStart={onDragStart}
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
    { 
      title: 'TITLE', 
      icon: <Type size={24} />, 
      type: 'title',
      html: '<div class="draggable-row" style="margin-bottom: 20px;"><h2 contenteditable="true" style="font-size: 24px; font-weight: bold; margin: 0; padding: 10px; border: 1px dashed #d1d5db; background-color: #f9fafb;">Your Title Here</h2></div>'
    },
    { 
      title: 'PARAGRAPH', 
      icon: <AlignLeft size={24} />, 
      type: 'paragraph',
      html: '<div class="draggable-row" style="margin-bottom: 20px;"><div contenteditable="true" style="padding: 15px; border: 1px dashed #d1d5db; background-color: #f9fafb; min-height: 60px;"><p style="margin: 0;">Click here to add your paragraph text. You can add multiple paragraphs by pressing Enter.</p></div></div>'
    },
    { 
      title: 'LIST', 
      icon: <ListIcon size={24} />, 
      type: 'list',
      html: '<div class="draggable-row" style="margin-bottom: 20px;"><ul contenteditable="true" style="padding: 15px; border: 1px dashed #d1d5db; background-color: #f9fafb;"><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul></div>'
    },
    { 
      title: 'IMAGE', 
      icon: <ImageIcon size={24} />, 
      type: 'image',
      html: ''
    },
    { 
      title: 'BUTTON', 
      icon: <Square size={24} />, 
      type: 'button',
      html: '<div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 15px; border: 1px dashed #d1d5db; background-color: #f9fafb;"><a href="#" contenteditable="true" style="background-color: #8b5cf6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Click Me</a></div>'
    },
    { 
      title: 'TABLE', 
      icon: <Table2 size={24} />, 
      type: 'table',
      html: '<div class="draggable-row" style="margin-bottom: 20px;"><table contenteditable="true" style="width: 100%; border-collapse: collapse; border: 1px dashed #d1d5db;"><tr><td style="border: 1px solid #d1d5db; padding: 8px;">Cell 1</td><td style="border: 1px solid #d1d5db; padding: 8px;">Cell 2</td></tr><tr><td style="border: 1px solid #d1d5db; padding: 8px;">Cell 3</td><td style="border: 1px solid #d1d5db; padding: 8px;">Cell 4</td></tr></table></div>'
    },
    { 
      title: 'DIVIDER', 
      icon: <SeparatorHorizontal size={24} />, 
      type: 'divider',
      html: '<div class="draggable-row" style="margin-bottom: 20px;"><hr style="border: 0; height: 1px; background-color: #e5e7eb; margin: 20px 0;" /></div>'
    },
    { 
      title: 'SPACER', 
      icon: <Minus size={24} />, 
      type: 'spacer',
      html: '<div class="draggable-row" style="height: 30px; margin-bottom: 20px; border: 1px dashed #d1d5db; background-color: #f9fafb;"></div>'
    },
    { 
      title: 'SOCIAL', 
      icon: <Share2 size={24} />, 
      type: 'social',
      html: '<div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 15px; border: 1px dashed #d1d5db; background-color: #f9fafb;"><div contenteditable="true">Follow us on social media!</div></div>'
    },
    { 
      title: 'HTML', 
      icon: <Code size={24} />, 
      type: 'html',
      html: '<div class="draggable-row" style="margin-bottom: 20px;"><div contenteditable="true" style="padding: 15px; border: 1px dashed #d1d5db; background-color: #f9fafb; font-family: monospace;">&lt;p&gt;Custom HTML code here&lt;/p&gt;</div></div>'
    },
    { 
      title: 'VIDEO', 
      icon: <Film size={24} />, 
      type: 'video',
      html: '<div class="draggable-row" style="margin-bottom: 20px; text-align: center; padding: 15px; border: 1px dashed #d1d5db; background-color: #f9fafb;"><div contenteditable="true">Video placeholder - Add your video embed code here</div></div>'
    },
    { 
      title: 'ICONS', 
      icon: <Square size={24} />, 
      type: 'icons',
      html: '<div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 15px; border: 1px dashed #d1d5db; background-color: #f9fafb;"><div contenteditable="true">📧 📞 🌐</div></div>'
    },
    { 
      title: 'MENU', 
      icon: <MenuIcon size={24} />, 
      type: 'menu',
      html: '<div class="draggable-row" style="margin-bottom: 20px;"><nav contenteditable="true" style="padding: 15px; border: 1px dashed #d1d5db; background-color: #f9fafb;"><a href="#" style="margin-right: 20px;">Home</a><a href="#" style="margin-right: 20px;">About</a><a href="#" style="margin-right: 20px;">Contact</a></nav></div>'
    },
    { 
      title: 'STICKER', 
      icon: <Sticker size={24} />, 
      type: 'sticker',
      html: '<div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 15px; border: 1px dashed #d1d5db; background-color: #f9fafb;"><div contenteditable="true" style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 10px; border-radius: 10px; display: inline-block;">Sticker Text</div></div>'
    },
    { 
      title: 'GIF', 
      icon: <FileImage size={24} />, 
      type: 'gif',
      html: '<div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 15px; border: 1px dashed #d1d5db; background-color: #f9fafb;"><div contenteditable="true">GIF placeholder - Add your GIF URL here</div></div>'
    }
  ];

  const handleDragStart = (e: React.DragEvent, block: any) => {
    if (block.type === 'image') {
      // Handle image differently - don't set HTML data
      e.dataTransfer.setData('text/plain', 'image');
      return;
    }
    
    e.dataTransfer.setData('text/html', block.html);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {blocks.map((block, index) => (
        <ContentBlock 
          key={index}
          title={block.title}
          icon={block.icon}
          onClick={() => onInsertContent(block.type)}
          onDragStart={(e) => handleDragStart(e, block)}
        />
      ))}
    </div>
  );
};

export default ContentBlocks;
