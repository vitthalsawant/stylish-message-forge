
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
  Palette 
} from "lucide-react";
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
  onColor: () => void;
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
  activeFormats,
}) => {
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

        <ToolbarButton 
          tooltip="Heading" 
          active={activeFormats.heading !== null} 
          onClick={() => onHeading(1)}
        >
          <Heading size={18} />
        </ToolbarButton>

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

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        <ToolbarButton tooltip="Text Color" onClick={onColor}>
          <Palette size={18} />
        </ToolbarButton>
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
