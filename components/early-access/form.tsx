'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { CTA } from '@/lib/data'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function EarlyAccessForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || '').trim(),
          email: String(data.get('email') || '').trim(),
          company: String(data.get('company') || '').trim(),
          wantHost: data.get('wantHost') === 'on',
          wantSponsor: data.get('wantSponsor') === 'on',
          wantVolunteer: data.get('wantVolunteer') === 'on',
          wantCommunityPartner: data.get('wantCommunityPartner') === 'on',
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <section
      id="early-access-form"
      className="section-anchor relative isolate overflow-hidden py-14 sm:py-16 md:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-background" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(0,175,185,0.2),transparent_42%),linear-gradient(300deg,rgba(199,21,133,0.18),transparent_40%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-12 lg:items-start lg:gap-14">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
          <p className="font-playful text-sm font-bold text-secondary">Main conversion</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-wide text-cream sm:text-5xl md:text-6xl text-balance">
            Join Early Access
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/85 text-pretty sm:text-lg">
            Be first for the recap, programming drops, and ways to get involved.
          </p>
          <ul className="mt-6 space-y-2 font-playful text-sm font-bold text-primary">
            <li>→ Sold-out session recap</li>
            <li>→ First programming drop</li>
            <li>→ Host, sponsor, volunteer, partner</li>
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={100}>
          <div className="border-2 border-cream/25 bg-card/90 p-5 shadow-[6px_6px_0_var(--primary)] sm:p-7">
            {status === 'success' ? (
              <div className="text-cream">
                <p className="inline-flex items-center gap-2 font-playful text-lg font-bold">
                  <Check className="size-5 text-primary" />
                  You’re on the list.
                </p>
                <p className="mt-2 text-sm text-cream/80">
                  We’ll send the session recap and first drops here first.
                </p>
                <button
                  type="button"
                  className="mt-4 text-sm font-bold text-primary underline-offset-2 hover:underline"
                  onClick={() => setStatus('idle')}
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-cream">Name</span>
                  <input name="name" required autoComplete="name" className="ea-input" placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-cream">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="ea-input"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-cream">
                    Company <span className="font-normal text-cream/60">(optional)</span>
                  </span>
                  <input
                    name="company"
                    autoComplete="organization"
                    className="ea-input"
                    placeholder="Company or project"
                  />
                </label>

                <div className="space-y-3 pt-1">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-cream">
                    <input name="wantHost" type="checkbox" className="mt-0.5 size-4 accent-[var(--primary)]" />
                    <span>I want to host an event</span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-cream">
                    <input name="wantSponsor" type="checkbox" className="mt-0.5 size-4 accent-[var(--secondary)]" />
                    <span>I want to sponsor</span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-cream">
                    <input name="wantVolunteer" type="checkbox" className="mt-0.5 size-4 accent-[var(--primary)]" />
                    <span>I want to be a volunteer</span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-cream">
                    <input
                      name="wantCommunityPartner"
                      type="checkbox"
                      className="mt-0.5 size-4 accent-[var(--secondary)]"
                    />
                    <span>I want to be a community partner</span>
                  </label>
                </div>

                {status === 'error' && (
                  <p className="text-sm font-semibold text-secondary" role="alert">
                    {message || 'Could not submit. Try again.'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-secondary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-secondary-foreground transition-transform hover:-translate-y-1 disabled:opacity-70 sm:w-auto sm:px-7 sm:py-4 sm:text-base"
                >
                  {status === 'loading' ? 'Joining…' : CTA.earlyAccess}
                  {status !== 'loading' && (
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
