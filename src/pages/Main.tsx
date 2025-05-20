
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Mail, Copy, Eye, Palette, Image, Link as LinkIcon } from "lucide-react";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      
      <div className="container mx-auto py-12 px-4 flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-editor-purple to-blue-500 text-transparent bg-clip-text">
              Stylish Message Forge
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create beautiful emails and messages with our powerful yet simple editor. 
              Format text, add images, customize colors, and more.
            </p>
            <div className="mt-8">
              <Link to="/editor">
                <Button className="bg-editor-purple hover:bg-editor-dark-purple px-8 py-6 text-lg">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div id="features" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="shadow-md border border-editor-purple/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-editor-purple/20 p-2 rounded-full">
                      <Mail size={18} className="text-editor-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium">Rich Text Formatting</h3>
                      <p className="text-sm text-muted-foreground">Format your text with bold, italic, headings, and more</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-editor-purple/20 p-2 rounded-full">
                      <Eye size={18} className="text-editor-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium">Live Preview</h3>
                      <p className="text-sm text-muted-foreground">See how your message looks in real-time</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-editor-purple/20 p-2 rounded-full">
                      <Copy size={18} className="text-editor-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium">Easy Export</h3>
                      <p className="text-sm text-muted-foreground">Copy your message with a single click</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-editor-purple/20 p-2 rounded-full">
                      <Palette size={18} className="text-editor-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium">Customizable Templates</h3>
                      <p className="text-sm text-muted-foreground">Choose from a variety of professional templates</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-editor-purple/20 p-2 rounded-full">
                      <Image size={18} className="text-editor-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium">Image Support</h3>
                      <p className="text-sm text-muted-foreground">Add and resize images in your emails</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-editor-purple/20 p-2 rounded-full">
                      <LinkIcon size={18} className="text-editor-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium">HTML Links</h3>
                      <p className="text-sm text-muted-foreground">Add clickable links to your content</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md border border-editor-purple/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-editor-purple/20 rounded-full h-8 w-8 flex items-center justify-center text-editor-purple font-medium">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Choose a Template</h3>
                      <p className="text-sm text-muted-foreground">Start with one of our professional templates or create from scratch</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-editor-purple/20 rounded-full h-8 w-8 flex items-center justify-center text-editor-purple font-medium">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Customize Your Content</h3>
                      <p className="text-sm text-muted-foreground">Add text, images, links, and format to your liking</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-editor-purple/20 rounded-full h-8 w-8 flex items-center justify-center text-editor-purple font-medium">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Preview Your Design</h3>
                      <p className="text-sm text-muted-foreground">See exactly how your email will appear to recipients</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-editor-purple/20 rounded-full h-8 w-8 flex items-center justify-center text-editor-purple font-medium">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Save or Export</h3>
                      <p className="text-sm text-muted-foreground">Save your template for later use or export the HTML</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div id="templates" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Popular Templates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <Mail size={48} className="text-editor-purple/50" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Template {item}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Professional email template for business communications</p>
                    <Link to="/editor">
                      <Button variant="outline" size="sm" className="w-full">
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center bg-editor-soft-purple rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-4">Ready to create stunning emails?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Join thousands of professionals who use Stylish Message Forge to create beautiful, responsive emails that get results.
            </p>
            <Link to="/editor">
              <Button className="bg-editor-purple hover:bg-editor-dark-purple px-6 py-2 text-md">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <MainFooter />
    </div>
  );
};

export default Main;
