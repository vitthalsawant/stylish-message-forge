
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
  FileImage,
  Layers
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
      html: '<div class="draggable-row" style="margin-bottom: 20px;"><h2 contenteditable="true" style="font-size: 28px; font-weight: bold; margin: 0; padding: 15px; border: 2px dashed #d1d5db; background-color: #f9fafb; color: #1f2937; text-align: center; border-radius: 8px;" placeholder="Enter your title here...">Your Amazing Title</h2></div>'
    },
    { 
      title: 'PARAGRAPH', 
      icon: <AlignLeft size={24} />, 
      type: 'paragraph',
      html: '<div class="draggable-row" style="margin-bottom: 20px;"><div contenteditable="true" style="padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; min-height: 100px; line-height: 1.6; border-radius: 8px;" placeholder="Start typing your paragraph here..."><p style="margin: 0 0 15px 0;">This is your first paragraph. Click here to start editing and add your content.</p><p style="margin: 0;">You can add multiple paragraphs by pressing Enter. Each paragraph will be properly formatted with good spacing.</p></div></div>'
    },
    { 
      title: 'LIST', 
      icon: <ListIcon size={24} />, 
      type: 'list',
      html: '<div class="draggable-row" style="margin-bottom: 20px;"><div style="padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><ul contenteditable="true" style="margin: 0; padding-left: 20px; line-height: 1.8;"><li style="margin-bottom: 8px;">First list item - click to edit</li><li style="margin-bottom: 8px;">Second list item - add your content</li><li style="margin-bottom: 8px;">Third list item - press Enter for new items</li></ul></div></div>'
    },
    { 
      title: 'IMAGE', 
      icon: <ImageIcon size={24} />, 
      type: 'image',
      html: '<div class="draggable-row image-block" style="margin-bottom: 20px; text-align: center; padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop" alt="Sample image" style="max-width: 100%; height: auto; border-radius: 8px; cursor: pointer; transition: transform 0.2s;" onload="this.style.resize=\'both\'; this.style.overflow=\'auto\';" /><div contenteditable="true" style="margin-top: 10px; font-style: italic; color: #6b7280;">Click to add image caption</div></div>'
    },
    { 
      title: 'IMAGE BOX', 
      icon: <Layers size={24} />, 
      type: 'image-box',
      html: '<div class="draggable-row" style="margin-bottom: 20px; position: relative; min-height: 300px; background-image: url(\'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop\'); background-size: cover; background-position: center; background-repeat: no-repeat; border: 2px dashed #d1d5db; border-radius: 12px; overflow: hidden;"><div contenteditable="true" style="position: relative; z-index: 2; padding: 30px; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); background: rgba(0,0,0,0.4); height: 100%; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 12px;"><h3 style="margin: 0; font-size: 24px; font-weight: bold;">Click here to add your overlay text</h3></div></div>'
    },
    { 
      title: 'BUTTON', 
      icon: <Square size={24} />, 
      type: 'button',
      html: '<div class="draggable-row button-block" style="text-align: center; margin-bottom: 20px; padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><a href="#" contenteditable="true" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; transition: transform 0.2s; cursor: pointer;" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">Click Me - Edit Text & Link</a></div>'
    },
    { 
      title: 'TABLE', 
      icon: <Table2 size={24} />, 
      type: 'table',
      html: '<div class="draggable-row" style="margin-bottom: 20px; padding: 15px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><table contenteditable="true" style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"><thead><tr style="background-color: #f3f4f6;"><th style="border: 1px solid #d1d5db; padding: 12px; font-weight: bold; text-align: left;">Header 1</th><th style="border: 1px solid #d1d5db; padding: 12px; font-weight: bold; text-align: left;">Header 2</th><th style="border: 1px solid #d1d5db; padding: 12px; font-weight: bold; text-align: left;">Header 3</th></tr></thead><tbody><tr><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 1-1</td><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 1-2</td><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 1-3</td></tr><tr style="background-color: #f9fafb;"><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 2-1</td><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 2-2</td><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 2-3</td></tr></tbody></table></div>'
    },
    { 
      title: 'DIVIDER', 
      icon: <SeparatorHorizontal size={24} />, 
      type: 'divider',
      html: '<div class="draggable-row" style="margin: 30px 0; padding: 10px 0;"><hr style="border: 0; height: 2px; background: linear-gradient(90deg, transparent, #e5e7eb, transparent); margin: 0;" /><div style="text-align: center; margin-top: 10px;"><span contenteditable="true" style="background: #f3f4f6; padding: 5px 15px; border-radius: 20px; font-size: 12px; color: #6b7280;">Section Break</span></div></div>'
    },
    { 
      title: 'SPACER', 
      icon: <Minus size={24} />, 
      type: 'spacer',
      html: '<div class="draggable-row spacer-block" style="height: 60px; margin-bottom: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 14px; cursor: pointer;" onclick="this.style.height = prompt(\'Enter height in pixels:\', \'60\') + \'px\'">Click to adjust spacing (60px)</div>'
    },
    { 
      title: 'SOCIAL', 
      icon: <Share2 size={24} />, 
      type: 'social',
      html: '<div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 25px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><div style="margin-bottom: 15px;"><span contenteditable="true" style="font-size: 18px; font-weight: bold; color: #374151;">Follow Us On Social Media!</span></div><div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;"><a href="https://facebook.com" style="display: inline-block; width: 50px; height: 50px; background: #1877f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">📘</a><a href="https://twitter.com" style="display: inline-block; width: 50px; height: 50px; background: #1da1f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">🐦</a><a href="https://instagram.com" style="display: inline-block; width: 50px; height: 50px; background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">📷</a><a href="https://linkedin.com" style="display: inline-block; width: 50px; height: 50px; background: #0077b5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">💼</a></div></div>'
    },
    { 
      title: 'HTML', 
      icon: <Code size={24} />, 
      type: 'html',
      html: '<div class="draggable-row" style="margin-bottom: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><div style="background: #1f2937; color: #10b981; padding: 15px; border-radius: 8px 8px 0 0; font-family: monospace; font-size: 12px;">HTML Code Block</div><div contenteditable="true" style="padding: 20px; font-family: \'Courier New\', monospace; background: #f8fafc; border-radius: 0 0 8px 8px; min-height: 100px; font-size: 14px; line-height: 1.6;">&lt;div style="text-align: center; padding: 20px;"&gt;<br>&nbsp;&nbsp;&lt;h3&gt;Custom HTML Content&lt;/h3&gt;<br>&nbsp;&nbsp;&lt;p&gt;Edit this HTML code as needed&lt;/p&gt;<br>&lt;/div&gt;</div></div>'
    },
    { 
      title: 'VIDEO', 
      icon: <Film size={24} />, 
      type: 'video',
      html: '<div class="draggable-row video-block" style="margin-bottom: 20px; text-align: center; padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><div style="background: #000; border-radius: 8px; padding: 40px; position: relative; color: white;"><div style="font-size: 48px; margin-bottom: 15px;">🎬</div><div contenteditable="true" style="font-size: 16px; margin-bottom: 10px;">Video Title</div><div contenteditable="true" style="font-size: 14px; color: #ccc;">Paste your video embed code or URL here</div><input type="file" accept="video/*" style="margin-top: 15px; background: white; color: black; padding: 8px; border-radius: 4px;" placeholder="Or upload video file"></div></div>'
    },
    { 
      title: 'ICONS', 
      icon: <Square size={24} />, 
      type: 'icons',
      html: '<div class="draggable-row icons-block" style="text-align: center; margin-bottom: 20px; padding: 25px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><div contenteditable="true" style="margin-bottom: 20px; font-size: 18px; font-weight: bold;">Icons & Symbols</div><div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; font-size: 32px;"><span contenteditable="true" style="cursor: pointer; padding: 10px; border-radius: 50%; background: #e5e7eb; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.2)\'" onmouseout="this.style.transform=\'scale(1)\'">📧</span><span contenteditable="true" style="cursor: pointer; padding: 10px; border-radius: 50%; background: #e5e7eb; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.2)\'" onmouseout="this.style.transform=\'scale(1)\'">📞</span><span contenteditable="true" style="cursor: pointer; padding: 10px; border-radius: 50%; background: #e5e7eb; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.2)\'" onmouseout="this.style.transform=\'scale(1)\'">🌐</span><span contenteditable="true" style="cursor: pointer; padding: 10px; border-radius: 50%; background: #e5e7eb; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.2)\'" onmouseout="this.style.transform=\'scale(1)\'">⭐</span></div><div style="margin-top: 15px; font-size: 12px; color: #6b7280;">Click icons to edit or upload custom icons</div><input type="file" accept="image/*" style="margin-top: 10px; font-size: 12px;"></div>'
    },
    { 
      title: 'MENU', 
      icon: <MenuIcon size={24} />, 
      type: 'menu',
      html: '<div class="draggable-row" style="margin-bottom: 20px; padding: 15px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><nav style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"><div contenteditable="true" style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1f2937;">Navigation Menu</div><ul contenteditable="true" style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 25px;"><li><a href="#home" style="color: #3b82f6; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background=\'#eff6ff\'" onmouseout="this.style.background=\'transparent\'">Home</a></li><li><a href="#about" style="color: #3b82f6; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background=\'#eff6ff\'" onmouseout="this.style.background=\'transparent\'">About</a></li><li><a href="#services" style="color: #3b82f6; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background=\'#eff6ff\'" onmouseout="this.style.background=\'transparent\'">Services</a></li><li><a href="#contact" style="color: #3b82f6; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background=\'#eff6ff\'" onmouseout="this.style.background=\'transparent\'">Contact</a></li></ul></nav></div>'
    },
    { 
      title: 'STICKER', 
      icon: <Sticker size={24} />, 
      type: 'sticker',
      html: '<div class="draggable-row sticker-block" style="text-align: center; margin-bottom: 20px; padding: 25px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><div contenteditable="true" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px 30px; border-radius: 25px; display: inline-block; font-size: 18px; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transform: rotate(-2deg); cursor: pointer;" onmouseover="this.style.transform=\'rotate(0deg) scale(1.05)\'" onmouseout="this.style.transform=\'rotate(-2deg) scale(1)\'">🎉 Awesome Sticker! 🎉</div><div style="margin-top: 15px; font-size: 12px; color: #6b7280;">Click to edit sticker text</div><input type="file" accept="image/*" style="margin-top: 10px; font-size: 12px;" placeholder="Upload custom sticker"></div>'
    },
    { 
      title: 'GIF', 
      icon: <FileImage size={24} />, 
      type: 'gif',
      html: '<div class="draggable-row gif-block" style="text-align: center; margin-bottom: 20px; padding: 25px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); padding: 30px; border-radius: 12px; color: white;"><div style="font-size: 48px; margin-bottom: 15px;">🎬</div><div contenteditable="true" style="font-size: 16px; margin-bottom: 10px;">GIF Animation</div><div contenteditable="true" style="font-size: 14px;">Upload your GIF or paste URL</div></div><input type="file" accept=".gif,image/gif" style="margin-top: 15px; font-size: 12px;" placeholder="Select GIF file"><div style="margin-top: 10px; font-size: 12px; color: #6b7280;">Only .gif format accepted</div></div>'
    }
  ];

  const handleDragStart = (e: React.DragEvent, block: any) => {
    if (block.type === 'image') {
      e.dataTransfer.setData('text/html', block.html);
      e.dataTransfer.setData('text/plain', 'image-block');
      e.dataTransfer.effectAllowed = 'copy';
      return;
    }
    
    e.dataTransfer.setData('text/html', block.html);
    e.dataTransfer.setData('text/plain', block.type);
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
