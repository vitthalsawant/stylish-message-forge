import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface VideoUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (videoUrl: string) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ isOpen, onClose, onInsert }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedVideo(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertUrl = () => {
    if (videoUrl.trim()) {
      onInsert(videoUrl);
      onClose();
      setVideoUrl('');
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid video URL",
        variant: "destructive",
      });
    }
  };

  const handleInsertUpload = () => {
    if (previewUrl) {
      onInsert(previewUrl);
      onClose();
      setUploadedVideo(null);
      setPreviewUrl(null);
    } else {
      toast({
        title: "Error",
        description: "Please select a video to upload",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Video</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">Video URL</TabsTrigger>
            <TabsTrigger value="upload">Upload Video</TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="space-y-4 mt-4">
            <Input
              placeholder="https://example.com/video.mp4"
              value={videoUrl}
              onChange={handleUrlChange}
            />
            
            {videoUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <video 
                  src={videoUrl} 
                  controls 
                  className="max-h-[200px] mx-auto object-contain"
                  onError={() => toast({
                    title: "Error",
                    description: "Unable to load video from this URL",
                    variant: "destructive",
                  })} 
                />
              </div>
            )}
            
            <div className="flex justify-end">
              <Button onClick={handleInsertUrl}>Insert Video</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4 mt-4">
            <Input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
            />
            
            {previewUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <video 
                  src={previewUrl} 
                  controls 
                  className="max-h-[200px] mx-auto object-contain" 
                />
              </div>
            )}
            
            <div className="flex justify-end">
              <Button onClick={handleInsertUpload}>Insert Video</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default VideoUploader; 