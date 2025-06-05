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
import VideoUploader from "@/components/Editor/VideoUploader";
import GifUploader from '@/components/Editor/GifUploader';
import IconUploader from '@/components/Editor/IconUploader';
import StickerUploader from '@/components/Editor/StickerUploader';
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
  const [showVideoUploader, setShowVideoUploader] = useState(false);
  const [showGifUploader, setShowGifUploader] = useState(false);
  const [showIconUploader, setShowIconUploader] = useState(false);
  const [showStickerUploader, setShowStickerUploader] = useState(false);
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

  const [templateColor, setTemplateColor] = useState('white');

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

  // Image button handler: only open the popup
  const handleImage = () => {
    setShowImageUploader(true);
  };

  // Insert a complete image block with the selected image (not the upload UI)
  const handleInsertImage = (imageUrl: string) => {
    const imageBlockHtml = `
      <div class="draggable-row image-block" style="margin-bottom: 20px; text-align: center; padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;">
        <div class="resizable-block-wrapper">
          <div class="resizable-panel-group" style="height: auto; min-height: 200px;">
            <div class="resizable-panel" style="position: relative; border: 2px solid #3b82f6; border-radius: 8px; width: 100%; max-width: 600px; margin: 0 auto;">
              <img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%; height: auto; display: block; margin: 0 auto; border-radius: 6px; cursor: pointer;" />
              <div contenteditable="true" style="font-style: italic; color: #6b7280; font-size: 14px; margin-top: 10px; text-align: center; position: absolute; bottom: 10px; left: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 5px; border-radius: 4px;">Click to add caption</div>
              <div class="resize-handle resize-handle-bottom" style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 24px; height: 8px; background: #3b82f6; border-radius: 4px; cursor: ns-resize; opacity: 0; transition: opacity 0.2s;"></div>
              <div class="resize-handle resize-handle-right" style="position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 8px; height: 24px; background: #3b82f6; border-radius: 4px; cursor: ew-resize; opacity: 0; transition: opacity 0.2s;"></div>
              <div class="resize-handle resize-handle-corner" style="position: absolute; bottom: -4px; right: -4px; width: 12px; height: 12px; background: #3b82f6; border-radius: 3px; cursor: nwse-resize; opacity: 0; transition: opacity 0.2s;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.execCommand("insertHTML", false, imageBlockHtml);
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

  const handleVideo = () => {
    setShowVideoUploader(true);
  };

  const handleInsertVideoBlock = (videoUrl: string) => {
    const videoBlockHtml = `
      <div class="draggable-row video-block" style="margin-bottom: 20px; text-align: center; padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;">
        <video src="${videoUrl}" controls style="max-width: 100%; max-height: 350px; border-radius: 8px; display: block; margin: 0 auto;"></video>
        <div contenteditable="true" style="color: #374151; font-size: 14px; margin-top: 10px;">Click to add video caption</div>
      </div>
    `;
    document.execCommand('insertHTML', false, videoBlockHtml);
  };

  const handleGif = () => setShowGifUploader(true);
  const handleIcon = () => setShowIconUploader(true);
  const handleSticker = () => setShowStickerUploader(true);

  const handleInsertGif = (gifUrl: string) => {
    const gifBlockHtml = `
      <div class="draggable-row gif-block" style="margin-bottom: 20px; text-align: center; padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;">
        <img src="${gifUrl}" alt="GIF" style="max-width: 200px; max-height: 150px; border-radius: 8px; object-fit: cover; margin: 0 auto; display: block;" />
        <div contenteditable="true" style="color: #374151; font-size: 14px; margin-top: 10px;">Click to add GIF caption</div>
      </div>
    `;
    document.execCommand('insertHTML', false, gifBlockHtml);
  };

  const handleInsertIcon = (iconUrl: string) => {
    const iconBlockHtml = `
      <div class="draggable-row icon-block" style="margin-bottom: 20px; text-align: center; padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;">
        <img src="${iconUrl}" alt="Icon" style="width: 64px; height: 64px; border-radius: 8px; object-fit: contain; margin: 0 auto; display: block;" />
        <div contenteditable="true" style="color: #374151; font-size: 14px; margin-top: 10px;">Click to edit icon label</div>
      </div>
    `;
    document.execCommand('insertHTML', false, iconBlockHtml);
  };

  const handleInsertSticker = (stickerUrl: string) => {
    const stickerBlockHtml = `
      <div class="draggable-row sticker-block" style="margin-bottom: 20px; text-align: center; padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;">
        <img src="${stickerUrl}" alt="Sticker" style="max-height: 150px; border-radius: 12px; object-fit: cover; margin: 0 auto; display: block;" />
        <div contenteditable="true" style="color: #374151; font-size: 14px; margin-top: 10px;">Click to edit sticker caption</div>
      </div>
    `;
    document.execCommand('insertHTML', false, stickerBlockHtml);
  };

  // Content block handler
  const handleInsertContentBlock = (blockType: string) => {
    if (blockType === 'image') {
      setShowImageUploader(true);
      return;
    }
    if (blockType === 'gif') {
      setShowGifUploader(true);
      return;
    }
    if (blockType === 'icons') {
      setShowIconUploader(true);
      return;
    }
    if (blockType === 'sticker') {
      setShowStickerUploader(true);
      return;
    }
    if (blockType === 'video') {
      setShowVideoUploader(true);
      return;
    }
    let html = '';
    
    switch(blockType) {
      case 'title':
        html = '<div class="draggable-row" style="margin-bottom: 20px;"><h2 contenteditable="true" style="font-size: 28px; font-weight: bold; margin: 0; padding: 15px; border: 2px dashed #d1d5db; background-color: #f9fafb; color: #1f2937; text-align: center; border-radius: 8px;" placeholder="Enter your title here...">Your Amazing Title</h2></div>';
        break;
      case 'paragraph':
        html = '<div class="draggable-row" style="margin-bottom: 20px;"><div contenteditable="true" style="padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; min-height: 100px; line-height: 1.6; border-radius: 8px;" placeholder="Start typing your paragraph here..."><p style="margin: 0 0 15px 0;">This is your first paragraph. Click here to start editing and add your content.</p><p style="margin: 0;">You can add multiple paragraphs by pressing Enter. Each paragraph will be properly formatted with good spacing.</p></div></div>';
        break;
      case 'list':
        html = '<div class="draggable-row" style="margin-bottom: 20px;"><div style="padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><ul contenteditable="true" style="margin: 0; padding-left: 20px; line-height: 1.8;"><li style="margin-bottom: 8px;">First list item - click to edit</li><li style="margin-bottom: 8px;">Second list item - add your content</li><li style="margin-bottom: 8px;">Third list item - press Enter for new items</li></ul></div></div>';
        break;
      case 'image-box':
        html = '<div class="draggable-row" style="margin-bottom: 20px; position: relative; min-height: 300px; background-image: url(\'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop\'); background-size: cover; background-position: center; background-repeat: no-repeat; border: 2px dashed #d1d5db; border-radius: 12px; overflow: hidden;"><div contenteditable="true" style="position: relative; z-index: 2; padding: 30px; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); background: rgba(0,0,0,0.4); height: 100%; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 12px;"><h3 style="margin: 0; font-size: 24px; font-weight: bold;">Click here to add your overlay text</h3></div></div>';
        break;
      case 'button':
        html = '<div class="draggable-row button-block" style="text-align: center; margin-bottom: 20px; padding: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><a href="#" contenteditable="true" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; transition: transform 0.2s; cursor: pointer;" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">Click Me - Edit Text & Link</a></div>';
        break;
      case 'table':
        html = '<div class="draggable-row" style="margin-bottom: 20px; padding: 15px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><table contenteditable="true" style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"><thead><tr style="background-color: #f3f4f6;"><th style="border: 1px solid #d1d5db; padding: 12px; font-weight: bold; text-align: left;">Header 1</th><th style="border: 1px solid #d1d5db; padding: 12px; font-weight: bold; text-align: left;">Header 2</th><th style="border: 1px solid #d1d5db; padding: 12px; font-weight: bold; text-align: left;">Header 3</th></tr></thead><tbody><tr><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 1-1</td><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 1-2</td><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 1-3</td></tr><tr style="background-color: #f9fafb;"><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 2-1</td><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 2-2</td><td style="border: 1px solid #d1d5db; padding: 12px;">Cell 2-3</td></tr></tbody></table></div>';
        break;
      case 'divider':
        html = '<div class="draggable-row" style="margin: 30px 0; padding: 10px 0;"><hr style="border: 0; height: 2px; background: linear-gradient(90deg, transparent, #e5e7eb, transparent); margin: 0;" /><div style="text-align: center; margin-top: 10px;"><span contenteditable="true" style="background: #f3f4f6; padding: 5px 15px; border-radius: 20px; font-size: 12px; color: #6b7280;">Section Break</span></div></div>';
        break;
      case 'spacer':
        html = '<div class="draggable-row spacer-block" style="height: 60px; margin-bottom: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 14px; cursor: pointer;" onclick="this.style.height = prompt(\'Enter height in pixels:\', \'60\') + \'px\'">Click to adjust spacing (60px)</div>';
        break;
      case 'social':
        html = '<div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 25px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><div style="margin-bottom: 15px;"><span contenteditable="true" style="font-size: 18px; font-weight: bold; color: #374151;">Follow Us On Social Media!</span></div><div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;"><a href="https://facebook.com" style="display: inline-block; width: 50px; height: 50px; background: #1877f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">📘</a><a href="https://twitter.com" style="display: inline-block; width: 50px; height: 50px; background: #1da1f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">🐦</a><a href="https://instagram.com" style="display: inline-block; width: 50px; height: 50px; background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">📷</a><a href="https://linkedin.com" style="display: inline-block; width: 50px; height: 50px; background: #0077b5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">💼</a></div></div>';
        break;
      case 'html':
        html = '<div class="draggable-row" style="margin-bottom: 20px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><div style="background: #1f2937; color: #10b981; padding: 15px; border-radius: 8px 8px 0 0; font-family: monospace; font-size: 12px;">HTML Code Block</div><div contenteditable="true" style="padding: 20px; font-family: \'Courier New\', monospace; background: #f8fafc; border-radius: 0 0 8px 8px; min-height: 100px; font-size: 14px; line-height: 1.6;">&lt;div style="text-align: center; padding: 20px;"&gt;<br>&nbsp;&nbsp;&lt;h3&gt;Custom HTML Content&lt;/h3&gt;<br>&nbsp;&nbsp;&lt;p&gt;Edit this HTML code as needed&lt;/p&gt;<br>&lt;/div&gt;</div></div>';
        break;
      case 'menu':
        html = '<div class="draggable-row" style="margin-bottom: 20px; padding: 15px; border: 2px dashed #d1d5db; background-color: #f9fafb; border-radius: 8px;"><nav style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"><div contenteditable="true" style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1f2937;">Navigation Menu</div><ul contenteditable="true" style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 25px;"><li><a href="#home" style="color: #3b82f6; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background=\'#eff6ff\'" onmouseout="this.style.background=\'transparent\'">Home</a></li><li><a href="#about" style="color: #3b82f6; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background=\'#eff6ff\'" onmouseout="this.style.background=\'transparent\'">About</a></li><li><a href="#services" style="color: #3b82f6; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background=\'#eff6ff\'" onmouseout="this.style.background=\'transparent\'">Services</a></li><li><a href="#contact" style="color: #3b82f6; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background=\'#eff6ff\'" onmouseout="this.style.background=\'transparent\'">Contact</a></li></ul></nav></div>';
        break;
      default:
        html = `<div class="draggable-row" style="padding: 15px; background-color: #f9fafb; border: 1px dashed #d1d5db; margin-bottom: 20px;"><p>[${blockType} block - click to edit]</p></div>`;
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
    if (newSettings.templateColor) {
      setTemplateColor(newSettings.templateColor);
    }
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
                        onVideo={handleVideo}
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
                          className={`preview-container p-6 bg-white border rounded-lg template-${templateColor}`}
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
      
      <VideoUploader
        isOpen={showVideoUploader}
        onClose={() => setShowVideoUploader(false)}
        onInsert={handleInsertVideoBlock}
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
            className={`preview-container p-6 bg-white border rounded-lg template-${templateColor}`}
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
      <GifUploader
        isOpen={showGifUploader}
        onClose={() => setShowGifUploader(false)}
        onInsert={handleInsertGif}
      />
      <IconUploader
        isOpen={showIconUploader}
        onClose={() => setShowIconUploader(false)}
        onInsert={handleInsertIcon}
      />
      <StickerUploader
        isOpen={showStickerUploader}
        onClose={() => setShowStickerUploader(false)}
        onInsert={handleInsertSticker}
      />
    </div>
  );
};

export default Editor;
