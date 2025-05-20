
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ isOpen, onClose, onInsert }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertUrl = () => {
    if (imageUrl.trim()) {
      onInsert(imageUrl);
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

  const handleInsertUpload = () => {
    if (previewUrl) {
      onInsert(previewUrl);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">Image URL</TabsTrigger>
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="space-y-4 mt-4">
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={handleUrlChange}
            />
            
            {imageUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="max-h-[200px] mx-auto object-contain"
                  onError={() => toast({
                    title: "Error",
                    description: "Unable to load image from this URL",
                    variant: "destructive",
                  })} 
                />
              </div>
            )}
            
            <div className="flex justify-end">
              <Button onClick={handleInsertUrl}>Insert Image</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4 mt-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            
            {previewUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-[200px] mx-auto object-contain" 
                />
              </div>
            )}
            
            <div className="flex justify-end">
              <Button onClick={handleInsertUpload}>Insert Image</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;
