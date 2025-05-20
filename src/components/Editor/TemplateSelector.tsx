
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  content: string;
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  // Sample templates
  const templates: Template[] = [
    {
      id: 'welcome',
      name: 'Welcome Email',
      category: 'newsletter',
      thumbnail: 'https://placehold.co/200x150/9b87f5/ffffff?text=Welcome',
      content: '<h2>Welcome to Our Newsletter!</h2><p>Thank you for subscribing to our newsletter.</p>'
    },
    {
      id: 'promo',
      name: 'Promotional Offer',
      category: 'marketing',
      thumbnail: 'https://placehold.co/200x150/9b87f5/ffffff?text=Promo',
      content: '<h2>Special Offer!</h2><p>Take advantage of our limited-time promotion.</p>'
    },
    {
      id: 'update',
      name: 'Product Update',
      category: 'newsletter',
      thumbnail: 'https://placehold.co/200x150/9b87f5/ffffff?text=Update',
      content: '<h2>New Features Released!</h2><p>Check out our latest product updates.</p>'
    },
    {
      id: 'event',
      name: 'Event Invitation',
      category: 'marketing',
      thumbnail: 'https://placehold.co/200x150/9b87f5/ffffff?text=Event',
      content: '<h2>You\'re Invited!</h2><p>Join us for our upcoming event.</p>'
    },
  ];

  const categories = ['All', ...new Set(templates.map(t => t.category))];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Choose a Template</h3>
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-md overflow-hidden cursor-pointer hover:border-editor-purple transition-colors"
              onClick={() => onSelectTemplate(template)}
            >
              <img 
                src={template.thumbnail} 
                alt={template.name} 
                className="w-full h-auto"
              />
              <div className="p-2 text-center text-sm">
                {template.name}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
