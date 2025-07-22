import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, ArrowLeft } from 'lucide-react';

interface GenericPlaceholderProps {
  title: string;
  description: string;
  section: 'details' | 'travel';
}

const GenericPlaceholder = ({ title, description, section }: GenericPlaceholderProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">{title}</h1>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="size-5" />
              {title} Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="size-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                This {section} configuration page is currently under development. 
                You'll be able to manage your {title.toLowerCase()} settings here.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <h4 className="font-medium text-blue-900 mb-2">What you'll be able to do:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Configure {title.toLowerCase()} settings</li>
                  <li>• Save and update your preferences</li>
                  <li>• Preview how it appears to guests</li>
                  <li>• Get recommendations and tips</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-between">
          <Button variant="outline">
            Back
          </Button>
          <Button>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenericPlaceholder; 