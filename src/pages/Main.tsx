
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Mail, Copy, Eye } from "lucide-react";

const Main = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-editor-purple to-blue-500 text-transparent bg-clip-text">
            Stylish Message Forge
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create beautiful emails and messages with our powerful yet simple editor. 
            Format text, add images, customize colors, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
                    <h3 className="font-medium">Create Your Message</h3>
                    <p className="text-sm text-muted-foreground">Start with our editor and customize your content</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-editor-purple/20 rounded-full h-8 w-8 flex items-center justify-center text-editor-purple font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Preview Your Design</h3>
                    <p className="text-sm text-muted-foreground">Check how it looks with our preview feature</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-editor-purple/20 rounded-full h-8 w-8 flex items-center justify-center text-editor-purple font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Export and Share</h3>
                    <p className="text-sm text-muted-foreground">Copy your message or save it for later use</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link to="/editor">
            <Button className="bg-editor-purple hover:bg-editor-dark-purple px-8 py-6 text-lg">
              Start Creating <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
