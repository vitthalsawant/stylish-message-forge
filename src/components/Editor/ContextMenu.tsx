import React, { useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onDelete: () => void;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onDelete, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      ref={menuRef}
      className="fixed bg-white rounded-md shadow-lg border border-gray-200 py-1 z-[9999]"
      style={{ 
        left: x, 
        top: y,
        minWidth: '150px'
      }}
    >
      <button
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
          onClose();
        }}
      >
        <Trash2 size={16} />
        Delete Section
      </button>
    </div>
  );
};

export default ContextMenu; 