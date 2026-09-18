'use client'

import { useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

export function AdminLoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const password = String(new FormData(e.currentTarget).get('password') || '')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(json.error || 'Could not sign in')
      router.replace(params.get('from') || '/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in')
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 space-y-4 border-2 border-cream/25 bg-card/90 p-5 shadow-[6px_6px_0_var(--gold)] sm:p-7"
    >
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-cream">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="ea-input"
          placeholder="Organizer password"
        />
      </label>
      {error ? (
        <p className="text-sm font-semibold text-secondary" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-charcoal transition-transform hover:-translate-y-1 disabled:opacity-70"
      >
        {loading ? 'Entering…' : 'Enter dashboard'}
        {!loading ? <ArrowRight className="size-4" /> : null}
      </button>
    </form>
  )
}
