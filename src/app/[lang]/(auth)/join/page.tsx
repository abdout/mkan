import { RegisterForm } from "@/components/auth/join/form";

interface RegisterPageProps {
  searchParams?: {
    callbackUrl?: string;
  };
}

const RegisterPage = ({ searchParams }: RegisterPageProps) => {
  return ( 
    <RegisterForm callbackUrl={searchParams?.callbackUrl} />
  );
}
 
export default RegisterPage;