
import React, { useState, useEffect } from "react";
import EditorToolbar from "@/components/Editor/EditorToolbar";
import EditorContent from "@/components/Editor/EditorContent";
import ImageUploader from "@/components/Editor/ImageUploader";
import LinkEditor from "@/components/Editor/LinkEditor";
import Footer from "@/components/Editor/Footer";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [content, setContent] = useState("<p>Start typing your message here...</p>");
  const [footerContent, setFooterContent] = useState("<p>Company Name | Address | <a href='mailto:contact@example.com'>contact@example.com</a></p>");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    heading: null as number | null,
    align: "left",
  });

  const checkFormatting = () => {
    if (!selection) return;
    
    const isBold = document.queryCommandState("bold");
    const isItalic = document.queryCommandState("italic");
    const isUnderline = document.queryCommandState("underline");
    
    // Check for heading (simplified)
    let heading = null;
    const parentElement = selection.anchorNode?.parentElement;
    if (parentElement) {
      const tagName = parentElement.tagName.toLowerCase();
      if (tagName === 'h1') heading = 1;
      else if (tagName === 'h2') heading = 2;
      else if (tagName === 'h3') heading = 3;
    }
    
    // Check alignment
    let align = "left";
    if (parentElement) {
      const style = window.getComputedStyle(parentElement);
      align = style.textAlign;
    }
    
    setActiveFormats({
      bold: isBold,
      italic: isItalic,
      underline: isUnderline,
      heading,
      align,
    });
  };
  
  useEffect(() => {
    if (selection) {
      checkFormatting();
    }
  }, [selection]);

  const handleBold = () => {
    document.execCommand("bold", false);
    checkFormatting();
  };

  const handleItalic = () => {
    document.execCommand("italic", false);
    checkFormatting();
  };

  const handleUnderline = () => {
    document.execCommand("underline", false);
    checkFormatting();
  };

  const handleHeading = (level: number) => {
    // Toggle between heading and paragraph
    if (activeFormats.heading === level) {
      document.execCommand("formatBlock", false, "<p>");
    } else {
      document.execCommand("formatBlock", false, `<h${level}>`);
    }
    checkFormatting();
  };

  const handleAlign = (align: string) => {
    document.execCommand(`justify${align.charAt(0).toUpperCase() + align.slice(1)}`, false);
    checkFormatting();
  };

  const handleLink = () => {
    let selectedText = "";
    if (selection && !selection.isCollapsed) {
      selectedText = selection.toString();
    }
    setShowLinkEditor(true);
  };

  const handleInsertLink = (url: string, text: string) => {
    document.execCommand("insertHTML", false, `<a href="${url}" target="_blank">${text}</a>`);
  };

  const handleImage = () => {
    setShowImageUploader(true);
  };

  const handleInsertImage = (imageUrl: string) => {
    document.execCommand("insertHTML", false, `<img src="${imageUrl}" alt="Inserted image" />`);
  };

  const colorOptions = [
    { name: "Red", value: "#ef4444" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Green", value: "#10b981" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#000000" },
  ];

  const handleColor = (color: string) => {
    document.execCommand("foreColor", false, color);
  };

  const handleSend = () => {
    toast({
      title: "Message Ready",
      description: "Your message has been prepared and is ready to send!",
    });
  };

  const handleGetSelectedText = () => {
    if (selection && !selection.isCollapsed) {
      return selection.toString();
    }
    return "";
  };

  return (
    <div className="container py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-editor-purple">
            Email/Text Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Subject</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter subject"
            />
          </div>

          <div className="bg-white rounded-md shadow-sm">
            <EditorToolbar
              onBold={handleBold}
              onItalic={handleItalic}
              onUnderline={handleUnderline}
              onHeading={handleHeading}
              onAlign={handleAlign}
              onLink={handleLink}
              onImage={handleImage}
              onColor={() => {}} // Handled by popover
              activeFormats={activeFormats}
            />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 absolute right-24 top-[135px] z-10"
                >
                  <span className="sr-only">Color picker</span>
                  <span className="h-4 w-4 rounded-full bg-editor-purple" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <div className="flex flex-wrap gap-2 max-w-[220px]">
                  {colorOptions.map((color) => (
                    <div
                      key={color.value}
                      className="h-8 w-8 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleColor(color.value)}
                      title={color.name}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <EditorContent
              content={content}
              onChange={setContent}
              onSelectionChange={setSelection}
            />
          </div>

          <Footer content={footerContent} onChange={setFooterContent} />

          <div className="mt-6 flex justify-end">
            <Button 
              className="bg-editor-purple hover:bg-editor-dark-purple" 
              onClick={handleSend}
            >
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ImageUploader
        isOpen={showImageUploader}
        onClose={() => setShowImageUploader(false)}
        onInsert={handleInsertImage}
      />
      
      <LinkEditor
        isOpen={showLinkEditor}
        onClose={() => setShowLinkEditor(false)}
        onInsert={handleInsertLink}
        initialText={handleGetSelectedText()}
      />
    </div>
  );
};

export default Index;
