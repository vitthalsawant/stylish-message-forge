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
        
        rowElement.addEventListener('dragstart', (e) => {
          const target = e.target as HTMLElement;
          const closestRow = target.closest('.draggable-row') as HTMLElement;
          if (closestRow) {
            setDraggedElement(closestRow);
            closestRow.classList.add('dragging');
          }
        });
        
        rowElement.addEventListener('dragend', () => {
          setDraggedElement(null);
          rowElement.classList.remove('dragging');
        });
      });
      
      // Setup columns within flex rows
      const columns = editor.querySelectorAll('.draggable-row > div');
      columns.forEach(column => {
        const columnElement = column as HTMLElement;
        columnElement.setAttribute('draggable', 'true');
        
        columnElement.addEventListener('dragstart', (e) => {
          // Prevent event bubbling to parent row
          e.stopPropagation();
          const target = e.target as HTMLElement;
          const columnEl = target.closest('div') as HTMLElement;
          if (columnEl && !columnEl.classList.contains('draggable-row')) {
            setDraggedElement(columnEl);
            columnEl.classList.add('dragging');
            // Store the parent row information
            columnEl.dataset.parentRow = columnEl.parentElement?.className || '';
          }
        });
        
        columnElement.addEventListener('dragend', () => {
          setDraggedElement(null);
          columnElement.classList.remove('dragging');
        });
      });
    };

    // Add drop handlers to editor
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (!draggedElement) return;

      const target = e.target as HTMLElement;
      const dropTarget = target.closest('.draggable-row') as HTMLElement | null || target;
      
      if (dropTarget !== dragOverElement) {
        setDragOverElement(dropTarget);
      }
      
      if (dropTarget && dropTarget !== draggedElement) {
        dropTarget.classList.add('drag-over');
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      const dropTarget = target.closest('.draggable-row') as HTMLElement | null || target;
      if (dropTarget) {
        dropTarget.classList.remove('drag-over');
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (!draggedElement) return;
      
      const target = e.target as HTMLElement;
      const dropTarget = target.closest('.draggable-row') as HTMLElement | null || editor;
      
      // Check if we're dragging a column
      const isColumn = draggedElement.parentElement && 
                       draggedElement.parentElement.classList.contains('draggable-row');
                       
      if (isColumn) {
        // Column dragging logic
        const columnTarget = target.closest('div:not(.draggable-row)') as HTMLElement | null;
        const rowTarget = target.closest('.draggable-row') as HTMLElement | null;
        
        if (columnTarget && columnTarget !== draggedElement && rowTarget) {
          // Swap columns within the same row
          const parentRow = rowTarget;
          const referenceNode = columnTarget;
          
          parentRow.insertBefore(draggedElement, referenceNode);
        } else if (rowTarget && !columnTarget) {
          // Append to the row if dropped directly on it
          rowTarget.appendChild(draggedElement);
        }
      } else {
        // Row dragging logic
        if (dropTarget && dropTarget !== draggedElement) {
          if (dropTarget === editor) {
            // Append to the end if dropped directly on the editor
            editor.appendChild(draggedElement);
          } else {
            // Insert before the target
            editor.insertBefore(draggedElement, dropTarget);
          }
        }
      }
      
      // Update content
      handleInput({ currentTarget: editor } as React.FormEvent<HTMLDivElement>);
      
      // Remove drag-over class from all elements
      document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
      });
      
      setDraggedElement(null);
      setDragOverElement(null);
    };

    // Handle file drops for image uploads and content blocks
    const handleFileDrop = (e: DragEvent) => {
      e.preventDefault();
      
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            // Insert image at drop position
            const target = e.target as HTMLElement;
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
      } else {
        // Check for HTML data being dropped from content blocks
        const html = e.dataTransfer?.getData('text/html');
        if (html) {
          const target = e.target as HTMLElement;
          const dropTarget = target.closest('.draggable-row') || editor;
          
          // Create a temporary container to hold our HTML
          const tempContainer = document.createElement('div');
          tempContainer.innerHTML = html;
          
          // Get the first element from our HTML snippet
          const element = tempContainer.firstElementChild;
          if (element) {
            if (dropTarget === editor) {
              editor.appendChild(element);
            } else if (dropTarget.classList.contains('draggable-row')) {
              dropTarget.insertAdjacentElement('beforebegin', element);
            }
            
            // Update content and initialize draggable behavior
            handleInput({ currentTarget: editor } as React.FormEvent<HTMLDivElement>);
            setupDraggableElements();
          }
        }
      }
    };
    
    editor.addEventListener('dragover', handleDragOver);
    editor.addEventListener('dragleave', handleDragLeave);
    editor.addEventListener('drop', handleDrop);
    editor.addEventListener('drop', handleFileDrop);
    
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
      editor.removeEventListener('drop', handleFileDrop);
      observer.disconnect();
    };
  }, [draggedElement, dragOverElement]);

  return (
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
  );
};

export default EditorContent;
