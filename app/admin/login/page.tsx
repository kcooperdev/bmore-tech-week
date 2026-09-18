import { Suspense } from 'react'
import { AdminLoginForm } from '@/components/admin/login-form'

export default function AdminLoginPage() {
  return (
    <main id="main" className="mx-auto flex min-h-[100svh] max-w-md flex-col justify-center px-4 py-16">
      <p className="text-sm font-semibold text-gold">Organizer only</p>
      <h1 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-wide text-cream">
        Matching desk
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-cream/75">
        Match venues to talks. Approve nights. Publish the schedule.
      </p>
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </main>
  )
}
