import Link from "next/link";
import Footer from "../../components/site-footer";

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full flex-col flex items-center justify-center mt-10">
        <Link href="/" className="text-2xl font-bold">
          Leaniverse Hub
        </Link>
      </div>
      <div className="w-full flex-col flex items-center justify-center">
        <div className="container">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterLayout;
