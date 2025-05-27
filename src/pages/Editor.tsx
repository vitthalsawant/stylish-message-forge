import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Editor/Header";
import EditorToolbar from "@/components/Editor/EditorToolbar";
import EditorContent from "@/components/Editor/EditorContent";
import Footer from "@/components/Editor/Footer";
import ImageUploader from "@/components/Editor/ImageUploader";
import LinkEditor from "@/components/Editor/LinkEditor";
import BackgroundImageSelector from "@/components/Editor/BackgroundImageSelector";
import TemplateSelector from "@/components/Editor/TemplateSelector";
import ContentBlocks from "@/components/Editor/ContentBlocks";
import SettingsPanel from "@/components/Editor/SettingsPanel";
import LayoutSelector from "@/components/Editor/LayoutSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Copy, Download } from "lucide-react";

const Editor = () => {
  // Core state
  const [content, setContent] = useState("<p>Start typing your message here...</p>");
  const [footerContent, setFooterContent] = useState("<p>Company Name | Address | <a href='mailto:contact@example.com'>contact@example.com</a></p>");
  const [subject, setSubject] = useState("");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  
  // UI state
  const [activeTab, setActiveTab] = useState("edit");
  const [sidePanel, setSidePanel] = useState<"content" | "rows" | "settings">("content");
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Settings
  const [emailSettings, setEmailSettings] = useState({
    contentWidth: 650,
    alignment: 'center',
    backgroundColor: '#ffffff',
    contentBackgroundColor: 'transparent',
  });
  
  // Format tracking
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    heading: null as number | null,
    align: "left",
  });

  // Check current formatting
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

  // Text formatting handlers
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

  // Link & Image handlers
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
    document.execCommand("insertHTML", false, `<img src="${imageUrl}" alt="Inserted image" style="max-width: 100%;" />`);
  };

  const handleBackgroundImage = () => {
    setShowBackgroundSelector(true);
  };

  const handleSetBackgroundImage = (imageUrl: string) => {
    setBackgroundImage(imageUrl);
    toast({
      title: imageUrl ? "Background Set" : "Background Removed",
      description: imageUrl ? "Background image has been applied to your template." : "Background image has been removed.",
    });
  };

  const handleColor = (color: string) => {
    document.execCommand("foreColor", false, color);
    // Force update to ensure the color change is reflected
    if (document.activeElement) {
      const event = new Event('input', { bubbles: true });
      document.activeElement.dispatchEvent(event);
    }
  };

  // Content block handler
  const handleInsertContentBlock = (blockType: string) => {
    let html = '';
    
    switch(blockType) {
      case 'title':
        html = '<h2>Your Title Here</h2>';
        break;
      case 'paragraph':
        html = '<p>Your paragraph text here. Click to edit.</p>';
        break;
      case 'list':
        html = '<ul><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul>';
        break;
      case 'button':
        html = '<div style="text-align: center; margin: 15px 0;"><a href="#" style="background-color: #8b5cf6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Click Me</a></div>';
        break;
      case 'divider':
        html = '<hr style="border: 0; height: 1px; background-color: #e5e7eb; margin: 20px 0;" />';
        break;
      case 'spacer':
        html = '<div style="height: 30px;"></div>';
        break;
      case 'image':
        setShowImageUploader(true);
        return;
      default:
        html = `<p>[${blockType} block - click to edit]</p>`;
    }
    
    document.execCommand("insertHTML", false, html);
    toast({
      title: "Block Added",
      description: `${blockType} block has been added to your email.`,
    });
  };

  // Layout handler
  const handleSelectLayout = (layoutId: string) => {
    let layoutHtml = '';
    
    switch(layoutId) {
      case 'single-column':
        layoutHtml = '<div style="padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-bottom: 20px;"><p>Single column content area. Click to edit.</p></div>';
        break;
      case 'two-column-left':
        layoutHtml = '<div style="display: flex; margin-bottom: 20px;"><div style="width: 30%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;"><p>Left column</p></div><div style="width: 70%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;"><p>Right column</p></div></div>';
        break;
      case 'two-column-right':
        layoutHtml = '<div style="display: flex; margin-bottom: 20px;"><div style="width: 70%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;"><p>Left column</p></div><div style="width: 30%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;"><p>Right column</p></div></div>';
        break;
      case 'two-column-equal':
        layoutHtml = '<div style="display: flex; margin-bottom: 20px;"><div style="width: 50%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;"><p>Left column</p></div><div style="width: 50%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;"><p>Right column</p></div></div>';
        break;
      case 'three-column':
        layoutHtml = '<div style="display: flex; margin-bottom: 20px;"><div style="width: 33.33%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;"><p>Left column</p></div><div style="width: 33.33%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-right: 10px;"><p>Middle column</p></div><div style="width: 33.33%; padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db;"><p>Right column</p></div></div>';
        break;
      default:
        layoutHtml = '<div style="padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-bottom: 20px;"><p>Content area. Click to edit.</p></div>';
    }
    
    document.execCommand("insertHTML", false, layoutHtml);
    toast({
      title: "Layout Added",
      description: `${layoutId} layout has been added to your email.`,
    });
  };

  // Settings handler
  const handleSettingsChange = (newSettings: any) => {
    setEmailSettings({
      ...emailSettings,
      ...newSettings
    });
    
    // Apply settings to preview if needed
    if (previewRef.current) {
      previewRef.current.style.width = `${newSettings.contentWidth}px`;
      previewRef.current.style.margin = newSettings.alignment === 'center' ? '0 auto' : '0';
      previewRef.current.style.backgroundColor = 
        newSettings.contentBackgroundColor === 'transparent' ? 'transparent' : newSettings.contentBackgroundColor;
    }
  };

  // Template selection handler
  const handleSelectTemplate = (template: any) => {
    setContent(template.content);
    setShowTemplateSelector(false);
    toast({
      title: "Template Selected",
      description: `Template "${template.name}" has been loaded.`,
    });
  };

  // Copy content handler
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

  // Toggle settings panel
  const handleToggleSettings = () => {
    setSidePanel("settings");
  };

  // Export handler
  const handleExport = () => {
    const backgroundStyle = backgroundImage ? 
      `background-image: url('${backgroundImage}'); background-size: cover; background-position: center; background-repeat: no-repeat;` : '';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject || "Email Template"}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: ${emailSettings.backgroundColor};">
        <div style="max-width: ${emailSettings.contentWidth}px; margin: ${emailSettings.alignment === 'center' ? '0 auto' : '0'}; background-color: ${emailSettings.contentBackgroundColor}; padding: 20px; ${backgroundStyle}">
          <div>${content}</div>
          <hr style="margin: 20px 0; border: 0; height: 1px; background-color: #e5e7eb;" />
          <div>${footerContent}</div>
        </div>
      </body>
      </html>
    `;
    
    // Create a Blob from the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject || 'email-template'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Your email template has been exported as an HTML file.",
    });
  };

  // Helper to get selected text
  const handleGetSelectedText = () => {
    if (selection && !selection.isCollapsed) {
      return selection.toString();
    }
    return "";
  };

  const getTemplateStyle = () => {
    const backgroundStyle = backgroundImage ? 
      `background-image: url('${backgroundImage}'); background-size: cover; background-position: center; background-repeat: no-repeat;` : '';
    
    return {
      backgroundColor: emailSettings.contentBackgroundColor === 'transparent' ? 'transparent' : emailSettings.contentBackgroundColor,
      backgroundImage: backgroundImage ? `url('${backgroundImage}')` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        onPreview={() => setShowPreview(true)} 
        onCopy={handleCopyContent}
        onExport={handleExport}
        onToggleSettings={handleToggleSettings}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Side Panel */}
        <div className="w-64 border-r border-border bg-white overflow-auto">
          <div className="border-b border-border">
            <div className="flex">
              <button 
                className={`flex-1 py-3 font-medium text-sm ${sidePanel === 'content' ? 'text-editor-purple border-b-2 border-editor-purple' : 'text-gray-500'}`}
                onClick={() => setSidePanel('content')}
              >
                CONTENT
              </button>
              <button 
                className={`flex-1 py-3 font-medium text-sm ${sidePanel === 'rows' ? 'text-editor-purple border-b-2 border-editor-purple' : 'text-gray-500'}`}
                onClick={() => setSidePanel('rows')}
              >
                ROWS
              </button>
              <button 
                className={`flex-1 py-3 font-medium text-sm ${sidePanel === 'settings' ? 'text-editor-purple border-b-2 border-editor-purple' : 'text-gray-500'}`}
                onClick={() => setSidePanel('settings')}
              >
                SETTINGS
              </button>
            </div>
          </div>
          
          {sidePanel === 'content' && (
            <ContentBlocks onInsertContent={handleInsertContentBlock} />
          )}
          
          {sidePanel === 'rows' && (
            <LayoutSelector onSelectLayout={handleSelectLayout} />
          )}
          
          {sidePanel === 'settings' && (
            <SettingsPanel onSettingsChange={handleSettingsChange} />
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {showTemplateSelector ? (
            <TemplateSelector onSelectTemplate={handleSelectTemplate} />
          ) : (
            <Card>
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

                    <div className="bg-white rounded-md shadow-sm" style={getTemplateStyle()}>
                      <EditorToolbar
                        onBold={handleBold}
                        onItalic={handleItalic}
                        onUnderline={handleUnderline}
                        onHeading={handleHeading}
                        onAlign={handleAlign}
                        onLink={handleLink}
                        onImage={handleImage}
                        onBackgroundImage={handleBackgroundImage}
                        onColor={handleColor}
                        activeFormats={activeFormats}
                      />
                      
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
                        <div 
                          className="preview-container border rounded-lg p-6 bg-white"
                          style={{
                            maxWidth: `${emailSettings.contentWidth}px`,
                            margin: emailSettings.alignment === 'center' ? '0 auto' : '0',
                            ...getTemplateStyle()
                          }}
                        >
                          <div className="preview-subject mb-4">
                            <h3 className="text-lg font-medium">Subject: {subject}</h3>
                          </div>
                          <div 
                            className="content-preview mb-8"
                            dangerouslySetInnerHTML={{ __html: content }}
                            style={{ color: 'inherit' }}
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

      <BackgroundImageSelector
        isOpen={showBackgroundSelector}
        onClose={() => setShowBackgroundSelector(false)}
        onSelect={handleSetBackgroundImage}
      />
      
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Message Preview</DialogTitle>
          </DialogHeader>
          <div 
            ref={previewRef}
            className="preview-container p-6 bg-white border rounded-lg"
            style={{
              maxWidth: `${emailSettings.contentWidth}px`,
              margin: emailSettings.alignment === 'center' ? '0 auto' : '0',
              ...getTemplateStyle()
            }}
          >
            <div className="preview-subject mb-4">
              <h3 className="text-lg font-medium">Subject: {subject}</h3>
            </div>
            <div
              className="content-preview mb-8"
              dangerouslySetInnerHTML={{ __html: content }}
              style={{ color: 'inherit' }}
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
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Editor;
