import { WEEK_DATES } from '@/lib/data'

export function formatWeekDate(iso: string, style: 'label' | 'short' | 'weekday' = 'label') {
  const row = WEEK_DATES.find((d) => d.iso === iso)
  if (!row) return iso
  return row[style]
}

export function formatCost(costType: string, amount: number | null) {
  if (costType === 'Free' || amount == null) return 'Free'
  return `${costType} · $${amount.toLocaleString('en-US')}`
}
