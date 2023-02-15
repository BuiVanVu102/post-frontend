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

//form

export function setFieldValue(form: any, selector: any, value: any) {
  if (!form) return
  const field = form.querySelector(selector)
  if (field) field.value = value
}

export function setBackgroundImage(document: any, selector: any, value: any) {
  if (!document) return
  const backgroundImg = document.querySelector(selector)

  if (backgroundImg) backgroundImg.style.backgroundImage = `url("${value}")`
}

//write function script take any number return random number form 0 to any number using typescript and i need check condition
export function randomNumber(max: number): number {
  if (max < 0) {
    throw new Error('Max must be greater than 0')
  }

  return Math.floor(Math.random() * max)
}
