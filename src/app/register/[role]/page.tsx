import { SignupForm } from "../_components/signup-form";

interface RegisterPageProps {
  params: Promise<{
    role: string;
  }>;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  // Await the params object before accessing its properties
  const { role } = await params;

  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <SignupForm role={role as "student" | "instructor"} />
      </div>
    </div>
  );
}
