
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Underline, 
  Heading, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Link, 
  ImagePlus, 
  Palette,
  Image
} from "lucide-react";
import { 
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarSeparator, 
  MenubarTrigger 
} from "@/components/ui/menubar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface EditorToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onHeading: (level: number) => void;
  onAlign: (align: string) => void;
  onLink: () => void;
  onImage: () => void;
  onColor: (color: string) => void;
  onBackgroundImage?: () => void;
  activeFormats: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    heading: number | null;
    align: string;
  };
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onBold,
  onItalic,
  onUnderline,
  onHeading,
  onAlign,
  onLink,
  onImage,
  onColor,
  onBackgroundImage,
  activeFormats,
}) => {
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

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-1 p-2 border rounded-t-md bg-white shadow-sm">
        <ToolbarButton 
          tooltip="Bold" 
          active={activeFormats.bold} 
          onClick={onBold}
        >
          <Bold size={18} />
        </ToolbarButton>

        <ToolbarButton 
          tooltip="Italic" 
          active={activeFormats.italic} 
          onClick={onItalic}
        >
          <Italic size={18} />
        </ToolbarButton>

        <ToolbarButton 
          tooltip="Underline" 
          active={activeFormats.underline} 
          onClick={onUnderline}
        >
          <Underline size={18} />
        </ToolbarButton>

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        <Menubar className="border-none p-0 h-auto bg-transparent">
          <MenubarMenu>
            <MenubarTrigger className={cn(
              "p-0 h-8 w-8 flex items-center justify-center", 
              activeFormats.heading !== null && "bg-editor-soft-purple text-editor-dark-purple"
            )}>
              <Heading size={18} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => onHeading(1)}>Heading 1</MenubarItem>
              <MenubarItem onClick={() => onHeading(2)}>Heading 2</MenubarItem>
              <MenubarItem onClick={() => onHeading(3)}>Heading 3</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => document.execCommand("formatBlock", false, "<p>")}>
                Normal Text
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        <ToolbarButton 
          tooltip="Align Left" 
          active={activeFormats.align === "left"} 
          onClick={() => onAlign("left")}
        >
          <AlignLeft size={18} />
        </ToolbarButton>

        <ToolbarButton 
          tooltip="Align Center" 
          active={activeFormats.align === "center"} 
          onClick={() => onAlign("center")}
        >
          <AlignCenter size={18} />
        </ToolbarButton>

        <ToolbarButton 
          tooltip="Align Right" 
          active={activeFormats.align === "right"} 
          onClick={() => onAlign("right")}
        >
          <AlignRight size={18} />
        </ToolbarButton>

        <ToolbarButton 
          tooltip="Justify" 
          active={activeFormats.align === "justify"} 
          onClick={() => onAlign("justify")}
        >
          <AlignJustify size={18} />
        </ToolbarButton>

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        <ToolbarButton tooltip="Insert Link" onClick={onLink}>
          <Link size={18} />
        </ToolbarButton>

        <ToolbarButton tooltip="Insert Image" onClick={onImage}>
          <ImagePlus size={18} />
        </ToolbarButton>

        {onBackgroundImage && (
          <ToolbarButton tooltip="Set Background Image" onClick={onBackgroundImage}>
            <Image size={18} />
          </ToolbarButton>
        )}

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        <Menubar className="border-none p-0 h-auto bg-transparent">
          <MenubarMenu>
            <MenubarTrigger className="p-0 h-8 w-8 flex items-center justify-center">
              <Palette size={18} />
            </MenubarTrigger>
            <MenubarContent>
              <div className="grid grid-cols-3 gap-1 p-1">
                {colorOptions.map((color) => (
                  <div
                    key={color.value}
                    className="h-8 w-8 rounded-full cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
                    style={{ backgroundColor: color.value }}
                    onClick={() => onColor(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </TooltipProvider>
  );
};

interface ToolbarButtonProps {
  tooltip: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  tooltip, 
  active = false, 
  onClick, 
  children 
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0", 
            active && "bg-editor-soft-purple text-editor-dark-purple"
          )}
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default EditorToolbar;
