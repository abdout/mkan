import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const useAuthRedirect = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    
    if (!session) {
      console.log('🔒 No session found, redirecting to login');
      // Capture current URL as callback
      const currentUrl = window.location.pathname + window.location.search;
      const encodedCallbackUrl = encodeURIComponent(currentUrl);
      router.push(`/login?callbackUrl=${encodedCallbackUrl}`);
      return;
    }
    
    console.log('🔒 Session found:', session.user?.email);
  }, [session, status, router]);

  return { session, status };
}; 