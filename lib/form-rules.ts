export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const URL = /^https?:\/\/[^\s/$.?#].[^\s]*$/i

export type FieldErrors = Partial<Record<string, string>>

export function required(value: string, message: string) {
  return value.trim() ? undefined : message
}

export function validEmail(value: string) {
  const text = value.trim()
  if (!text) return 'Email is required'
  if (!EMAIL.test(text)) return 'Enter a valid email, like you@studio.com'
}

export function validPhone(value: string, requiredField = false) {
  const digits = value.replace(/\D/g, '')
  if (!digits) return requiredField ? 'Phone is required' : undefined
  if (digits.length < 10) return 'Enter a 10-digit phone number'
}

export function validUrl(value: string, label = 'Link') {
  const text = value.trim()
  if (!text) return
  if (!URL.test(text)) return `${label} must start with http:// or https://`
}

export function minChars(value: string, min: number, message: string) {
  return value.trim().length >= min ? undefined : message
}

export function minWords(value: string, min: number, message: string) {
  const count = value.trim() ? value.trim().split(/\s+/).length : 0
  return count >= min ? undefined : message
}

export function threeTakeaways(value: string) {
  const lines = value
    .split('\n')
    .map((line) => line.replace(/^\s*\d+[\.)]\s*/, '').trim())
    .filter(Boolean)
  if (lines.length < 3) return 'Add three takeaways, one per line'
}

export function firstErrorStep(steps: FieldErrors[]) {
  const index = steps.findIndex((item) => Object.keys(item).length > 0)
  return index === -1 ? 0 : index
}

export function mergeErrors(...groups: FieldErrors[]) {
  return groups.reduce<FieldErrors>((all, group) => ({ ...all, ...group }), {})
}

export function dropError(errors: FieldErrors, key: string): FieldErrors {
  if (!errors[key]) return errors
  const next = { ...errors }
  delete next[key]
  return next
}
