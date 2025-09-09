import { Listing } from "@/types/listing";

export interface SiteFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  category: string;
}

export interface SiteState {
  listings: Listing[];
  filteredListings: Listing[];
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
  isFilterSticky: boolean;
}

export interface SiteActions {
  handleCategoryClick: (category: string) => void;
  clearFilters: () => void;
  scrollToResults: () => void;
}

export interface SiteRefs {
  resultsRef: React.RefObject<HTMLDivElement>;
  filterRef: React.RefObject<HTMLDivElement>;
  propertyContentRef: React.RefObject<HTMLDivElement>;
  propertyEndRef: React.RefObject<HTMLDivElement>;
}