
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface LayoutOption {
  id: string;
  name: string;
  template: React.ReactNode;
  html: string;
}

interface LayoutSelectorProps {
  onSelectLayout: (layoutId: string) => void;
  onDragLayout?: (layoutHtml: string) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ onSelectLayout, onDragLayout }) => {
  const { toast } = useToast();
  
  // Create layout options
  const layoutOptions: LayoutOption[] = [
    {
      id: 'single-column',
      name: 'Single Column',
      template: (
        <div className="h-24 border border-dashed border-gray-300 rounded-sm bg-gray-100 w-full"></div>
      ),
      html: '<div class="draggable-row" style="padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-bottom: 20px;"><p>Single column content area. Click to edit.</p></div>'
    },
    {
      id: 'two-column-left',
      name: 'Two Column (Left)',
      template: (
        <div className="flex h-24 gap-2">
          <div className="w-1/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
          <div className="w-2/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
        </div>
      ),
      html: '<div class="draggable-row" style="display: flex; margin-bottom: 20px;"><div style="width: 30%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;"><p>Left column</p></div><div style="width: 70%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;"><p>Right column</p></div></div>'
    },
    {
      id: 'two-column-right',
      name: 'Two Column (Right)',
      template: (
        <div className="flex h-24 gap-2">
          <div className="w-2/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
          <div className="w-1/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
        </div>
      ),
      html: '<div class="draggable-row" style="display: flex; margin-bottom: 20px;"><div style="width: 70%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;"><p>Left column</p></div><div style="width: 30%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;"><p>Right column</p></div></div>'
    },
    {
      id: 'two-column-equal',
      name: 'Two Column (Equal)',
      template: (
        <div className="flex h-24 gap-2">
          <div className="w-1/2 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
          <div className="w-1/2 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
        </div>
      ),
      html: '<div class="draggable-row" style="display: flex; margin-bottom: 20px;"><div style="width: 50%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;"><p>Left column</p></div><div style="width: 50%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;"><p>Right column</p></div></div>'
    },
    {
      id: 'three-column',
      name: 'Three Column',
      template: (
        <div className="flex h-24 gap-2">
          <div className="w-1/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
          <div className="w-1/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
          <div className="w-1/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
        </div>
      ),
      html: '<div class="draggable-row" style="display: flex; margin-bottom: 20px;"><div style="width: 33.33%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;"><p>Left column</p></div><div style="width: 33.33%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;"><p>Middle column</p></div><div style="width: 33.33%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;"><p>Right column</p></div></div>'
    },
    {
      id: 'image-text-overlay',
      name: 'Image with Text',
      template: (
        <div className="h-24 border border-dashed border-gray-300 rounded-sm bg-gray-100 w-full flex items-center justify-center">
          <span className="text-xs">Image + Text Overlay</span>
        </div>
      ),
      html: '<div class="draggable-row image-container relative" contenteditable="false"><img src="/placeholder.svg" alt="Placeholder image" style="max-width: 100%;" /><div class="image-overlay absolute inset-0 flex items-center justify-center cursor-text" contenteditable="true"><p class="text-white text-2xl font-bold">Add your text here</p></div></div>'
    },
  ];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, layout: LayoutOption) => {
    e.dataTransfer.setData('text/html', layout.html);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleColorSelect = (color: string) => {
    // Apply the selected color to the editor background
    document.querySelector('.editor-content')?.classList.remove('template-purple', 'template-blue', 'template-green');
    document.querySelector('.editor-content')?.classList.add(`template-${color}`);
    
    toast({
      title: "Template Color Updated",
      description: `Applied the ${color} color theme to your template.`,
    });
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Template Colors</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-10 h-10 p-0 rounded-full bg-gradient-to-b from-purple-100 to-purple-300"
            onClick={() => handleColorSelect('purple')}
          />
          <Button
            variant="outline"
            className="w-10 h-10 p-0 rounded-full bg-gradient-to-b from-blue-100 to-blue-300"
            onClick={() => handleColorSelect('blue')}
          />
          <Button
            variant="outline"
            className="w-10 h-10 p-0 rounded-full bg-gradient-to-b from-green-100 to-green-300"
            onClick={() => handleColorSelect('green')}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium mb-2">Drag & Drop Layouts</h3>
        <p className="text-xs text-gray-500 mb-4">Drag layouts directly into the editor or click to add</p>
        
        {layoutOptions.map((layout) => (
          <div 
            key={layout.id}
            className="border rounded-md p-4 hover:border-primary cursor-pointer transition-colors"
            onClick={() => onSelectLayout(layout.id)}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, layout)}
          >
            {layout.template}
            <div className="mt-2 text-xs text-center text-gray-500">{layout.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutSelector;
