export interface Listing {
  id: number;
  title: string | null;
  description: string | null;
  pricePerNight: number | null;
  photoUrls: string[];
  draft: boolean;
  isPublished: boolean;
  postedDate: Date | null;
  location: {
    id: number;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  } | null;
  host: {
    id: string;
    email: string;
    username: string | null;
  };
} 