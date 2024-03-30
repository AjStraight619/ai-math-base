import { auth, signOut } from "@/auth";
import SubmitButton from "@/components/ui/submit-button";

export default async function DashboardPage() {
  return (
    <main className="min-h-screen flex items-center justify-center space-y-6">
      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/",
          });
        }}
      >
        <SubmitButton>Sign Out</SubmitButton>
      </form>
    </main>
  );
}
