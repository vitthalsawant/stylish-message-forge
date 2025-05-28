import React, { useRef, useEffect, useState } from 'react';

interface EditorContentProps {
  content: string;
  onChange: (content: string) => void;
  onSelectionChange: (selection: Selection | null) => void;
}

const EditorContent: React.FC<EditorContentProps> = ({ 
  content, 
  onChange, 
  onSelectionChange 
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(null);
  const [dragOverElement, setDragOverElement] = useState<HTMLElement | null>(null);
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState<{ top: number; visible: boolean }>({ top: 0, visible: false });

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      onSelectionChange(selection);
    };

    document.addEventListener('selectionchange', handleSelection);
    return () => {
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, [onSelectionChange]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    // Ensure color and other formatting is preserved
    const content = e.currentTarget.innerHTML;
    onChange(content);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    // Get plain text from clipboard
    const text = e.clipboardData.getData('text/plain');
    
    // Insert at cursor position
    document.execCommand('insertText', false, text);
    
    // Update content after paste
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = content;
      setIsInitialized(true);
    } else if (editorRef.current && isInitialized && editorRef.current.innerHTML !== content) {
      // Only update if content changed from outside the editor
      const activeElement = document.activeElement;
      if (activeElement !== editorRef.current) {
        editorRef.current.innerHTML = content;
      }
    }
  }, [content, isInitialized]);

  // Get the position for drop indicator
  const getDropPosition = (e: DragEvent, targetElement: HTMLElement) => {
    const rect = targetElement.getBoundingClientRect();
    const mouseY = e.clientY;
    const elementCenter = rect.top + rect.height / 2;
    
    return {
      position: mouseY < elementCenter ? 'before' : 'after',
      y: mouseY < elementCenter ? rect.top : rect.bottom
    };
  };

  // Setup drag and drop functionality
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // Add drag handlers to draggable rows and columns
    const setupDraggableElements = () => {
      // Setup rows
      const rows = editor.querySelectorAll('.draggable-row');
      rows.forEach(row => {
        const rowElement = row as HTMLElement;
        
        rowElement.setAttribute('draggable', 'true');
        rowElement.style.cursor = 'move';
        
        rowElement.addEventListener('dragstart', (e) => {
          const target = e.target as HTMLElement;
          const closestRow = target.closest('.draggable-row') as HTMLElement;
          if (closestRow) {
            setDraggedElement(closestRow);
            closestRow.classList.add('dragging');
            closestRow.style.opacity = '0.5';
            e.dataTransfer!.effectAllowed = 'move';
          }
        });
        
        rowElement.addEventListener('dragend', () => {
          setDraggedElement(null);
          setDropIndicatorPosition({ top: 0, visible: false });
          rowElement.classList.remove('dragging');
          rowElement.style.opacity = '1';
          
          // Remove drag-over classes from all elements
          document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
          });
        });
      });
      
      // Setup columns within flex rows
      const columns = editor.querySelectorAll('.draggable-row > div');
      columns.forEach(column => {
        const columnElement = column as HTMLElement;
        if (!columnElement.classList.contains('draggable-row')) {
          columnElement.setAttribute('draggable', 'true');
          columnElement.style.cursor = 'move';
          
          columnElement.addEventListener('dragstart', (e) => {
            // Prevent event bubbling to parent row
            e.stopPropagation();
            const target = e.target as HTMLElement;
            const columnEl = target.closest('div') as HTMLElement;
            if (columnEl && !columnEl.classList.contains('draggable-row')) {
              setDraggedElement(columnEl);
              columnEl.classList.add('dragging');
              columnEl.style.opacity = '0.5';
              e.dataTransfer!.effectAllowed = 'move';
            }
          });
          
          columnElement.addEventListener('dragend', () => {
            setDraggedElement(null);
            columnElement.classList.remove('dragging');
            columnElement.style.opacity = '1';
          });
        }
      });
    };

    // Add drop handlers to editor
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      
      // Check if we're dragging from sidebar (layout or color)
      const dragData = e.dataTransfer?.types;
      if (dragData?.includes('text/html') || dragData?.includes('text/plain')) {
        const dropTarget = target.closest('.draggable-row') as HTMLElement | null;
        
        if (dropTarget && dropTarget !== draggedElement) {
          const dropInfo = getDropPosition(e, dropTarget);
          setDropIndicatorPosition({
            top: dropInfo.y - editor.getBoundingClientRect().top,
            visible: true
          });
          
          // Remove previous drag-over classes
          document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
          });
          
          dropTarget.classList.add('drag-over');
          setDragOverElement(dropTarget);
        } else if (!dropTarget) {
          // Dropping at the end of the editor
          const editorRect = editor.getBoundingClientRect();
          setDropIndicatorPosition({
            top: e.clientY - editorRect.top,
            visible: true
          });
        }
      } else if (draggedElement) {
        // Internal drag and drop logic
        const dropTarget = target.closest('.draggable-row') as HTMLElement | null;
        
        if (dropTarget && dropTarget !== draggedElement) {
          const dropInfo = getDropPosition(e, dropTarget);
          setDropIndicatorPosition({
            top: dropInfo.y - editor.getBoundingClientRect().top,
            visible: true
          });
          
          // Remove previous drag-over classes
          document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
          });
          
          dropTarget.classList.add('drag-over');
          setDragOverElement(dropTarget);
        } else if (!dropTarget) {
          // Dropping at the end of the editor
          const editorRect = editor.getBoundingClientRect();
          setDropIndicatorPosition({
            top: e.clientY - editorRect.top,
            visible: true
          });
        }
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      // Only hide indicator if leaving the editor completely
      if (!editor.contains(e.relatedTarget as Node)) {
        setDropIndicatorPosition({ top: 0, visible: false });
        document.querySelectorAll('.drag-over').forEach(el => {
          el.classList.remove('drag-over');
        });
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      
      // Check for layout drop from sidebar
      const htmlData = e.dataTransfer?.getData('text/html');
      const plainData = e.dataTransfer?.getData('text/plain');
      
      if (htmlData && plainData?.startsWith('layout-')) {
        // Layout drop
        const dropTarget = target.closest('.draggable-row') as HTMLElement | null;
        
        if (dropTarget) {
          dropTarget.insertAdjacentHTML('beforebegin', htmlData);
        } else {
          editor.insertAdjacentHTML('beforeend', htmlData);
        }
        
        handleInput({ currentTarget: editor } as React.FormEvent<HTMLDivElement>);
        setupDraggableElements();
        
      } else if (plainData?.startsWith('color-')) {
        // Color drop
        const color = plainData.replace('color-', '');
        const dropTarget = target.closest('[data-column-id]') as HTMLElement | null;
        
        if (dropTarget) {
          dropTarget.style.backgroundColor = color;
          handleInput({ currentTarget: editor } as React.FormEvent<HTMLDivElement>);
        }
        
      } else if (draggedElement) {
        // Internal element drag and drop
        const dropTarget = target.closest('.draggable-row') as HTMLElement | null;
        
        // Check if we're dragging a column
        const isColumn = draggedElement.parentElement && 
                         draggedElement.parentElement.classList.contains('draggable-row');
                         
        if (isColumn) {
          // Column dragging logic
          const columnTarget = target.closest('div:not(.draggable-row)') as HTMLElement | null;
          const rowTarget = target.closest('.draggable-row') as HTMLElement | null;
          
          if (columnTarget && columnTarget !== draggedElement && rowTarget) {
            // Swap columns within the same row or move to different row
            const parentRow = rowTarget;
            const referenceNode = columnTarget;
            
            const dropInfo = getDropPosition(e, referenceNode);
            if (dropInfo.position === 'before') {
              parentRow.insertBefore(draggedElement, referenceNode);
            } else {
              parentRow.insertBefore(draggedElement, referenceNode.nextSibling);
            }
          } else if (rowTarget && !columnTarget) {
            // Append to the row if dropped directly on it
            rowTarget.appendChild(draggedElement);
          }
        } else {
          // Row dragging logic
          if (dropTarget && dropTarget !== draggedElement) {
            const dropInfo = getDropPosition(e, dropTarget);
            if (dropInfo.position === 'before') {
              editor.insertBefore(draggedElement, dropTarget);
            } else {
              editor.insertBefore(draggedElement, dropTarget.nextSibling);
            }
          } else if (!dropTarget) {
            // Append to the end if dropped directly on the editor
            editor.appendChild(draggedElement);
          }
        }
        
        // Update content
        handleInput({ currentTarget: editor } as React.FormEvent<HTMLDivElement>);
      }
      
      // Handle file drops for image uploads and content blocks
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            // Insert image at drop position
            const dropTarget = target.closest('.draggable-row') || target;
            
            const imageHtml = `
              <div class="draggable-row image-container relative" contenteditable="false">
                <img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%;" />
                <div class="image-overlay absolute inset-0 flex items-center justify-center cursor-text" contenteditable="true">
                  <p class="text-white text-2xl font-bold">Add text here</p>
                </div>
              </div>
            `;
            
            // Insert image at drop position or at cursor position
            if (dropTarget.classList.contains('draggable-row')) {
              dropTarget.insertAdjacentHTML('beforebegin', imageHtml);
            } else {
              document.execCommand('insertHTML', false, imageHtml);
            }
            
            handleInput({ currentTarget: editor } as React.FormEvent<HTMLDivElement>);
            setupDraggableElements(); // Setup new draggable rows
          };
          reader.readAsDataURL(file);
        }
      }
      
      // Clean up
      setDropIndicatorPosition({ top: 0, visible: false });
      setDraggedElement(null);
      setDragOverElement(null);
      
      // Remove drag-over class from all elements
      document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
      });
    };
    
    editor.addEventListener('dragover', handleDragOver);
    editor.addEventListener('dragleave', handleDragLeave);
    editor.addEventListener('drop', handleDrop);
    
    // Initial setup of existing rows
    const observer = new MutationObserver(() => {
      setupDraggableElements();
    });
    
    observer.observe(editor, { childList: true, subtree: true });
    
    // Setup initial draggable rows
    setupDraggableElements();
    
    return () => {
      editor.removeEventListener('dragover', handleDragOver);
      editor.removeEventListener('dragleave', handleDragLeave);
      editor.removeEventListener('drop', handleDrop);
      observer.disconnect();
    };
  }, [draggedElement, dragOverElement]);

  return (
    <div className="relative">
      <div
        ref={editorRef}
        className="editor-content p-4 border border-t-0 rounded-b-md min-h-[300px] focus:outline-none focus:ring-1 focus:ring-primary bg-white"
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        onPaste={handlePaste}
        suppressContentEditableWarning={true}
        style={{ 
          whiteSpace: 'pre-wrap',
          color: 'inherit'
        }}
      />
      
      {/* Drop indicator */}
      {dropIndicatorPosition.visible && (
        <div 
          className="absolute left-0 right-0 h-0.5 bg-blue-500 z-10 pointer-events-none"
          style={{ 
            top: dropIndicatorPosition.top + 16, // Account for padding
            marginLeft: '16px',
            marginRight: '16px'
          }}
        />
      )}
      
      {/* Custom styles for drag effects using CSS classes */}
      <style>
        {`
          .dragging {
            opacity: 0.5 !important;
            transform: rotate(2deg);
          }
          
          .drag-over {
            background-color: rgba(59, 130, 246, 0.1) !important;
            border: 2px dashed #3b82f6 !important;
          }
          
          .draggable-row:hover {
            outline: 1px dashed #d1d5db;
          }
          
          .draggable-row {
            transition: all 0.2s ease;
          }
          
          [data-column-id]:hover {
            outline: 1px dashed #3b82f6;
          }
          
          .drop-zone-active {
            background-color: rgba(59, 130, 246, 0.05) !important;
            border: 2px dashed #3b82f6 !important;
          }
        `}
      </style>
    </div>
  );
};

export default EditorContent;
