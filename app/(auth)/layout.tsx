import { Poppins } from "next/font/google";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center md:p-24 p-2">
      {children}
    </div>
  );
}
