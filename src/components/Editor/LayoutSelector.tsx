
import React from 'react';

interface LayoutOption {
  id: string;
  name: string;
  template: React.ReactNode;
}

interface LayoutSelectorProps {
  onSelectLayout: (layoutId: string) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ onSelectLayout }) => {
  // Create layout options
  const layoutOptions: LayoutOption[] = [
    {
      id: 'single-column',
      name: 'Single Column',
      template: (
        <div className="h-24 border border-dashed border-gray-300 rounded-sm bg-gray-100 w-full"></div>
      )
    },
    {
      id: 'two-column-left',
      name: 'Two Column (Left)',
      template: (
        <div className="flex h-24 gap-2">
          <div className="w-1/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
          <div className="w-2/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
        </div>
      )
    },
    {
      id: 'two-column-right',
      name: 'Two Column (Right)',
      template: (
        <div className="flex h-24 gap-2">
          <div className="w-2/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
          <div className="w-1/3 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
        </div>
      )
    },
    {
      id: 'two-column-equal',
      name: 'Two Column (Equal)',
      template: (
        <div className="flex h-24 gap-2">
          <div className="w-1/2 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
          <div className="w-1/2 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
        </div>
      )
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
      )
    },
    {
      id: 'two-row',
      name: 'Two Row',
      template: (
        <div className="flex flex-col h-24 gap-2">
          <div className="h-1/2 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
          <div className="h-1/2 border border-dashed border-gray-300 rounded-sm bg-gray-100"></div>
        </div>
      )
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="relative">
          <div className="flex justify-center mb-4">
            <select 
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              defaultValue="empty"
            >
              <option value="empty">Empty</option>
              <option value="1-column">1 Column</option>
              <option value="2-column">2 Column</option>
              <option value="3-column">3 Column</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {layoutOptions.map((layout) => (
          <div 
            key={layout.id}
            className="border rounded-md p-4 hover:border-primary cursor-pointer transition-colors"
            onClick={() => onSelectLayout(layout.id)}
          >
            {layout.template}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutSelector;
