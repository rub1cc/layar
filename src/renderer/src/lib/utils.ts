import { clsx, type ClassValue } from 'clsx'
import { useAtom } from 'jotai'
import { twMerge } from 'tailwind-merge'
import { urlHistoryAtom } from './state'

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

export function appendUrlHistory(url: string): void {
  const [urlHistory, setUrlHistory] = useAtom(urlHistoryAtom)

  if (urlHistory.indexOf(url) === -1) {
    setUrlHistory((old) => [...old, url])
  }
}
