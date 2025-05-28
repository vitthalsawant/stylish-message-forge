
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
      id: 'blank',
      name: 'Blank Template',
      category: 'basic',
      thumbnail: 'https://placehold.co/200x150/f8f9fa/6c757d?text=Blank+Canvas',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; padding: 40px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border: 2px dashed #6c757d;">
          <h1 contenteditable="true" style="color: #6c757d; font-size: 28px; font-weight: bold; margin: 0 0 15px 0;">Start Creating Your Email</h1>
          <p contenteditable="true" style="color: #6c757d; font-size: 16px; margin: 0;">Click here to begin editing, or use the content blocks to add elements</p>
        </div>
      `
    },
    {
      id: 'welcome',
      name: 'Welcome Email',
      category: 'newsletter',
      thumbnail: 'https://placehold.co/200x150/667eea/ffffff?text=Welcome',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px; text-align: center; border-radius: 16px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); opacity: 0.3;"></div>
          <div style="position: relative; z-index: 1;">
            <h1 contenteditable="true" style="color: white; font-size: 36px; font-weight: bold; margin: 0 0 20px 0; text-shadow: 0 2px 8px rgba(0,0,0,0.3); letter-spacing: -0.02em;">🎉 Welcome Aboard!</h1>
            <p contenteditable="true" style="color: white; font-size: 20px; margin: 0 0 10px 0; opacity: 0.95; line-height: 1.4;">Thank you for joining our amazing community</p>
            <p contenteditable="true" style="color: white; font-size: 16px; margin: 0; opacity: 0.85;">Your journey to excellence starts here</p>
          </div>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 40px; background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%); border-radius: 12px; box-shadow: 0 4px 20px rgba(102, 126, 234, 0.15);">
          <h2 contenteditable="true" style="color: #1e293b; font-size: 28px; margin: 0 0 25px 0; text-align: center; font-weight: 700;">Your Next Steps</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
            <div contenteditable="true" style="padding: 25px; background: white; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid rgba(102, 126, 234, 0.1);">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 24px;">📝</div>
              <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 18px;">Complete Profile</h3>
              <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Set up your account and personalize your experience</p>
            </div>
            <div contenteditable="true" style="padding: 25px; background: white; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid rgba(102, 126, 234, 0.1);">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🚀</div>
              <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 18px;">Explore Features</h3>
              <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Discover all the powerful tools at your disposal</p>
            </div>
          </div>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 30px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: 600; font-size: 18px; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); transition: all 0.3s ease; letter-spacing: 0.5px;">Get Started Now →</a>
        </div>
      `
    },
    {
      id: 'promo',
      name: 'Promotional Offer',
      category: 'marketing',
      thumbnail: 'https://placehold.co/200x150/ff6b6b/ffffff?text=50%25+OFF',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 50px 40px; text-align: center; border-radius: 16px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 15px; right: 25px; background: linear-gradient(45deg, #ffffff, #f8f9fa); color: #ff6b6b; padding: 12px 20px; border-radius: 25px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); text-transform: uppercase; letter-spacing: 1px;">⚡ Limited Time</div>
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%);"></div>
          <div style="position: relative; z-index: 1;">
            <h1 contenteditable="true" style="color: white; font-size: 48px; font-weight: 900; margin: 0 0 15px 0; text-shadow: 0 4px 8px rgba(0,0,0,0.3); letter-spacing: -0.02em;">50% OFF</h1>
            <p contenteditable="true" style="color: white; font-size: 24px; margin: 0 0 15px 0; opacity: 0.95; font-weight: 600;">Everything Must Go!</p>
            <p contenteditable="true" style="color: white; font-size: 18px; margin: 0; opacity: 0.9; background: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 25px; display: inline-block;">Use code: SAVE50</p>
          </div>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 40px; background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%); border-radius: 12px;">
          <h2 contenteditable="true" style="color: #1e293b; font-size: 32px; margin: 0 0 30px 0; text-align: center; font-weight: 800;">🔥 Hot Deals</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px;">
            <div contenteditable="true" style="padding: 30px; background: white; border-radius: 16px; text-align: center; box-shadow: 0 8px 25px rgba(255, 107, 107, 0.15); border: 2px solid rgba(255, 107, 107, 0.1); position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; right: 0; background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; padding: 8px 15px; font-size: 12px; font-weight: bold; transform: rotate(45deg) translate(25%, -50%); transform-origin: center;">BESTSELLER</div>
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ff6b6b, #ee5a24); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px;">👕</div>
              <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Premium T-Shirt</h3>
              <p style="color: #94a3b8; margin: 0 0 15px 0; text-decoration: line-through; font-size: 16px;">$100</p>
              <p style="color: #ff6b6b; font-weight: bold; margin: 0; font-size: 24px;">$50</p>
            </div>
            <div contenteditable="true" style="padding: 30px; background: white; border-radius: 16px; text-align: center; box-shadow: 0 8px 25px rgba(255, 107, 107, 0.15); border: 2px solid rgba(255, 107, 107, 0.1);">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ff6b6b, #ee5a24); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px;">👟</div>
              <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Sports Shoes</h3>
              <p style="color: #94a3b8; margin: 0 0 15px 0; text-decoration: line-through; font-size: 16px;">$150</p>
              <p style="color: #ff6b6b; font-weight: bold; margin: 0; font-size: 24px;">$75</p>
            </div>
          </div>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 30px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 20px 50px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: 700; font-size: 20px; box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4); text-transform: uppercase; letter-spacing: 1px;">🛒 Shop Now & Save!</a>
        </div>
      `
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      category: 'newsletter',
      thumbnail: 'https://placehold.co/200x150/4facfe/ffffff?text=Newsletter',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px; text-align: center; border-radius: 16px;">
          <h1 contenteditable="true" style="color: white; font-size: 32px; font-weight: bold; margin: 0 0 10px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">📰 Weekly Digest</h1>
          <p contenteditable="true" style="color: white; font-size: 18px; margin: 0; opacity: 0.9;">Stay updated with the latest news and insights</p>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 35px; background: linear-gradient(135deg, #f8fcff 0%, #f0f9ff 100%); border-radius: 12px;">
          <h2 contenteditable="true" style="color: #0f172a; font-size: 26px; margin: 0 0 25px 0;">This Week's Highlights</h2>
          <div style="space-y: 20px;">
            <div contenteditable="true" style="padding: 25px; background: white; border-left: 5px solid #4facfe; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
              <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">🚀 Product Launch Success</h3>
              <p style="color: #64748b; margin: 0; line-height: 1.6; font-size: 16px;">Our latest product exceeded expectations with over 10,000 sign-ups in the first week. Here's what made it special...</p>
            </div>
            <div contenteditable="true" style="padding: 25px; background: white; border-left: 5px solid #00f2fe; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
              <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">📊 Market Insights</h3>
              <p style="color: #64748b; margin: 0; line-height: 1.6; font-size: 16px;">Industry trends show a 40% increase in digital adoption. Learn how this impacts your business strategy...</p>
            </div>
            <div contenteditable="true" style="padding: 25px; background: white; border-left: 5px solid #4facfe; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
              <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">🎯 Tips & Tricks</h3>
              <p style="color: #64748b; margin: 0; line-height: 1.6; font-size: 16px;">5 productivity hacks that will transform your workflow and save you hours every week...</p>
            </div>
          </div>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 25px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(45deg, #4facfe, #00f2fe); color: white; padding: 15px 35px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: 600; box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);">Read Full Newsletter →</a>
        </div>
      `
    },
    {
      id: 'event',
      name: 'Event Invitation',
      category: 'marketing',
      thumbnail: 'https://placehold.co/200x150/a8edea/333333?text=Event+🎊',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 50px 40px; text-align: center; border-radius: 16px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 20px; left: 25px; background: rgba(255,255,255,0.95); color: #1e293b; padding: 12px 20px; border-radius: 25px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">🎟️ VIP Invitation</div>
          <div style="position: relative; z-index: 1; margin-top: 20px;">
            <h1 contenteditable="true" style="color: #1e293b; font-size: 42px; font-weight: 900; margin: 0 0 20px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1); letter-spacing: -0.02em;">You're Invited! 🎊</h1>
            <p contenteditable="true" style="color: #334155; font-size: 22px; margin: 0 0 10px 0; font-weight: 600;">Join us for an exclusive networking event</p>
            <p contenteditable="true" style="color: #475569; font-size: 18px; margin: 0;">Connect, learn, and grow with industry leaders</p>
          </div>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 40px; background: white; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.1);">
          <h2 contenteditable="true" style="color: #1e293b; font-size: 28px; margin: 0 0 30px 0; text-align: center; font-weight: 800;">Event Details</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px;">
            <div contenteditable="true" style="text-align: center; padding: 25px;">
              <div style="background: linear-gradient(135deg, #a8edea, #fed6e3); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 0 4px 20px rgba(168, 237, 234, 0.3);">📅</div>
              <h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 18px; font-weight: 700;">Date</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">March 25, 2024</p>
            </div>
            <div contenteditable="true" style="text-align: center; padding: 25px;">
              <div style="background: linear-gradient(135deg, #a8edea, #fed6e3); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 0 4px 20px rgba(168, 237, 234, 0.3);">🕕</div>
              <h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 18px; font-weight: 700;">Time</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">6:00 PM - 9:00 PM</p>
            </div>
            <div contenteditable="true" style="text-align: center; padding: 25px;">
              <div style="background: linear-gradient(135deg, #a8edea, #fed6e3); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 0 4px 20px rgba(168, 237, 234, 0.3);">📍</div>
              <h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 18px; font-weight: 700;">Venue</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">Grand Conference Hall</p>
            </div>
          </div>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 30px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #1e293b; padding: 20px 50px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: 800; font-size: 20px; box-shadow: 0 8px 25px rgba(168, 237, 234, 0.4); border: 3px solid rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 1px;">🎟️ RSVP Now</a>
        </div>
      `
    },
    {
      id: 'product-update',
      name: 'Product Update',
      category: 'newsletter',
      thumbnail: 'https://placehold.co/200x150/9333ea/ffffff?text=New+Features',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #9333ea 0%, #c084fc 100%); padding: 50px 40px; text-align: center; border-radius: 16px; position: relative;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');"></div>
          <div style="position: relative; z-index: 1;">
            <h1 contenteditable="true" style="color: white; font-size: 36px; font-weight: 900; margin: 0 0 15px 0; text-shadow: 0 2px 8px rgba(0,0,0,0.3);">✨ Major Update Released!</h1>
            <p contenteditable="true" style="color: white; font-size: 20px; margin: 0; opacity: 0.95; font-weight: 500;">Packed with features you've been waiting for</p>
          </div>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 40px; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px;">
          <h2 contenteditable="true" style="color: #1e293b; font-size: 28px; margin: 0 0 30px 0; text-align: center; font-weight: 800;">🎯 What's New</h2>
          <div style="display: flex; flex-direction: column; gap: 25px;">
            <div contenteditable="true" style="display: flex; align-items: flex-start; padding: 30px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(147, 51, 234, 0.1); border-left: 6px solid #9333ea;">
              <div style="background: linear-gradient(135deg, #9333ea, #c084fc); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 20px; flex-shrink: 0;">🎨</div>
              <div>
                <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Enhanced Design System</h3>
                <p style="color: #64748b; margin: 0; line-height: 1.6; font-size: 16px;">Beautiful new components with improved accessibility and mobile responsiveness across all devices.</p>
              </div>
            </div>
            <div contenteditable="true" style="display: flex; align-items: flex-start; padding: 30px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(147, 51, 234, 0.1); border-left: 6px solid #c084fc;">
              <div style="background: linear-gradient(135deg, #c084fc, #9333ea); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 20px; flex-shrink: 0;">⚡</div>
              <div>
                <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Performance Boost</h3>
                <p style="color: #64748b; margin: 0; line-height: 1.6; font-size: 16px;">Everything runs 60% faster with our new optimization engine and improved caching system.</p>
              </div>
            </div>
            <div contenteditable="true" style="display: flex; align-items: flex-start; padding: 30px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(147, 51, 234, 0.1); border-left: 6px solid #9333ea;">
              <div style="background: linear-gradient(135deg, #9333ea, #c084fc); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 20px; flex-shrink: 0;">🛡️</div>
              <div>
                <h3 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Advanced Security</h3>
                <p style="color: #64748b; margin: 0; line-height: 1.6; font-size: 16px;">Enhanced encryption and privacy controls to keep your data safe and secure at all times.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 30px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(135deg, #9333ea 0%, #c084fc 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: 700; font-size: 18px; box-shadow: 0 8px 25px rgba(147, 51, 234, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">🚀 Explore Updates</a>
        </div>
      `
    },
    {
      id: 'testimonial',
      name: 'Customer Testimonial',
      category: 'marketing',
      thumbnail: 'https://placehold.co/200x150/f59e0b/ffffff?text=5+Stars',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); padding: 50px 40px; text-align: center; border-radius: 16px;">
          <h1 contenteditable="true" style="color: white; font-size: 32px; font-weight: 900; margin: 0 0 15px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">⭐ Customer Love</h1>
          <p contenteditable="true" style="color: white; font-size: 18px; margin: 0; opacity: 0.9; font-weight: 500;">See what our amazing customers are saying</p>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 40px; background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-radius: 12px;">
          <div contenteditable="true" style="background: white; padding: 40px; border-radius: 16px; text-align: center; box-shadow: 0 8px 30px rgba(245, 158, 11, 0.15); position: relative; margin-bottom: 30px;">
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #f59e0b, #f97316); color: white; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: bold;">⭐⭐⭐⭐⭐</div>
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f59e0b, #f97316); border-radius: 50%; margin: 20px auto 25px; display: flex; align-items: center; justify-content: center; font-size: 32px; color: white;">👤</div>
            <p style="color: #374151; font-size: 20px; font-style: italic; line-height: 1.6; margin: 0 0 25px 0; font-weight: 500;">"This product completely transformed our workflow. The results exceeded our expectations and the support team is fantastic!"</p>
            <h3 style="color: #1f2937; margin: 0 0 5px 0; font-size: 18px; font-weight: 700;">Sarah Johnson</h3>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">CEO, TechCorp</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            <div contenteditable="true" style="background: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="color: #f59e0b; font-size: 18px; margin-bottom: 10px;">⭐⭐⭐⭐⭐</div>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5;">"Outstanding service and quality!"</p>
              <p style="color: #1f2937; font-weight: 600; margin: 0; font-size: 14px;">- Mike Chen</p>
            </div>
            <div contenteditable="true" style="background: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <div style="color: #f59e0b; font-size: 18px; margin-bottom: 10px;">⭐⭐⭐⭐⭐</div>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5;">"Best investment we've made!"</p>
              <p style="color: #1f2937; font-weight: 600; margin: 0; font-size: 14px;">- Lisa Park</p>
            </div>
          </div>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 30px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: 700; font-size: 18px; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);">Join Happy Customers →</a>
        </div>
      `
    },
    {
      id: 'survey',
      name: 'Survey Request',
      category: 'newsletter',
      thumbnail: 'https://placehold.co/200x150/10b981/ffffff?text=Survey',
      content: `
        <div class="draggable-row" style="margin-bottom: 20px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 50px 40px; text-align: center; border-radius: 16px;">
          <h1 contenteditable="true" style="color: white; font-size: 32px; font-weight: 900; margin: 0 0 15px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">📊 Help Us Improve</h1>
          <p contenteditable="true" style="color: white; font-size: 18px; margin: 0; opacity: 0.9; font-weight: 500;">Your feedback shapes our future</p>
        </div>
        <div class="draggable-row" style="margin-bottom: 20px; padding: 40px; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px;">
          <h2 contenteditable="true" style="color: #1e293b; font-size: 26px; margin: 0 0 20px 0; text-align: center; font-weight: 800;">Quick 2-Minute Survey</h2>
          <p contenteditable="true" style="color: #475569; font-size: 18px; margin: 0 0 30px 0; text-align: center; line-height: 1.6;">We value your opinion and want to make sure we're meeting your needs. Your responses will help us create better experiences for everyone.</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 25px; margin-bottom: 30px;">
            <div contenteditable="true" style="background: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1); border: 2px solid rgba(16, 185, 129, 0.1);">
              <div style="background: linear-gradient(135deg, #10b981, #059669); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: white;">📈</div>
              <h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 16px; font-weight: 700;">Product Features</h3>
              <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.4;">Rate our current features</p>
            </div>
            <div contenteditable="true" style="background: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1); border: 2px solid rgba(16, 185, 129, 0.1);">
              <div style="background: linear-gradient(135deg, #10b981, #059669); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: white;">🎯</div>
              <h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 16px; font-weight: 700;">User Experience</h3>
              <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.4;">Share your experience</p>
            </div>
            <div contenteditable="true" style="background: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1); border: 2px solid rgba(16, 185, 129, 0.1);">
              <div style="background: linear-gradient(135deg, #10b981, #059669); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: white;">💡</div>
              <h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 16px; font-weight: 700;">Future Ideas</h3>
              <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.4;">Suggest improvements</p>
            </div>
          </div>
          <div contenteditable="true" style="background: white; padding: 25px; border-radius: 12px; border: 2px dashed #10b981; text-align: center;">
            <h3 style="color: #10b981; margin: 0 0 10px 0; font-size: 18px; font-weight: 700;">🎁 Thank You Gift</h3>
            <p style="color: #475569; margin: 0; font-size: 16px;">Complete the survey and get a 20% discount on your next purchase!</p>
          </div>
        </div>
        <div class="draggable-row" style="text-align: center; margin-bottom: 20px; padding: 30px;">
          <a href="#" contenteditable="true" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: 700; font-size: 18px; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);">📝 Take Survey (2 min)</a>
        </div>
      `
    }
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
