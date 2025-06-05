import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface IconUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (iconUrl: string) => void;
}

const IconUploader: React.FC<IconUploaderProps> = ({ isOpen, onClose, onInsert }) => {
  const [iconUrl, setIconUrl] = useState('');
  const [uploadedIcon, setUploadedIcon] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIconUrl(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedIcon(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertUrl = () => {
    if (iconUrl.trim()) {
      onInsert(iconUrl);
      onClose();
      setIconUrl('');
    } else {
      toast({
        title: 'Error',
        description: 'Please enter a valid icon URL',
        variant: 'destructive',
      });
    }
  };

  const handleInsertUpload = () => {
    if (previewUrl) {
      onInsert(previewUrl);
      onClose();
      setUploadedIcon(null);
      setPreviewUrl(null);
    } else {
      toast({
        title: 'Error',
        description: 'Please select an icon to upload',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Icon</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">Icon URL</TabsTrigger>
            <TabsTrigger value="upload">Upload Icon</TabsTrigger>
          </TabsList>
          <TabsContent value="url" className="space-y-4 mt-4">
            <Input
              placeholder="https://example.com/icon.svg"
              value={iconUrl}
              onChange={handleUrlChange}
            />
            {iconUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img
                  src={iconUrl}
                  alt="Preview"
                  className="max-h-[64px] mx-auto object-contain"
                  onError={() =>
                    toast({
                      title: 'Error',
                      description: 'Unable to load icon from this URL',
                      variant: 'destructive',
                    })
                  }
                />
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleInsertUrl}>Insert Icon</Button>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="space-y-4 mt-4">
            <Input type="file" accept="image/*,.svg" onChange={handleFileChange} />
            {previewUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-[64px] mx-auto object-contain"
                  style={{ display: 'block', margin: '0 auto' }}
                />
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleInsertUpload} disabled={!previewUrl}>
                Insert Icon
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default IconUploader; 