'use client'

import { usePathname } from 'next/navigation'

export function PoweredBy() {
  const path = usePathname()
  const harbor = path === '/' || path.startsWith('/week') || path.startsWith('/speakers')

  return (
    <a className={harbor ? 'powered-by powered-by-harbor' : 'powered-by'} href="https://techfolx.com">
      powered by Techfolx
    </a>
  )
}
