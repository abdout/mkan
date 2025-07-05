import { useState, useCallback } from 'react';

interface UseFavoriteProps {
  listingId: string;
  currentUser?: {
    id?: string;
    favoriteIds?: string[];
  } | null;
}

const useFavorite = ({ listingId, currentUser }: UseFavoriteProps) => {
  const [hasFavorited, setHasFavorited] = useState(
    currentUser?.favoriteIds?.includes(listingId) || false
  );

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setHasFavorited(prev => !prev);
  }, []);

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite; 