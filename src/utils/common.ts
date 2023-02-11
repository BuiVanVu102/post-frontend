export function setTextContent(parent: any, selector: any, text: string) {
  if (!parent) return
  const element = parent.querySelector(selector)
  if (element) element.textContent = text
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text

  return `${text.slice(0, maxLength - 1)}...`
}

//initURL
export function initURL() {
  const url: any = new URL(window.location.href)
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)
  return history.pushState({}, '', url)
}
