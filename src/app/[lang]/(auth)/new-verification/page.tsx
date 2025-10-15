import { NewVerificationForm } from "@/components/auth/verification/form";

interface NewVerificationPageProps {
  searchParams?: {
    token?: string;
  };
}

const NewVerificationPage = ({ searchParams }: NewVerificationPageProps) => {
  return ( 
    <NewVerificationForm token={searchParams?.token} />
   );
}
 
export default NewVerificationPage;