"use client";

import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
// components
import AppLogo, { EAppLogo } from '@/components/row/atoms/AppLogo';
import AppSearchBar from '@/components/row/molecules/AppSearchBar';
import AppHeaderOption from '@/components/row/atoms/AppHeaderOption';
import AppSearchBarMobile from '@/components/row/molecules/AppSearchBarMobile';
// icons
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon } from '@/components/row/placeholders/Icons';
// typings
import { EHeaderOpions, IExploreNearby } from '@/typings';
import { formatGuests, formatRangeDate } from '@/utils';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  exploreNearby?: IExploreNearby[];
  searchPage?: boolean;
  query?: any;
}

const AppHeader: FC<AppHeaderProps> = ({ exploreNearby, searchPage, query }) => {
  const [isSnapTop, setIsSnapTop] = useState<boolean>(searchPage ? false : true);
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(
    searchPage ? false : true
  );
  const [activeMenu, setActiveMenu] = useState<EHeaderOpions | null>(
    EHeaderOpions.PLACES_TO_STAY
  );

  const handleOnScroll = () => {
    const position = window.scrollY;
    if (position >= 50) {
      setIsSnapTop(false);
      setIsActiveSearch(false);
    } else {
      setIsSnapTop(true);
      setIsActiveSearch(true);
    }
  };

  useEffect(() => {
    if (!searchPage) {
      window.addEventListener('scroll', handleOnScroll);
    }
    return () => window.removeEventListener('scroll', handleOnScroll);
  }, [searchPage]);

  return (
    <div className="space-y-4 p-4">
      {/* Logo Component */}
      <Link href="/" className={cn("block", isSnapTop ? "text-white" : "text-primary")}>
        <AppLogo type={EAppLogo.TEXT} />
      </Link>

      {/* User Actions Component */}
      <div className="flex items-center gap-2">
        <Link href="/" className="px-4 py-2 rounded-full hover:bg-gray-100">
          Become a host
        </Link>
        <Link href="/" className="p-2 rounded-full hover:bg-gray-100">
          <GlobeAltIcon className="h-5" />
        </Link>
        <button className="flex items-center gap-2 p-2 border rounded-full hover:shadow-md">
          <MenuIcon className="h-5" />
          <UserCircleIcon className="h-8" />
        </button>
      </div>

      {/* Navigation Options Component */}
      <div className="flex gap-4">
        <AppHeaderOption
          isSnap={isSnapTop}
          isActiveHeader={isActiveSearch}
          active={activeMenu === EHeaderOpions.PLACES_TO_STAY}
          onClick={() => setActiveMenu(EHeaderOpions.PLACES_TO_STAY)}
        >
          Places to stay
        </AppHeaderOption>
        <AppHeaderOption
          isSnap={isSnapTop}
          isActiveHeader={isActiveSearch}
          active={activeMenu === EHeaderOpions.FIND_EXPERIENCES}
          onClick={() => setActiveMenu(EHeaderOpions.FIND_EXPERIENCES)}
        >
          Experiences
        </AppHeaderOption>
        <AppHeaderOption isSnap={isSnapTop} isActiveHeader={isActiveSearch}>
          <Link href="/">Online Experiences</Link>
        </AppHeaderOption>
      </div>

      {/* Search Bar Component */}
      <button
        className="w-full flex items-center gap-2 p-4 border rounded-full hover:shadow-md"
        onClick={() => setIsActiveSearch(true)}
      >
        <span className="flex-grow text-left">
          {searchPage ? (
            <div className="flex gap-4">
              <span>{query?.location || "Location"}</span>
              <span>{formatRangeDate(query?.checkIn, query?.checkOut) || "Add dates"}</span>
              <span>{formatGuests(query?.guests, { noInfants: true }) || "Add guests"}</span>
            </div>
          ) : (
            "Start your search"
          )}
        </span>
        <SearchIcon className="h-8 p-2 text-white rounded-full bg-primary" />
      </button>

      {/* Main Search Bar Component */}
      <AppSearchBar
        menu={activeMenu}
        isActiveHeader={isActiveSearch}
        searchPage={searchPage}
        closeSearch={() => setIsActiveSearch(false)}
      />

      {/* Mobile Search Bar Component */}
      <AppSearchBarMobile 
        exploreNearby={exploreNearby || []} 
        searchPage={searchPage} 
      />

      {/* Overlay */}
      {isActiveSearch && !isSnapTop && (
        <div
          className="fixed inset-0 z-40 bg-transparent-black"
          onClick={() => setIsActiveSearch(false)}
        />
      )}
    </div>
  );
};

export default AppHeader;
