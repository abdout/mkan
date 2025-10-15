import { ErrorCard } from "@/components/auth/error-card";

interface AuthErrorPageProps {
  searchParams?: {
    error?: string;
  };
}

const AuthErrorPage = ({ searchParams }: AuthErrorPageProps) => {
  return ( 
    <ErrorCard error={searchParams?.error} />
  );
};

export default AuthErrorPage;
