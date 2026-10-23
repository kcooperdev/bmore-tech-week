export function PageBanner({
  kicker,
  title,
}: {
  kicker?: string
  title: string
}) {
  return (
    <header className="page-banner">
      <div className="page-banner-inner">
        {kicker ? <p className="page-banner-kicker">{kicker}</p> : null}
        <h1 className="page-banner-title">{title}</h1>
      </div>
    </header>
  )
}
