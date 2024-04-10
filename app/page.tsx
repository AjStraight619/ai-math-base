import CallToAction from '@/components/landing-page/call-to-action'
import Features from '@/components/landing-page/features'
import Hero from '@/components/landing-page/hero'
import Nav from '@/components/landing-page/nav'
import FAQ from '@/components/landing-page/faq'
import WhyMathBase from '@/components/landing-page/why-math-base'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (session && session?.user?.id) {
    redirect('/dashboard')
  }
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Nav />
      <Hero />
      <CallToAction />
      <WhyMathBase />
      <Features />
      <FAQ />
    </main>
  )
}
