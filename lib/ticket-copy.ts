import { EVENT } from '@/lib/data'

export function ticketAd() {
  return [
    `${EVENT.name} ${EVENT.year}.`,
    `${EVENT.dates}, after 5:30, all over town.`,
    `Three passes open together on ${EVENT.opensOn}.`,
    'Community is free. Support is $25. VIP is $99.',
  ].join('\n')
}

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function renderHtml(text: string, unsubscribe: boolean) {
  const paragraphs = text
    .split('\n\n')
    .map(
      (block) =>
        `<p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;color:#f3ead7;">${escapeHtml(block).replaceAll('\n', '<br>')}</p>`,
    )
    .join('')
  const footer = unsubscribe
    ? `<p style="margin:24px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.4;color:#f3ead7;"><a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#e2b13c;">Unsubscribe</a></p>`
    : ''
  return `<!doctype html><body style="margin:0;padding:32px 20px;background:#070b16;">${paragraphs}${footer}</body>`
}

export function ticketMessage(kind: 'confirm' | 'open', options?: { pass?: string; url?: string }) {
  const intro =
    kind === 'confirm'
      ? `You're on the list${options?.pass ? ` for the ${options.pass}` : ''}. We'll write again on ${EVENT.opensOn}, from ${EVENT.contactEmail}, when the link is live.`
      : `Passes are on sale.${options?.url ? ` ${options.url}` : ''}`
  const text = `${intro}\n\n${ticketAd()}`
  const subject =
    kind === 'confirm'
      ? `${EVENT.name} tickets open ${EVENT.opensOn}`
      : `${EVENT.name} tickets are on sale`
  return { subject, text, html: renderHtml(text, kind === 'open') }
}
