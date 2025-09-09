"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import HeroSection from "@/components/site/HeroSection";
import { PropertyContent } from "@/components/site/property/content";
import PropertyFilter from "@/components/site/property-filter";
import { Listing } from "@/types/listing";
import AirbnbInspiration from "@/components/site/airbnb-inspiration";
import GiftCard from "@/components/site/airbnb-gift-card";
import Ask from "@/components/site/airbnb-ask";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Category mapping for production
const CATEGORY_KEYWORDS: Record<string, string[]> = {
	'Islands': ['island', 'private island', 'tropical', 'paradise', 'exotic'],
	'Mension': ['mansion', 'luxury', 'estate', 'villa', 'palace'],
	'Beach': ['beach', 'beachfront', 'ocean', 'coastal', 'seaside', 'waterfront'],
	'Boat': ['boat', 'yacht', 'houseboat', 'marine', 'sailing', 'nautical'],
	'Containers': ['container', 'modern', 'industrial', 'minimalist', 'shipping container'],
	'New': ['new', 'recent', 'latest', 'brand new', 'just added'],
	'Beauty Pools': ['pool', 'swimming pool', 'infinity pool', 'poolside', 'private pool'],
	'Group': ['group', 'large', 'family', 'multiple bedrooms', 'sleeps 8+', 'spacious'],
	'layer1': ['featured', 'popular', 'trending', 'top rated', 'best seller'],
	'Calque 2': ['unique', 'special', 'unusual', 'extraordinary', 'one of a kind'],
	'Windmill': ['windmill', 'rural', 'countryside', 'farm', 'rustic']
};

