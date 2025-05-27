
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface BackgroundImageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}

const BackgroundImageSelector: React.FC<BackgroundImageSelectorProps> = ({ 
  isOpen, 
  onClose, 
  onSelect 
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const placeholderImages = [
    { 
      id: 'photo-1649972904349-6e44c42644a7',
      name: 'Professional Workspace',
      url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop'
    },
    { 
      id: 'photo-1488590528505-98d2b5aba04b',
      name: 'Tech Setup',
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop'
    },
    { 
      id: 'photo-1518770660439-4636190af475',
      name: 'Abstract Tech',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
    },
    { 
      id: 'photo-1461749280684-dccba630e2f6',
      name: 'Programming',
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop'
    }
  ];

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImage(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectUrl = () => {
    if (imageUrl.trim()) {
      onSelect(imageUrl);
      onClose();
      setImageUrl('');
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid image URL",
        variant: "destructive",
      });
    }
  };

  const handleSelectUpload = () => {
    if (previewUrl) {
      onSelect(previewUrl);
      onClose();
      setUploadedImage(null);
      setPreviewUrl(null);
    } else {
      toast({
        title: "Error",
        description: "Please select an image to upload",
        variant: "destructive",
      });
    }
  };

  const handleSelectPlaceholder = (url: string) => {
    onSelect(url);
    onClose();
  };

  const handleRemoveBackground = () => {
    onSelect('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Set Background Image</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="placeholder" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="placeholder">Templates</TabsTrigger>
            <TabsTrigger value="url">Image URL</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="placeholder" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              {placeholderImages.map((img) => (
                <div key={img.id} className="relative group cursor-pointer" onClick={() => handleSelectPlaceholder(img.url)}>
                  <img 
                    src={img.url} 
                    alt={img.name}
                    className="w-full h-24 object-cover rounded-md border hover:border-purple-500 transition-colors"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-md flex items-center justify-center">
                    <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity text-center px-2">
                      {img.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={handleRemoveBackground} className="w-full">
              Remove Background
            </Button>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4 mt-4">
            <Input
              placeholder="https://example.com/background.jpg"
              value={imageUrl}
              onChange={handleUrlChange}
            />
            
            {imageUrl && (
              <div className="border rounded-md p-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded"
                  onError={() => toast({
                    title: "Error",
                    description: "Unable to load image from this URL",
                    variant: "destructive",
                  })} 
                />
              </div>
            )}
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleRemoveBackground}>
                Remove Background
              </Button>
              <Button onClick={handleSelectUrl}>Set Background</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4 mt-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            
            {previewUrl && (
              <div className="border rounded-md p-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded" 
                />
              </div>
            )}
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleRemoveBackground}>
                Remove Background
              </Button>
              <Button onClick={handleSelectUpload}>Set Background</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BackgroundImageSelector;
