import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface StickerUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (stickerUrl: string) => void;
}

const StickerUploader: React.FC<StickerUploaderProps> = ({ isOpen, onClose, onInsert }) => {
  const [stickerUrl, setStickerUrl] = useState('');
  const [uploadedSticker, setUploadedSticker] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStickerUrl(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedSticker(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertUrl = () => {
    if (stickerUrl.trim()) {
      onInsert(stickerUrl);
      onClose();
      setStickerUrl('');
    } else {
      toast({
        title: 'Error',
        description: 'Please enter a valid sticker URL',
        variant: 'destructive',
      });
    }
  };

  const handleInsertUpload = () => {
    if (previewUrl) {
      onInsert(previewUrl);
      onClose();
      setUploadedSticker(null);
      setPreviewUrl(null);
    } else {
      toast({
        title: 'Error',
        description: 'Please select a sticker to upload',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Sticker</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">Sticker URL</TabsTrigger>
            <TabsTrigger value="upload">Upload Sticker</TabsTrigger>
          </TabsList>
          <TabsContent value="url" className="space-y-4 mt-4">
            <Input
              placeholder="https://example.com/sticker.png"
              value={stickerUrl}
              onChange={handleUrlChange}
            />
            {stickerUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img
                  src={stickerUrl}
                  alt="Preview"
                  className="max-h-[150px] mx-auto object-contain"
                  onError={() =>
                    toast({
                      title: 'Error',
                      description: 'Unable to load sticker from this URL',
                      variant: 'destructive',
                    })
                  }
                />
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleInsertUrl}>Insert Sticker</Button>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="space-y-4 mt-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-[150px] mx-auto object-contain"
                  style={{ display: 'block', margin: '0 auto' }}
                />
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleInsertUpload} disabled={!previewUrl}>
                Insert Sticker
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StickerUploader; 