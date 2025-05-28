
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
  // Enhanced templates with aesthetic designs and backgrounds
  const templates: Template[] = [
    {
      id: 'welcome',
      name: 'Welcome Email',
      category: 'newsletter',
      thumbnail: 'https://placehold.co/200x150/9b87f5/ffffff?text=Welcome',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 12px;">
          <h1 contenteditable="true" style="color: white; font-size: 32px; font-weight: bold; margin: 0 0 20px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Welcome to Our Community!</h1>
          <p contenteditable="true" style="color: white; font-size: 18px; margin: 0; opacity: 0.9;">Thank you for joining us. We're excited to have you on board!</p>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 30px; background-color: #f8f9fa; border-radius: 8px;">
          <h2 contenteditable="true" style="color: #333; font-size: 24px; margin: 0 0 15px 0;">What's Next?</h2>
          <p contenteditable="true" style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Here are some things you can do to get started with your new account:</p>
          <ul contenteditable="true" style="color: #666; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Complete your profile setup</li>
            <li>Explore our features and tools</li>
            <li>Connect with other members</li>
          </ul>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 20px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">Get Started Now</a>
        </div>
      `
    },
    {
      id: 'promo',
      name: 'Promotional Offer',
      category: 'marketing',
      thumbnail: 'https://placehold.co/200x150/9b87f5/ffffff?text=Promo',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 40px; text-align: center; border-radius: 12px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 10px; right: 20px; background: #fff; color: #ff6b6b; padding: 8px 15px; border-radius: 20px; font-weight: bold; font-size: 14px;">LIMITED TIME</div>
          <h1 contenteditable="true" style="color: white; font-size: 36px; font-weight: bold; margin: 0 0 10px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">50% OFF</h1>
          <p contenteditable="true" style="color: white; font-size: 20px; margin: 0 0 20px 0; opacity: 0.9;">Everything Must Go!</p>
          <p contenteditable="true" style="color: white; font-size: 16px; margin: 0; opacity: 0.8;">Use code: SAVE50 at checkout</p>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 30px; background: linear-gradient(45deg, #f8f9fa, #e9ecef); border-radius: 8px;">
          <h2 contenteditable="true" style="color: #333; font-size: 24px; margin: 0 0 15px 0; text-align: center;">Featured Products</h2>
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <div contenteditable="true" style="flex: 1; min-width: 200px; padding: 20px; background: white; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h3 style="color: #333; margin: 0 0 10px 0;">Product 1</h3>
              <p style="color: #666; margin: 0; text-decoration: line-through;">$100</p>
              <p style="color: #ff6b6b; font-weight: bold; margin: 0; font-size: 18px;">$50</p>
            </div>
            <div contenteditable="true" style="flex: 1; min-width: 200px; padding: 20px; background: white; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h3 style="color: #333; margin: 0 0 10px 0;">Product 2</h3>
              <p style="color: #666; margin: 0; text-decoration: line-through;">$80</p>
              <p style="color: #ff6b6b; font-weight: bold; margin: 0; font-size: 18px;">$40</p>
            </div>
          </div>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 20px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);">Shop Now & Save!</a>
        </div>
      `
    },
    {
      id: 'update',
      name: 'Product Update',
      category: 'newsletter',
      thumbnail: 'https://placehold.co/200x150/9b87f5/ffffff?text=Update',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px; text-align: center; border-radius: 12px;">
          <h1 contenteditable="true" style="color: white; font-size: 32px; font-weight: bold; margin: 0 0 15px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🎉 New Features Released!</h1>
          <p contenteditable="true" style="color: white; font-size: 18px; margin: 0; opacity: 0.9;">We've been working hard to bring you amazing new updates</p>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 30px; background: linear-gradient(45deg, #f8f9fa, #e3f2fd); border-radius: 8px;">
          <h2 contenteditable="true" style="color: #333; font-size: 24px; margin: 0 0 20px 0;">What's New:</h2>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div contenteditable="true" style="padding: 20px; background: white; border-left: 4px solid #4facfe; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">✨ Enhanced Dashboard</h3>
              <p style="color: #666; margin: 0; line-height: 1.6;">A completely redesigned dashboard with improved navigation and analytics.</p>
            </div>
            <div contenteditable="true" style="padding: 20px; background: white; border-left: 4px solid #00f2fe; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">🚀 Performance Boost</h3>
              <p style="color: #666; margin: 0; line-height: 1.6;">Everything loads 50% faster with our new optimization engine.</p>
            </div>
            <div contenteditable="true" style="padding: 20px; background: white; border-left: 4px solid #4facfe; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">🔧 Advanced Tools</h3>
              <p style="color: #666; margin: 0; line-height: 1.6;">New powerful tools to help you work more efficiently than ever.</p>
            </div>
          </div>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 20px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(45deg, #4facfe, #00f2fe); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);">Explore New Features</a>
        </div>
      `
    },
    {
      id: 'event',
      name: 'Event Invitation',
      category: 'marketing',
      thumbnail: 'https://placehold.co/200x150/9b87f5/ffffff?text=Event',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 40px; text-align: center; border-radius: 12px; position: relative;">
          <div style="position: absolute; top: 15px; left: 20px; background: rgba(255,255,255,0.9); color: #333; padding: 8px 15px; border-radius: 20px; font-weight: bold; font-size: 14px;">VIP INVITATION</div>
          <h1 contenteditable="true" style="color: #333; font-size: 36px; font-weight: bold; margin: 20px 0 15px 0; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">You're Invited! 🎊</h1>
          <p contenteditable="true" style="color: #555; font-size: 20px; margin: 0 0 10px 0;">Join us for an exclusive event</p>
          <p contenteditable="true" style="color: #666; font-size: 16px; margin: 0;">Don't miss this amazing opportunity</p>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <h2 contenteditable="true" style="color: #333; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Event Details</h2>
          <div style="display: flex; gap: 30px; justify-content: center; flex-wrap: wrap;">
            <div contenteditable="true" style="text-align: center; flex: 1; min-width: 150px;">
              <div style="background: linear-gradient(45deg, #a8edea, #fed6e3); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px auto; display: flex; align-items: center; justify-content: center; font-size: 24px;">📅</div>
              <h3 style="color: #333; margin: 0 0 5px 0; font-size: 16px;">Date</h3>
              <p style="color: #666; margin: 0;">March 15, 2024</p>
            </div>
            <div contenteditable="true" style="text-align: center; flex: 1; min-width: 150px;">
              <div style="background: linear-gradient(45deg, #a8edea, #fed6e3); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px auto; display: flex; align-items: center; justify-content: center; font-size: 24px;">🕕</div>
              <h3 style="color: #333; margin: 0 0 5px 0; font-size: 16px;">Time</h3>
              <p style="color: #666; margin: 0;">6:00 PM EST</p>
            </div>
            <div contenteditable="true" style="text-align: center; flex: 1; min-width: 150px;">
              <div style="background: linear-gradient(45deg, #a8edea, #fed6e3); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px auto; display: flex; align-items: center; justify-content: center; font-size: 24px;">📍</div>
              <h3 style="color: #333; margin: 0 0 5px 0; font-size: 16px;">Location</h3>
              <p style="color: #666; margin: 0;">Grand Ballroom</p>
            </div>
          </div>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 20px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(45deg, #a8edea, #fed6e3); color: #333; padding: 15px 40px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(168, 237, 234, 0.4); border: 2px solid rgba(255,255,255,0.8);">RSVP Now</a>
        </div>
      `
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
