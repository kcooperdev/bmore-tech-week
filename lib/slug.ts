export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 72)
  return slug || 'event'
}

export function uniqueSlug(base: string, taken: string[]) {
  const root = slugify(base)
  if (!taken.includes(root)) return root
  let i = 2
  while (taken.includes(`${root}-${i}`)) i += 1
  return `${root}-${i}`
}
