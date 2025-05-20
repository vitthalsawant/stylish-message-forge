
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import EditorToolbar from "@/components/Editor/EditorToolbar";
import EditorContent from "@/components/Editor/EditorContent";
import ImageUploader from "@/components/Editor/ImageUploader";
import LinkEditor from "@/components/Editor/LinkEditor";
import Footer from "@/components/Editor/Footer";
import Header from "@/components/Editor/Header";
import TemplateSelector from "@/components/Editor/TemplateSelector";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Editor = () => {
  const [content, setContent] = useState("<p>Start typing your message here...</p>");
  const [footerContent, setFooterContent] = useState("<p>Company Name | Address | <a href='mailto:contact@example.com'>contact@example.com</a></p>");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");
  const [subject, setSubject] = useState("");
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  
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

  const handleCopyContent = () => {
    const fullContent = `${content}\n\n${footerContent}`;
    navigator.clipboard.writeText(fullContent)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "The message content has been copied successfully!",
        });
      })
      .catch((err) => {
        toast({
          title: "Copy failed",
          description: "Failed to copy content to clipboard.",
          variant: "destructive"
        });
        console.error('Copy failed:', err);
      });
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleSelectTemplate = (template: any) => {
    setContent(template.content);
    setShowTemplateSelector(false);
    toast({
      title: "Template Selected",
      description: `Template "${template.name}" has been loaded.`,
    });
  };

  const handleNewTemplate = () => {
    setShowTemplateSelector(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onSend={handleSend} />
      
      <div className="container py-6 flex-grow">
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            className="mr-2"
            onClick={handleNewTemplate}
          >
            Change Template
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 mr-2"
            onClick={handleCopyContent}
          >
            <Copy size={16} /> Copy Content
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handlePreview}
          >
            <Eye size={16} /> Preview
          </Button>
        </div>

        {showTemplateSelector ? (
          <TemplateSelector onSelectTemplate={handleSelectTemplate} />
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-editor-purple">
                Email/Text Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="space-y-4">
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium">Subject</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Enter subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
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
                      onColor={handleColor}
                      activeFormats={activeFormats}
                    />
                    
                    <Popover>
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
                </TabsContent>
                
                <TabsContent value="preview">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="preview-container border rounded-lg p-6 bg-white">
                        <div className="preview-subject mb-4">
                          <h3 className="text-lg font-medium">Subject: {subject}</h3>
                        </div>
                        <div 
                          className="content-preview mb-8"
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                        <hr className="my-6" />
                        <div 
                          className="footer-preview text-sm text-gray-600"
                          dangerouslySetInnerHTML={{ __html: footerContent }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>

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
      
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Message Preview</DialogTitle>
          </DialogHeader>
          <div className="preview-container p-6 bg-white border rounded-lg">
            <div className="preview-subject mb-4">
              <h3 className="text-lg font-medium">Subject: {subject}</h3>
            </div>
            <div
              ref={previewRef}
              className="content-preview mb-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <hr className="my-6" />
            <div
              className="footer-preview text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: footerContent }}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>Close</Button>
            <Button onClick={handleCopyContent}>
              <Copy className="mr-2 h-4 w-4" /> Copy Content
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Editor;
