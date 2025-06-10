import React, { useRef, useEffect, useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    // Get plain text from clipboard
    const text = e.clipboardData.getData('text/plain');
    
    // Split text into paragraphs and format them
    const paragraphs = text.split('\n').filter(p => p.trim());
    const formattedText = paragraphs.map(p => `<p style="margin: 0 0 15px 0; line-height: 1.6;">${p}</p>`).join('');
    
    // Insert at cursor position
    document.execCommand('insertHTML', false, formattedText);
    
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

  // Add global script functions for handling uploads
  useEffect(() => {
    // Define global functions for handling file uploads
    (window as any).handleImageUpload = function(input: HTMLInputElement) {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const container = input.closest('.image-block');
          if (container) {
            // Replace the entire upload interface with the image in a resizable panel
            container.innerHTML = `
              <div class="resizable-block-wrapper">
                <div class="resizable-panel-group" style="height: auto; min-height: 200px;">
                  <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; width: 100%; max-width: 600px; height: auto; min-height: 200px; margin: 0 auto;">
                    <img src="${e.target?.result}" alt="Uploaded image" style="max-width: 100%; max-height: 400px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto; border-radius: 6px; cursor: pointer;" onclick="editImageSize(this)" />
                    <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
                    <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
                    <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  </div>
                </div>
              </div>
            `;
            
            // Trigger content update
            const editor = document.querySelector('.editor-content') as HTMLElement;
            if (editor) {
              const event = new Event('input', { bubbles: true });
              editor.dispatchEvent(event);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };

    (window as any).handleImageURL = function(input: HTMLInputElement) {
      const url = input.value;
      if (url) {
        const container = input.closest('.image-block');
        if (container) {
          // Replace the entire upload interface with the image in a resizable panel
          container.innerHTML = `
            <div class="resizable-block-wrapper">
              <div class="resizable-panel-group" style="height: auto; min-height: 200px;">
                <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; width: 100%; max-width: 600px; height: auto; min-height: 200px; margin: 0 auto;">
                  <img src="${url}" alt="Image from URL" style="max-width: 100%; max-height: 400px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto; border-radius: 6px; cursor: pointer;" onclick="editImageSize(this)" />
                  <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
                </div>
              </div>
            </div>
          `;
          
          // Trigger content update
          const editor = document.querySelector('.editor-content') as HTMLElement;
          if (editor) {
            const event = new Event('input', { bubbles: true });
            editor.dispatchEvent(event);
          }
        }
      }
    };

    (window as any).handleVideoUpload = function(input: HTMLInputElement) {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const container = input.closest('.video-block');
          if (container) {
            container.innerHTML = `
              <div class="resizable-block-wrapper">
                <div class="resizable-panel-group" style="height: auto; min-height: 250px;">
                  <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; width: 500px; height: 350px;">
                    <video controls style="width: 100%; height: calc(100% - 40px); border-radius: 6px;">
                      <source src="${e.target?.result}" type="${file.type}">
                      Your browser does not support the video tag.
                    </video>
                    <div contenteditable="true" style="color: #374151; font-size: 14px; text-align: center; position: absolute; bottom: 10px; left: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 5px; border-radius: 4px;">Click to add video caption</div>
                    <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
                    <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
                    <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  </div>
                </div>
              </div>
            `;
            
            const editor = document.querySelector('.editor-content') as HTMLElement;
            if (editor) {
              const event = new Event('input', { bubbles: true });
              editor.dispatchEvent(event);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };

    (window as any).handleVideoEmbed = function(textarea: HTMLTextAreaElement) {
      const embedCode = textarea.value;
      if (embedCode) {
        const container = textarea.closest('.video-block');
        if (container) {
          container.innerHTML = `
            <div class="resizable-block-wrapper">
              <div class="resizable-panel-group" style="height: auto; min-height: 250px;">
                <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; padding: 10px; width: 500px; height: 350px;">
                  <div style="width: 100%; height: calc(100% - 40px);">${embedCode}</div>
                  <div contenteditable="true" style="color: #374151; font-size: 14px; text-align: center; position: absolute; bottom: 10px; left: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 5px; border-radius: 4px;">Click to add video caption</div>
                  <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
                </div>
              </div>
            </div>
          `;
          
          const editor = document.querySelector('.editor-content') as HTMLElement;
          if (editor) {
            const event = new Event('input', { bubbles: true });
            editor.dispatchEvent(event);
          }
        }
      }
    };

    (window as any).handleIconUpload = function(input: HTMLInputElement) {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const container = input.closest('.icon-block');
          if (container) {
            container.innerHTML = `
              <div class="resizable-block-wrapper">
                <div class="resizable-panel-group" style="height: auto; min-height: 120px;">
                  <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; text-align: center; padding: 10px; width: 200px; height: 150px;">
                    <img src="${e.target?.result}" alt="Uploaded icon" style="width: 64px; height: 64px; border-radius: 8px; object-fit: contain; margin: 0 auto; display: block;" />
                    <div contenteditable="true" style="color: #374151; font-size: 14px; margin-top: 10px;">Click to edit icon label</div>
                    <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
                    <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
                    <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  </div>
                </div>
              </div>
            `;
            
            const editor = document.querySelector('.editor-content') as HTMLElement;
            if (editor) {
              const event = new Event('input', { bubbles: true });
              editor.dispatchEvent(event);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };

    (window as any).handleIconURL = function(input: HTMLInputElement) {
      const url = input.value;
      if (url) {
        const container = input.closest('.icon-block');
        if (container) {
          container.innerHTML = `
            <div class="resizable-block-wrapper">
              <div class="resizable-panel-group" style="height: auto; min-height: 120px;">
                <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; text-align: center; padding: 10px; width: 200px; height: 150px;">
                  <img src="${url}" alt="Icon from URL" style="width: 64px; height: 64px; border-radius: 8px; object-fit: contain; margin: 0 auto; display: block;" />
                  <div contenteditable="true" style="color: #374151; font-size: 14px; margin-top: 10px;">Click to edit icon label</div>
                  <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
                </div>
              </div>
            </div>
          `;
          
          const editor = document.querySelector('.editor-content') as HTMLElement;
          if (editor) {
            const event = new Event('input', { bubbles: true });
            editor.dispatchEvent(event);
          }
        }
      }
    };

    (window as any).handleStickerUpload = function(input: HTMLInputElement) {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const container = input.closest('.sticker-block');
          if (container) {
            container.innerHTML = `
              <div class="resizable-block-wrapper">
                <div class="resizable-panel-group" style="height: auto; min-height: 180px;">
                  <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; text-align: center; padding: 10px; width: 250px; height: 200px;">
                    <img src="${e.target?.result}" alt="Uploaded sticker" style="max-width: 150px; max-height: 120px; border-radius: 12px; object-fit: cover; transform: rotate(-2deg); margin: 0 auto; display: block;" />
                    <div contenteditable="true" style="color: #374151; font-size: 14px; margin-top: 10px;">Click to edit sticker caption</div>
                    <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
                    <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
                    <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  </div>
                </div>
              </div>
            `;
            
            const editor = document.querySelector('.editor-content') as HTMLElement;
            if (editor) {
              const event = new Event('input', { bubbles: true });
              editor.dispatchEvent(event);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };

    (window as any).handleStickerURL = function(input: HTMLInputElement) {
      const url = input.value;
      if (url) {
        const container = input.closest('.sticker-block');
        if (container) {
          container.innerHTML = `
            <div class="resizable-block-wrapper">
              <div class="resizable-panel-group" style="height: auto; min-height: 180px;">
                <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; text-align: center; padding: 10px; width: 250px; height: 200px;">
                  <img src="${url}" alt="Sticker from URL" style="max-width: 150px; max-height: 120px; border-radius: 12px; object-fit: cover; transform: rotate(-2deg); margin: 0 auto; display: block;" />
                  <div contenteditable="true" style="color: #374151; font-size: 14px; margin-top: 10px;">Click to edit sticker caption</div>
                  <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
                </div>
              </div>
            </div>
          `;
          
          const editor = document.querySelector('.editor-content') as HTMLElement;
          if (editor) {
            const event = new Event('input', { bubbles: true });
            editor.dispatchEvent(event);
          }
        }
      }
    };

    (window as any).handleGifUpload = function(input: HTMLInputElement) {
      const file = input.files?.[0];
      if (file && file.type === 'image/gif') {
        const reader = new FileReader();
        reader.onload = function(e) {
          const container = input.closest('.gif-block');
          if (container) {
            container.innerHTML = `
              <div class="resizable-block-wrapper">
                <div class="resizable-panel-group" style="height: auto; min-height: 180px;">
                  <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; text-align: center; padding: 10px; width: 300px; height: 220px;">
                    <img src="${e.target?.result}" alt="Uploaded GIF" style="max-width: 200px; max-height: 150px; border-radius: 8px; object-fit: cover; margin: 0 auto; display: block;" />
                    <div contenteditable="true" style="color: #374151; font-size: 14px; margin-top: 10px;">Click to add GIF caption</div>
                    <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
                    <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
                    <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  </div>
                </div>
              </div>
            `;
            
            const editor = document.querySelector('.editor-content') as HTMLElement;
            if (editor) {
              const event = new Event('input', { bubbles: true });
              editor.dispatchEvent(event);
            }
          }
        };
        reader.readAsDataURL(file);
      } else if (file) {
        alert('Please select a valid GIF file.');
      }
    };

    (window as any).handleGifURL = function(input: HTMLInputElement) {
      const url = input.value;
      if (url && url.toLowerCase().includes('.gif')) {
        const container = input.closest('.gif-block');
        if (container) {
          container.innerHTML = `
            <div class="resizable-block-wrapper">
              <div class="resizable-panel-group" style="height: auto; min-height: 180px;">
                <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; text-align: center; padding: 10px; width: 300px; height: 220px;">
                  <img src="${url}" alt="GIF from URL" style="max-width: 200px; max-height: 150px; border-radius: 8px; object-fit: cover; margin: 0 auto; display: block;" />
                  <div contenteditable="true" style="color: #374151; font-size: 14px; margin-top: 10px;">Click to add GIF caption</div>
                  <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
                  <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
                </div>
              </div>
            </div>
          `;
          
          const editor = document.querySelector('.editor-content') as HTMLElement;
          if (editor) {
            const event = new Event('input', { bubbles: true });
            editor.dispatchEvent(event);
          }
        }
      }
    };

    (window as any).adjustSpacing = function(element: HTMLElement) {
      const newHeight = prompt('Enter height in pixels:', '60');
      if (newHeight) {
        element.style.height = newHeight + 'px';
        element.innerHTML = `Click to adjust spacing (${newHeight}px)`;
      }
    };

    (window as any).editImageSize = function(img: HTMLImageElement) {
      const newWidth = prompt('Enter width (e.g., 300px, 50%, auto):', img.style.width || 'auto');
      if (newWidth) {
        img.style.width = newWidth;
      }
    };

    (window as any).editButtonLink = function(button: HTMLAnchorElement) {
      const newLink = prompt('Enter URL:', button.href);
      if (newLink) {
        button.href = newLink;
      }
    };

    // Enhanced resize functionality with proper drag handling
    (window as any).initializeResizeHandles = function() {
      const resizePanels = document.querySelectorAll('.resizable-panel');
      
      resizePanels.forEach((panel) => {
        const resizeHandles = panel.querySelectorAll('.resize-handle');
        
        resizeHandles.forEach((handle) => {
          let isResizing = false;
          let startX = 0;
          let startY = 0;
          let startWidth = 0;
          let startHeight = 0;
          
          handle.addEventListener('mousedown', (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            isResizing = true;
            
            const mouseEvent = e as MouseEvent;
            startX = mouseEvent.clientX;
            startY = mouseEvent.clientY;
            
            const rect = panel.getBoundingClientRect();
            startWidth = rect.width;
            startHeight = rect.height;
            
            // Add visual feedback
            (handle as HTMLElement).style.opacity = '1';
            (handle as HTMLElement).style.background = '#1d4ed8';
            document.body.style.cursor = (handle as HTMLElement).style.cursor;
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          });
          
          function handleMouseMove(e: MouseEvent) {
            if (!isResizing) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            if (handle.classList.contains('resize-handle-right') || handle.classList.contains('resize-handle-corner')) {
              const newWidth = Math.max(100, startWidth + deltaX);
              (panel as HTMLElement).style.width = newWidth + 'px';
            }
            
            if (handle.classList.contains('resize-handle-bottom') || handle.classList.contains('resize-handle-corner')) {
              const newHeight = Math.max(80, startHeight + deltaY);
              (panel as HTMLElement).style.height = newHeight + 'px';
            }
          }
          
          function handleMouseUp() {
            isResizing = false;
            document.body.style.cursor = 'auto';
            
            // Reset handle appearance
            (handle as HTMLElement).style.opacity = '0';
            (handle as HTMLElement).style.background = '#3b82f6';
            
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            
            // Trigger content update
            const editor = document.querySelector('.editor-content') as HTMLElement;
            if (editor) {
              const event = new Event('input', { bubbles: true });
              editor.dispatchEvent(event);
            }
          }
        });
      });
    };

    // Initialize resize handles for existing content
    setTimeout(() => {
      (window as any).initializeResizeHandles();
    }, 100);
  }, []);

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

      // Initialize resize handles for new content
      setTimeout(() => {
        (window as any).initializeResizeHandles();
      }, 100);
    };
    
    editor.addEventListener('dragover', handleDragOver);
    editor.addEventListener('dragleave', handleDragLeave);
    editor.addEventListener('drop', handleDrop);
    
    // Initial setup of existing rows
    const observer = new MutationObserver(() => {
      setupDraggableElements();
      // Re-initialize resize handles when content changes
      setTimeout(() => {
        (window as any).initializeResizeHandles();
      }, 100);
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
        onKeyDown={handleKeyDown}
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
      
      {/* Enhanced styles for drag effects and functional resize handles */}
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

          .resize-handle {
            z-index: 100;
            opacity: 0;
            transition: all 0.2s ease;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          }

          .resizable-panel:hover .resize-handle {
            opacity: 0.8;
          }

          .resizable-handle:hover {
            opacity: 1 !important;
            background: #1d4ed8 !important;
            transform: scale(1.1);
          }

          .resizable-block-wrapper {
            position: relative;
            margin: 10px 0;
          }

          .resizable-panel-group {
            position: relative;
          }

          .resizable-panel {
            min-width: 100px;
            min-height: 80px;
            position: relative;
            transition: all 0.1s ease;
          }

          .resizable-panel:hover {
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
          }

          /* Prevent text selection during resize */
          body.resizing {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
          }

          .resizable-panel {
            border: 2px solid transparent;
            transition: border-color 0.2s;
          }
          .resizable-panel:hover {
            border-color: #3b82f6;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
          }
          .resize-handle {
            opacity: 0;
            transition: opacity 0.2s;
          }
          .resizable-panel:hover .resize-handle {
            opacity: 0.8;
          }
          .resize-handle:hover {
            opacity: 1 !important;
            background: #1d4ed8 !important;
            transform: scale(1.1);
          }
          .inline-image-container {
            display: inline-block;
            vertical-align: middle;
            margin: 4px;
            max-width: 200px;
            position: relative;
          }
          .inline-image-container img {
            max-width: 100%;
            max-height: 120px;
            width: auto;
            height: auto;
            object-fit: contain;
            display: block;
            border-radius: 6px;
            cursor: pointer;
            border: 2px solid transparent;
            transition: border-color 0.2s;
          }
          .inline-image-container:hover img {
            border-color: #3b82f6;
          }
          .inline-image-container .resize-handle {
            display: none;
          }
          .inline-image-container:hover .resize-handle {
            display: block;
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  );
};

export default EditorContent;
