import { getDashboardData } from "@/actions/dashboard";
import { auth } from "@/auth";
import ChatActivity from "@/components/dashboard-page/chat-activity";
import SectionDivider from "@/components/dashboard-page/section-divider";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const { user, chats, notes } = await getDashboardData(session.user.id);

  return (
    <main className="min-h-screen flex flex-col items-center gap-y-6">
      <h1 className="text-4xl font-poppins text-secondary p-6 text-center">
        Dashboard
      </h1>
      <h2 className="font-poppins text-xl">Welcome back!</h2>
      <SectionDivider>Recent Activity</SectionDivider>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        <ChatActivity chats={chats} />
      </div>
    </main>
  );
}
