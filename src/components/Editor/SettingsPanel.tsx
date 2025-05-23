
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface SettingsPanelProps {
  onSettingsChange: (settings: any) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    contentWidth: 650,
    alignment: 'center',
    backgroundColor: '#ffffff',
    contentBackgroundColor: 'transparent',
    backgroundImage: false,
    defaultFont: 'Inter',
    linkColor: '#3b82f6',
    language: 'en'
  });

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="bg-gray-100 p-3 rounded-md">
        <h3 className="font-medium text-sm mb-3 text-gray-700">GENERAL OPTIONS</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Content area width</Label>
            <span className="text-sm text-gray-500">{settings.contentWidth}px</span>
          </div>
          <Slider 
            value={[settings.contentWidth]} 
            min={400} 
            max={900} 
            step={10}
            onValueChange={(value) => handleSettingChange('contentWidth', value[0])} 
          />
        </div>
        
        <div className="space-y-2">
          <Label>Content area alignment</Label>
          <div className="flex gap-2">
            <Button 
              variant={settings.alignment === 'left' ? 'default' : 'outline'}
              className={settings.alignment === 'left' ? 'bg-editor-purple hover:bg-editor-dark-purple' : ''}
              onClick={() => handleSettingChange('alignment', 'left')}
            >
              LEFT
            </Button>
            <Button 
              variant={settings.alignment === 'center' ? 'default' : 'outline'}
              className={settings.alignment === 'center' ? 'bg-editor-purple hover:bg-editor-dark-purple' : ''}
              onClick={() => handleSettingChange('alignment', 'center')}
            >
              CENTER
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Background color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={settings.backgroundColor}
              className="w-12 h-10 p-1 cursor-pointer"
              onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
            />
            <Input 
              type="text" 
              value={settings.backgroundColor}
              onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Content area background color</Label>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border flex items-center justify-center">
              <input 
                type="checkbox" 
                checked={settings.contentBackgroundColor === 'transparent'} 
                onChange={() => {
                  handleSettingChange(
                    'contentBackgroundColor', 
                    settings.contentBackgroundColor === 'transparent' ? '#ffffff' : 'transparent'
                  );
                }}
                className="w-4 h-4"
              />
            </div>
            <span className="text-sm">transparent</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Background image</Label>
          <Switch 
            checked={settings.backgroundImage}
            onCheckedChange={(checked) => handleSettingChange('backgroundImage', checked)}
          />
        </div>

        <div className="space-y-2">
          <Label>Default font</Label>
          <Select 
            value={settings.defaultFont} 
            onValueChange={(value) => handleSettingChange('defaultFont', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Montserrat">Montserrat</SelectItem>
              <SelectItem value="Open Sans">Open Sans</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
              <SelectItem value="Lato">Lato</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Link color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={settings.linkColor}
              className="w-12 h-10 p-1 cursor-pointer"
              onChange={(e) => handleSettingChange('linkColor', e.target.value)}
            />
            <Input 
              type="text" 
              value={settings.linkColor}
              onChange={(e) => handleSettingChange('linkColor', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded-md mt-8">
        <h3 className="font-medium text-sm mb-3 text-gray-700">OPTIONAL PROPERTIES</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Language</Label>
          <Select 
            value={settings.language} 
            onValueChange={(value) => handleSettingChange('language', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="it">Italian</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
