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
