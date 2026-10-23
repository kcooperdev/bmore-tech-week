import { EVENT } from '@/lib/data'

export function ticketAd() {
  return [
    `${EVENT.name} ${EVENT.year}.`,
    `${EVENT.dates}, after 5:30, in rooms around the city.`,
    `Tickets open ${EVENT.opensOn}.`,
    'General Admission is free.',
    'A single-night VIP is $45: priority line, one drink ticket, front row, and a swag bag. 35 per night.',
    'The 5-night Week VIP is $125: express line every night, three drink tickets, a t-shirt, swag, and front row.',
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
      ? `Thanks. You are on the list${options?.pass && options.pass !== 'Updates list' ? ` for the ${options.pass}` : ''}. We will write on ${EVENT.opensOn} from ${EVENT.contactEmail}, when the ticket link is live.`
      : `Passes are on sale.${options?.url ? ` ${options.url}` : ''}`
  const text = `${intro}\n\n${ticketAd()}`
  const subject =
    kind === 'confirm'
      ? `${EVENT.name} tickets open ${EVENT.opensOn}`
      : `${EVENT.name} tickets are on sale`
  return { subject, text, html: renderHtml(text, kind === 'open') }
}
