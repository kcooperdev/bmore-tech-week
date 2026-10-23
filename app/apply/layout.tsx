import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import '../../styles.css'

export const metadata: Metadata = {
  title: 'Apply',
  description: `Join Baltimore Tech Week ${EVENT.year}. Speak, partner, sponsor, or become an ambassador.`,
  robots: { index: true, follow: true },
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children
}
