
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
    onChange(e.currentTarget.innerHTML);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    // Get plain text from clipboard
    const text = e.clipboardData.getData('text/plain');
    
    // Insert at cursor position
    document.execCommand('insertText', false, text);
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

    // Add drag handlers to draggable rows
    const setupDraggableRows = () => {
      const rows = editor.querySelectorAll('.draggable-row');
      
      rows.forEach(row => {
        if (!(row instanceof HTMLElement)) return;
        
        row.setAttribute('draggable', 'true');
        
        row.addEventListener('dragstart', (e) => {
          if (!(e.target instanceof HTMLElement)) return;
          const closestRow = e.target.closest('.draggable-row');
          if (closestRow instanceof HTMLElement) {
            setDraggedElement(closestRow);
            closestRow.classList.add('dragging');
          }
        });
        
        row.addEventListener('dragend', () => {
          setDraggedElement(null);
          row.classList.remove('dragging');
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
      dropTarget?.classList.remove('drag-over');
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (!draggedElement) return;
      
      const target = e.target as HTMLElement;
      const dropTarget = target.closest('.draggable-row') as HTMLElement | null || editor;
      
      if (dropTarget && dropTarget !== draggedElement) {
        if (dropTarget === editor) {
          // Append to the end if dropped directly on the editor
          editor.appendChild(draggedElement);
        } else {
          // Insert before the target
          editor.insertBefore(draggedElement, dropTarget);
        }
        
        // Update content
        handleInput({ currentTarget: editor } as React.FormEvent<HTMLDivElement>);
      }
      
      // Remove drag-over class from all elements
      document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
      });
      
      setDraggedElement(null);
      setDragOverElement(null);
    };

    // Handle file drops for image uploads
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
            setupDraggableRows(); // Setup new draggable rows
          };
          reader.readAsDataURL(file);
        }
      }
    };
    
    editor.addEventListener('dragover', handleDragOver);
    editor.addEventListener('dragleave', handleDragLeave);
    editor.addEventListener('drop', handleDrop);
    editor.addEventListener('drop', handleFileDrop);
    
    // Initial setup of existing rows
    const observer = new MutationObserver(() => {
      setupDraggableRows();
    });
    
    observer.observe(editor, { childList: true, subtree: true });
    
    // Setup initial draggable rows
    setupDraggableRows();
    
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
    />
  );
};

export default EditorContent;
