'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { CTA, FORMATS, NEIGHBORHOODS, TOPICS, WEEK_DATES } from '@/lib/data'
import { Field } from '@/components/forms/field'
import { FormSuccess } from '@/components/forms/form-success'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function SpeakerForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/speakers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || '').trim(),
          email: String(data.get('email') || '').trim(),
          talkTitle: String(data.get('talkTitle') || '').trim(),
          talkDescription: String(data.get('talkDescription') || '').trim(),
          topic: String(data.get('topic') || '').trim(),
          format: String(data.get('format') || '').trim(),
          preferredNeighborhood: String(data.get('preferredNeighborhood') || '').trim(),
          preferredDate: String(data.get('preferredDate') || '').trim(),
          linkedinUrl: String(data.get('linkedinUrl') || '').trim(),
          websiteUrl: String(data.get('websiteUrl') || '').trim(),
          portfolioUrl: String(data.get('portfolioUrl') || '').trim(),
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

  if (status === 'success') {
    return (
      <FormSuccess
        title="Got it."
        body="If we can put this talk on a night, we will email you."
        current="talk"
        resetLabel="Send another"
        onReset={() => setStatus('idle')}
      />
    )
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-5 p-5 sm:p-7">
      <Field label="Speaker name" required>
        <input name="name" required autoComplete="name" className="ea-input" placeholder="Your name" />
      </Field>
      <Field label="Email" required>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="ea-input"
          placeholder="you@company.com"
        />
      </Field>
      <Field label="Talk title" required>
        <input name="talkTitle" required className="ea-input" placeholder="Shipping in Charm City" />
      </Field>
      <Field label="Talk description" required hint="What happens in the room? Keep it under a few paragraphs.">
        <textarea
          name="talkDescription"
          required
          rows={5}
          className="ea-input min-h-[8rem] resize-y"
          placeholder="What people should walk away with. Keep it short."
        />
      </Field>
      <Field label="Topic category" required>
        <select name="topic" required className="ea-input" defaultValue="">
          <option value="" disabled>
            Pick a topic
          </option>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Format" required>
        <select name="format" required className="ea-input" defaultValue="">
          <option value="" disabled>
            Panel, fireside, workshop, or social talk
          </option>
          {FORMATS.map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Preferred neighborhood" required>
        <select name="preferredNeighborhood" required className="ea-input" defaultValue="Any">
          <option value="Any">Any</option>
          {NEIGHBORHOODS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Preferred date" required>
        <select name="preferredDate" required className="ea-input" defaultValue="Any">
          <option value="Any">Any night</option>
          {WEEK_DATES.map((date) => (
            <option key={date.iso} value={date.iso}>
              {date.label}
            </option>
          ))}
        </select>
      </Field>
      <details className="border-t border-cream/10 pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-cream/80">
          Links, if you have them
        </summary>
        <div className="mt-4 space-y-5">
          <Field label="LinkedIn">
            <input name="linkedinUrl" type="url" className="ea-input" placeholder="https://linkedin.com/in/…" />
          </Field>
          <Field label="Website">
            <input name="websiteUrl" type="url" className="ea-input" placeholder="https://" />
          </Field>
          <Field label="Portfolio">
            <input name="portfolioUrl" type="url" className="ea-input" placeholder="https://" />
          </Field>
        </div>
      </details>

      {status === 'error' ? (
        <p className="text-sm font-semibold text-red-300" role="alert">
          {message || 'Could not submit. Try again.'}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-cta-secondary group w-full disabled:opacity-70 sm:w-auto"
      >
        {status === 'loading' ? 'Sending…' : CTA.submitTalk}
        {status !== 'loading' ? (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        ) : null}
      </button>
    </form>
  )
}
