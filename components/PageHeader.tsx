import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="plain-hero" id="main">
      <div className="week-wrap">
        {eyebrow ? <p className="week-kicker">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {lede ? <p className="plain-lede">{lede}</p> : null}
        {children ? <div className="week-actions">{children}</div> : null}
      </div>
    </header>
  );
}
