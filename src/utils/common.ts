export function setTextContent(parent: any, selector: any, text: string) {
  if (!parent) return
  const element = parent.querySelector(selector)
  if (element) element.textContent = text
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text

  return `${text.slice(0, maxLength - 1)}...`
}
