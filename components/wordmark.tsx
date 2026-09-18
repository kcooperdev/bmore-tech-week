import Link from 'next/link'

export function Wordmark({
  onClick,
  compact = false,
}: {
  onClick?: () => void
  compact?: boolean
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex flex-col leading-none"
      aria-label="Baltimore Tech Week home"
    >
      <span
        className={`font-display uppercase text-cream ${
          compact ? 'text-[1.05rem]' : 'text-[1.2rem] sm:text-[1.35rem]'
        }`}
      >
        Baltimore
      </span>
      <span
        className={`font-display uppercase ${
          compact ? 'text-[1.05rem]' : 'text-[1.2rem] sm:text-[1.35rem]'
        }`}
      >
        <span className="text-gold transition-colors group-hover:text-[#e6b423]">Tech</span>{' '}
        <span className="text-cream">Week</span>
      </span>
    </Link>
  )
}
