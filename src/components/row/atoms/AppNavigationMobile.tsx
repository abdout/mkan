'use client';

import { Heart, Search, UserCircle } from 'lucide-react';

const AppMobileNavigation = () => {
  return (
    <div className="fixed bottom-0 z-40 w-full h-16 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-3 items-center h-full max-w-[250px] sm:max-w-[350px] mx-auto">
        <div className="flex flex-col items-center">
          <Search className="h-6 text-primary" />
          <span className="mt-1 text-xs text-gray-500">Explore</span>
        </div>
        <div className="flex flex-col items-center">
          <Heart className="h-6 text-gray-300" />
          <span className="mt-1 text-xs text-gray-500">Wishlists</span>
        </div>
        <div className="flex flex-col items-center">
          <UserCircle className="h-6 text-gray-300" />
          <span className="mt-1 text-xs text-gray-500">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default AppMobileNavigation;
