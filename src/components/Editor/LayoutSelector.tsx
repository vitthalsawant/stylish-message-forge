
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LayoutSelectorProps {
  onSelectLayout: (layoutId: string) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ onSelectLayout }) => {
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  const templateColors = [
    // Dark to Light Purple Gradient
    { name: "Deep Purple", value: "#4C1D95" },
    { name: "Medium Purple", value: "#7C3AED" },
    { name: "Light Purple", value: "#A78BFA" },
    { name: "Pale Purple", value: "#E9D5FF" },
    
    // Dark to Light Blue Gradient
    { name: "Deep Blue", value: "#1E3A8A" },
    { name: "Medium Blue", value: "#3B82F6" },
    { name: "Light Blue", value: "#93C5FD" },
    { name: "Pale Blue", value: "#DBEAFE" },
    
    // Dark to Light Green Gradient
    { name: "Deep Green", value: "#14532D" },
    { name: "Medium Green", value: "#16A34A" },
    { name: "Light Green", value: "#86EFAC" },
    { name: "Pale Green", value: "#D1FAE5" },
    
    // Dark to Light Pink Gradient
    { name: "Deep Pink", value: "#BE185D" },
    { name: "Medium Pink", value: "#EC4899" },
    { name: "Light Pink", value: "#F9A8D4" },
    { name: "Pale Pink", value: "#FCE7F3" },
    
    // Dark to Light Orange Gradient
    { name: "Deep Orange", value: "#C2410C" },
    { name: "Medium Orange", value: "#F97316" },
    { name: "Light Orange", value: "#FDBA74" },
    { name: "Pale Orange", value: "#FED7AA" },
    
    // Dark to Light Teal Gradient
    { name: "Deep Teal", value: "#134E4A" },
    { name: "Medium Teal", value: "#0F766E" },
    { name: "Light Teal", value: "#5EEAD4" },
    { name: "Pale Teal", value: "#CCFBF1" },
  ];

  const layouts = [
    {
      id: 'single-column',
      name: 'Single Column',
      preview: (
        <div className="w-full h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
          Single Column
        </div>
      )
    },
    {
      id: 'two-column-equal',
      name: 'Two Columns (Equal)',
      preview: (
        <div className="flex gap-2">
          <div 
            className="flex-1 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColumn('two-equal-left');
            }}
            style={{ backgroundColor: selectedColumn === 'two-equal-left' ? '#e0e7ff' : 'transparent' }}
          >
            Left column
          </div>
          <div 
            className="flex-1 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColumn('two-equal-right');
            }}
            style={{ backgroundColor: selectedColumn === 'two-equal-right' ? '#e0e7ff' : 'transparent' }}
          >
            Right column
          </div>
        </div>
      )
    },
    {
      id: 'two-column-left',
      name: 'Two Columns (Left Heavy)',
      preview: (
        <div className="flex gap-2">
          <div 
            className="w-2/3 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColumn('two-left-main');
            }}
            style={{ backgroundColor: selectedColumn === 'two-left-main' ? '#e0e7ff' : 'transparent' }}
          >
            Left column
          </div>
          <div 
            className="w-1/3 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColumn('two-left-side');
            }}
            style={{ backgroundColor: selectedColumn === 'two-left-side' ? '#e0e7ff' : 'transparent' }}
          >
            Right column
          </div>
        </div>
      )
    },
    {
      id: 'two-column-right',
      name: 'Two Columns (Right Heavy)',
      preview: (
        <div className="flex gap-2">
          <div 
            className="w-1/3 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColumn('two-right-side');
            }}
            style={{ backgroundColor: selectedColumn === 'two-right-side' ? '#e0e7ff' : 'transparent' }}
          >
            Left column
          </div>
          <div 
            className="w-2/3 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColumn('two-right-main');
            }}
            style={{ backgroundColor: selectedColumn === 'two-right-main' ? '#e0e7ff' : 'transparent' }}
          >
            Right column
          </div>
        </div>
      )
    },
    {
      id: 'three-column',
      name: 'Three Columns',
      preview: (
        <div className="flex gap-1">
          <div 
            className="flex-1 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColumn('three-left');
            }}
            style={{ backgroundColor: selectedColumn === 'three-left' ? '#e0e7ff' : 'transparent' }}
          >
            Left
          </div>
          <div 
            className="flex-1 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColumn('three-middle');
            }}
            style={{ backgroundColor: selectedColumn === 'three-middle' ? '#e0e7ff' : 'transparent' }}
          >
            Middle
          </div>
          <div 
            className="flex-1 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColumn('three-right');
            }}
            style={{ backgroundColor: selectedColumn === 'three-right' ? '#e0e7ff' : 'transparent' }}
          >
            Right
          </div>
        </div>
      )
    }
  ];

  const handleColorSelect = (color: string) => {
    if (!selectedColumn) return;

    // Apply color to the selected column
    const columnElement = document.querySelector(`[data-column-id="${selectedColumn}"]`) as HTMLElement;
    if (columnElement) {
      columnElement.style.backgroundColor = color;
    }

    // Reset selection
    setSelectedColumn(null);
  };

  const handleLayoutDragStart = (e: React.DragEvent, layoutId: string) => {
    let layoutHtml = '';
    
    switch(layoutId) {
      case 'single-column':
        layoutHtml = '<div class="draggable-row" style="padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-bottom: 20px;" data-column-id="single"><p>Single column content area. Click to edit.</p></div>';
        break;
      case 'two-column-left':
        layoutHtml = '<div class="draggable-row" style="display: flex; margin-bottom: 20px;"><div style="width: 70%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;" data-column-id="two-left-main"><p>Left column</p></div><div style="width: 30%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;" data-column-id="two-left-side"><p>Right column</p></div></div>';
        break;
      case 'two-column-right':
        layoutHtml = '<div class="draggable-row" style="display: flex; margin-bottom: 20px;"><div style="width: 30%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;" data-column-id="two-right-side"><p>Left column</p></div><div style="width: 70%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;" data-column-id="two-right-main"><p>Right column</p></div></div>';
        break;
      case 'two-column-equal':
        layoutHtml = '<div class="draggable-row" style="display: flex; margin-bottom: 20px;"><div style="width: 50%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;" data-column-id="two-equal-left"><p>Left column</p></div><div style="width: 50%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;" data-column-id="two-equal-right"><p>Right column</p></div></div>';
        break;
      case 'three-column':
        layoutHtml = '<div class="draggable-row" style="display: flex; margin-bottom: 20px;"><div style="width: 33.33%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;" data-column-id="three-left"><p>Left column</p></div><div style="width: 33.33%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;" data-column-id="three-middle"><p>Middle column</p></div><div style="width: 33.33%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;" data-column-id="three-right"><p>Right column</p></div></div>';
        break;
      default:
        layoutHtml = '<div class="draggable-row" style="padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-bottom: 20px;" data-column-id="default"><p>Content area. Click to edit.</p></div>';
    }
    
    e.dataTransfer.setData('text/html', layoutHtml);
    e.dataTransfer.setData('text/plain', `layout-${layoutId}`);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleColorDragStart = (e: React.DragEvent, color: string) => {
    e.dataTransfer.setData('text/plain', `color-${color}`);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleLayoutSelect = (layoutId: string) => {
    onSelectLayout(layoutId);
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Template Colors</h3>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {templateColors.map((color) => (
            <button
              key={color.value}
              className="h-8 w-8 rounded-full border border-gray-200 hover:scale-110 transition-transform cursor-pointer relative group"
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorSelect(color.value)}
              onDragStart={(e) => handleColorDragStart(e, color.value)}
              draggable
              title={`${color.name} - ${selectedColumn ? 'Click to apply to selected column or drag to editor' : 'Select a column first or drag to editor'}`}
            >
              <div className="absolute inset-0 rounded-full ring-2 ring-blue-500 ring-opacity-0 group-hover:ring-opacity-50 transition-all duration-200" />
            </button>
          ))}
        </div>
        {selectedColumn && (
          <p className="text-xs text-blue-600 mb-2">
            Selected: {selectedColumn.replace(/-/g, ' ')} - Choose a color above or drag a color to the editor
          </p>
        )}
        {!selectedColumn && (
          <p className="text-xs text-gray-500 mb-2">
            Click on a column in the layouts below to select it, then choose a color, or drag colors directly to the editor
          </p>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Drag & Drop Layouts</h3>
        <p className="text-xs text-gray-500 mb-4">
          Drag layouts directly into the editor or click to add
        </p>
        
        <div className="space-y-3">
          {layouts.map((layout) => (
            <Card 
              key={layout.id} 
              className="cursor-move hover:shadow-md transition-shadow border-2 border-dashed border-transparent hover:border-blue-300"
              onClick={() => handleLayoutSelect(layout.id)}
              draggable
              onDragStart={(e) => handleLayoutDragStart(e, layout.id)}
            >
              <CardContent className="p-3">
                {layout.preview}
                <p className="text-xs text-center text-gray-600 mt-2">{layout.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutSelector;
