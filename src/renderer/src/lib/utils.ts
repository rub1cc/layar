import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function debounce<T>(fn: (arg: T) => void, delay: number): (arg: T) => void {
  let timeout: number
  return function (arg: T) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(arg), delay)
  }
}

export function cssPathFromElement(element: HTMLElement): string {
  const path: string[] = []
  while (element.nodeType === Node.ELEMENT_NODE) {
    let selector = element.nodeName.toLowerCase()
    if (element.id) {
      selector += `#${element.id}`
    } else if (element.className) {
      selector += `.${element.className}`
    }
    path.unshift(selector)
    element = element.parentNode as HTMLElement
  }
  return path.join(' > ')
}
