import { LoginForm } from "@/components/auth/login/form";

interface LoginPageProps {
  searchParams?: {
    callbackUrl?: string;
    error?: string;
  };
}

const LoginPage = ({ searchParams }: LoginPageProps) => {
  return ( 
    <LoginForm 
      callbackUrl={searchParams?.callbackUrl}
      error={searchParams?.error}
    />
  );
}
 
export default LoginPage;