import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null = null

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim())
}

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }
  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return cached
}
