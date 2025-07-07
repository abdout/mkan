"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Settings, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ListingSidebarProps {
  listingId: string;
}

const ListingSidebar = ({ listingId }: ListingSidebarProps) => {
  const router = useRouter();

  return (
    <div className="lg:col-span-1 lg:max-w-80">
      <Button
        variant="ghost"
        onClick={() => router.push('/hosting/listings')}
        className="gap-2 mb-6 p-0 h-auto"
      >
        <ArrowLeft className="size-5" />
        <span>Listing editor</span>
      </Button>

      {/* Navigation Tabs */}
      <div className="flex space-x-6 mb-8">
        <button className="text-foreground font-medium border-b-2 border-foreground pb-2">
          Your space
        </button>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground pb-2 p-0 h-auto">
          Arrival guide
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground pb-2 p-0 h-auto">
          <Settings className="size-4" />
        </Button>
      </div>

      {/* Required Steps */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-destructive rounded-full"></div>
              <CardTitle className="text-lg">Complete required steps</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <ArrowLeft className="size-4 rotate-180" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Finish these final tasks to publish your listing and start getting booked.
          </p>
        </CardContent>
      </Card>

      {/* Photo Tour Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Photo tour</CardTitle>
          <p className="text-sm text-muted-foreground">1 bedroom • 1 bed • 1 bath</p>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
              <Avatar className="size-16">
                <AvatarFallback className="text-2xl">
                  👤
                </AvatarFallback>
              </Avatar>
            </div>
            <Badge className="absolute top-3 left-3 text-sm font-medium">
              5 photos
            </Badge>
          </div>
          
          <Button className="w-full gap-2">
            <Eye className="size-4" />
            <span>View</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingSidebar;