export default function Home() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [listings, setListings] = useState<Listing[]>([]);
	const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const resultsRef = useRef<HTMLDivElement>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 300);
	const [isFilterSticky, setIsFilterSticky] = useState(false);
	const filterRef = useRef<HTMLDivElement>(null);
	const propertyContentRef = useRef<HTMLDivElement>(null);
	const propertyEndRef = useRef<HTMLDivElement>(null);

	// Fetch listings on mount with better error handling
	useEffect(() => {
		const fetchListings = async () => {
			setIsLoading(true);
			setError(null);
			
			try {
				const response = await fetch('/api/listings/published');
				if (!response.ok) {
					throw new Error(`Failed to fetch listings: ${response.status}`);
				}
				
				const data = await response.json();
				
				if (!Array.isArray(data)) {
					throw new Error('Invalid data format');
				}
				
				setListings(data);
				setFilteredListings(data);
			} catch (error) {
				console.error("Error fetching listings:", error);
				setError(error instanceof Error ? error.message : 'Failed to load listings');
				setListings([]);
				setFilteredListings([]);
			} finally {
				setIsLoading(false);
			}
		};
		
		fetchListings();
	}, []);

	// Handle search parameters and apply filters
	useEffect(() => {
		if (listings.length === 0) return;
		
		const location = searchParams.get('location') || debouncedSearchTerm;
		const checkIn = searchParams.get('checkIn');
		const checkOut = searchParams.get('checkOut');
		const guests = searchParams.get('guests');
		const category = searchParams.get('category');

		if (category) {
			setSelectedCategory(category);
		}

		if (location || checkIn || checkOut || guests || category) {
			filterListingsBySearch({ location, checkIn, checkOut, guests, category });
			// Only scroll if we have active search params
			if (location || guests || category) {
				setTimeout(() => scrollToResults(), 300);
			}
		} else {
			setFilteredListings(listings);
		}
	}, [searchParams, listings, debouncedSearchTerm]);

	// Enhanced filter function with category support
	const filterListingsBySearch = useCallback((params: {
		location: string | null;
		checkIn: string | null;
		checkOut: string | null;
		guests: string | null;
		category: string | null;
	}) => {
		let filtered = [...listings];

		// Location filter
		if (params.location) {
			const locationLower = params.location.toLowerCase();
			filtered = filtered.filter(listing => {
				const searchableText = `${listing.location || ''} ${listing.title || ''} ${listing.city || ''} ${listing.country || ''}`.toLowerCase();
				return searchableText.includes(locationLower);
			});
		}

		// Guest capacity filter
		if (params.guests) {
			const guestCount = parseInt(params.guests);
			if (!isNaN(guestCount)) {
				filtered = filtered.filter(listing => 
					(listing.maxGuests || 0) >= guestCount
				);
			}
		}

		// Category filter
		if (params.category && CATEGORY_KEYWORDS[params.category]) {
			const keywords = CATEGORY_KEYWORDS[params.category];
			filtered = filtered.filter(listing => {
				const searchableText = `${listing.title || ''} ${listing.description || ''} ${listing.propertyType || ''} ${listing.amenities?.join(' ') || ''}`.toLowerCase();
				return keywords.some(keyword => searchableText.includes(keyword.toLowerCase()));
			});
		}

		// Date availability filter placeholder
		if (params.checkIn && params.checkOut) {
			// Future: Check against booking/availability data
		}

		setFilteredListings(filtered);
	}, [listings]);

	// Handle category click with URL persistence
	const handleCategoryClick = useCallback((category: string) => {
		setSelectedCategory(category);
		
		// Update URL with category
		const params = new URLSearchParams(searchParams.toString());
		if (category) {
			params.set('category', category);
		} else {
			params.delete('category');
		}
		
		// Update URL without navigation
		const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
		window.history.pushState({}, '', newUrl);
		
		// Apply filters
		const location = params.get('location');
		const checkIn = params.get('checkIn');
		const checkOut = params.get('checkOut');
		const guests = params.get('guests');
		
		filterListingsBySearch({ location, checkIn, checkOut, guests, category });
		
		// Scroll to results
		if (category) {
			setTimeout(() => scrollToResults(), 300);
		}
	}, [searchParams, filterListingsBySearch]);

	// Memoized values for performance
	const filteredCount = useMemo(() => filteredListings.length, [filteredListings]);
	const hasActiveFilters = useMemo(() => {
		return searchParams.toString() !== '' || selectedCategory !== '';
	}, [searchParams, selectedCategory]);

	// Clear all filters
	const clearFilters = useCallback(() => {
		setSelectedCategory("");
		setSearchTerm("");
		router.push(window.location.pathname);
		setFilteredListings(listings);
	}, [router, listings]);

	// Filter sticky behavior based on scroll position
	useEffect(() => {
		const handleScroll = () => {
			if (!filterRef.current || !propertyEndRef.current) return;
			
			const filterRect = filterRef.current.getBoundingClientRect();
			const propertyEndRect = propertyEndRef.current.getBoundingClientRect();
			
			// Filter should stick when it reaches top of screen
			const shouldStick = filterRect.top <= 0;
			
			// Filter should unstick when property area ends (property end element reaches top)
			const shouldUnstick = propertyEndRect.top <= 0;
			
			if (shouldUnstick) {
				setIsFilterSticky(false);
			} else if (shouldStick) {
				setIsFilterSticky(true);
			} else {
				setIsFilterSticky(false);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // Check initial state
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Smooth scroll to results
	const scrollToResults = useCallback(() => {
		if (resultsRef.current) {
			const offset = 100; // Offset to account for sticky header
			const elementPosition = resultsRef.current.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	}, []);

	return (
		<div className='bg-background'>
			<HeroSection onSearch={scrollToResults} />
			<div className='layout-container space-y-10 pb-20 pt-10'>
				<div 
					ref={filterRef}
					className={`${isFilterSticky ? 'sticky top-0' : 'relative'} bg-background z-40 py-1`}
				>
					<PropertyFilter 
						onIconClick={handleCategoryClick}
						selectedIcon={selectedCategory}
					/>
					{hasActiveFilters && (
						<div className="flex items-center justify-between mt-2 px-2">
							<p className="text-sm text-muted-foreground">
								{filteredCount} {filteredCount === 1 ? 'property' : 'properties'} found
							</p>
							<button
								onClick={clearFilters}
								className="text-sm text-primary hover:underline"
							>
								Clear filters
							</button>
						</div>
					)}
				</div>
				
				<div ref={resultsRef}>
					<div ref={propertyContentRef}>
						<PropertyContent 
							properties={filteredListings} 
							isLoading={isLoading}
						/>
					</div>
					{error && (
						<div className="text-center py-10">
							<p className="text-red-500 mb-4">{error}</p>
							<Button
								onClick={() => window.location.reload()}
								variant="outline"
							>
								Try Again
							</Button>
						</div>
					)}
					{/* Property end marker for filter sticky behavior */}
					<div ref={propertyEndRef} className="h-1"></div>
				</div>
				
				{filteredCount > 0 && !isLoading && (
					<Link href='/listings' className='flex my-14'>
						<Button
							size='lg'
							className='bg-foreground text-background hover:bg-foreground/90 h-12 px-10'>
							Explore All Listings
						</Button>
					</Link>
				)}
				<AirbnbInspiration />
				<GiftCard />
				<Ask />
			</div>
		</div>
	);
}
