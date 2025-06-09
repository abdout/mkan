import { NewPasswordForm } from "@/components/auth/password/form";

interface NewPasswordPageProps {
  searchParams?: {
    token?: string;
  };
}

const NewPasswordPage = ({ searchParams }: NewPasswordPageProps) => {
  return ( 
    <NewPasswordForm token={searchParams?.token} />
   );
}
 
export default NewPasswordPage;