import { toProgrammingMarkdown } from '@/lib/programming'

export function GET() {
  return new Response(toProgrammingMarkdown(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition':
        'attachment; filename="BTW-2027-Night-Programming-Blueprint.md"',
      'Cache-Control': 'no-store',
    },
  })
}
