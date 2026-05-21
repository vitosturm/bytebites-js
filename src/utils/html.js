import sanitizeHtml from 'sanitize-html'

// Whitelist: only structural/inline tags — no scripts, no attributes, no event handlers
const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'b', 'i', 'ul', 'ol', 'li', 'h2', 'h3', 'h4']

export function sanitize(html) {
  return sanitizeHtml(html, { allowedTags: ALLOWED_TAGS, allowedAttributes: {} })
}

export function stripHtml(html) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, ' ')
    .trim()
}

export function truncate(text, maxLength) {
  if (text.length <= maxLength) return text
  const cut = text.lastIndexOf(' ', maxLength)
  return text.slice(0, cut > 0 ? cut : maxLength).trimEnd() + '…'
}
