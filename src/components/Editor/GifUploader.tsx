import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface GifUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (gifUrl: string) => void;
}

const GifUploader: React.FC<GifUploaderProps> = ({ isOpen, onClose, onInsert }) => {
  const [gifUrl, setGifUrl] = useState('');
  const [uploadedGif, setUploadedGif] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGifUrl(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.includes('gif')) {
        toast({
          title: 'Error',
          description: 'Please select a valid GIF file',
          variant: 'destructive',
        });
        return;
      }
      setUploadedGif(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertUrl = () => {
    if (gifUrl.trim() && gifUrl.toLowerCase().endsWith('.gif')) {
      onInsert(gifUrl);
      onClose();
      setGifUrl('');
    } else {
      toast({
        title: 'Error',
        description: 'Please enter a valid GIF URL',
        variant: 'destructive',
      });
    }
  };

  const handleInsertUpload = () => {
    if (previewUrl) {
      onInsert(previewUrl);
      onClose();
      setUploadedGif(null);
      setPreviewUrl(null);
    } else {
      toast({
        title: 'Error',
        description: 'Please select a GIF to upload',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert GIF</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">GIF URL</TabsTrigger>
            <TabsTrigger value="upload">Upload GIF</TabsTrigger>
          </TabsList>
          <TabsContent value="url" className="space-y-4 mt-4">
            <Input
              placeholder="https://example.com/animation.gif"
              value={gifUrl}
              onChange={handleUrlChange}
            />
            {gifUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img
                  src={gifUrl}
                  alt="Preview"
                  className="max-h-[200px] mx-auto object-contain"
                  onError={() =>
                    toast({
                      title: 'Error',
                      description: 'Unable to load GIF from this URL',
                      variant: 'destructive',
                    })
                  }
                />
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleInsertUrl}>Insert GIF</Button>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="space-y-4 mt-4">
            <Input type="file" accept=".gif,image/gif" onChange={handleFileChange} />
            {previewUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-[200px] mx-auto object-contain"
                  style={{ display: 'block', margin: '0 auto' }}
                />
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleInsertUpload} disabled={!previewUrl}>
                Insert GIF
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GifUploader; 