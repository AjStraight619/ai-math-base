import { getUserData } from '@/actions/user'
import { auth } from '@/auth'
import UpdateUserForm from '@/components/user/update-user-form'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const session = await auth()
  if (!session || !session.user?.id) {
    redirect('/login')
  }

  const userData = await getUserData(session.user.id)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <UpdateUserForm userData={userData} />
    </div>
  )
}
