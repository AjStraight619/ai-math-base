import { getUserData } from "@/actions/user";
import UpdateUserForm from "@/components/user/update-user-form";

type SettingsPageProps = {
  params: {
    userId: string;
  };
};

export default async function SettingsPage({
  params: { userId },
}: SettingsPageProps) {
  const userData = await getUserData(userId);

  return (
    <main className="min-h-screen flex items-center justify-center p-24 font-poppins">
      <UpdateUserForm userData={userData} />
    </main>
  );
}
