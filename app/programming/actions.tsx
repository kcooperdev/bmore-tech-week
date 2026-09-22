'use client'

export function ProgrammingActions() {
  return (
    <div className="print:hidden flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-none border border-[#241773] bg-[#241773] px-4 py-2 text-sm font-semibold text-white"
      >
        Download PDF
      </button>
      <a
        href="/programming/download"
        className="rounded-none border border-[#241773] px-4 py-2 text-sm font-semibold text-[#241773]"
      >
        Download Markdown
      </a>
      <p className="text-sm text-neutral-600">
        PDF uses the browser print dialog. Choose Save as PDF.
      </p>
    </div>
  )
}
