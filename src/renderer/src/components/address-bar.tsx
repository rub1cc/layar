import { historyAtom, searchingAtom, urlAtom } from '@/lib/state'
import { cn, getFavicon, isValidURL } from '@/lib/utils'
import { Combobox } from '@headlessui/react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Search } from 'lucide-react'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_SEARCH = [
  {
    label: 'google',
    url: 'https://google.com'
  },
  {
    label: 'Youtube',
    url: 'https://youtube.com'
  }
]

const SuggestionList: FC = () => {
  const [url, setUrl] = useAtom(urlAtom)
  const setSearching = useSetAtom(searchingAtom)
  const [input, setInput] = useState<string>(url)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useAtomValue(historyAtom)

  const list = useMemo(() => {
    if (input) {
      return history.filter((item) =>
        `${item.label} ${item.url}`.toLocaleLowerCase().includes(input.toLocaleLowerCase())
      )
    }

    return DEFAULT_SEARCH
  }, [input, url])

  const handleSearch = (url: string): void => {
    if (!url) return

    if (!isValidURL(url)) {
      setUrl('https://google.com/search?q=' + url)
      setSearching(false)
      return
    }

    let newAddress = url
    if (newAddress.indexOf('://') === -1) {
      let protocol = 'https://'
      if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1) {
        protocol = 'http://'
      }
      newAddress = protocol + url
    }

    if (inputRef.current) {
      inputRef.current.blur()
      inputRef.current.value = newAddress
    }
    setUrl(newAddress)
    setSearching(false)
  }

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent): void => {
      if (e.key === 'Tab') {
        alert('TAB')
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', keydownHandler)

    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [])

  return (
    <Combobox value={input} onChange={handleSearch}>
      <Combobox.Input
        autoFocus
        onFocus={(e) => e.currentTarget.select()}
        placeholder="Search or enter website address"
        className="w-full p-4 text-2xl bg-transparent text-white/80 placeholder:text-neutral-600 outline-none"
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      {list.length > 0 && (
        <Combobox.Options
          static
          className="border-t border-neutral-700/30 py-4 overflow-auto max-h-[284px]"
        >
          {input && (
            <Combobox.Option
              value={input}
              className="p-4 rounded-lg ui-active:bg-blue-700 hover:bg-neutral-700/30 text-white/80 flex items-center gap-4"
            >
              <span>
                <Search className="w-4 h-4" />
              </span>
              <span className="line-clamp-1">{input}</span>
            </Combobox.Option>
          )}
          {list.slice(0, 5).map((suggestion) => (
            <Combobox.Option
              key={suggestion.label}
              value={suggestion.url}
              className="p-4 rounded-lg ui-active:bg-blue-700 hover:bg-neutral-700/30 text-white/80 flex items-center gap-4"
            >
              <img src={getFavicon(suggestion.url)} className="w-4 h-4" alt="favicon" />
              <span className="line-clamp-1">
                {suggestion.label} <span className="text-white/30">- {suggestion.url}</span>
              </span>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </Combobox>
  )
}

export const AddressBar: FC = () => {
  const setSearching = useSetAtom(searchingAtom)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setSearching(false)
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex justify-center items-center pt-28">
      <div className="absolute inset-0" onClick={() => setSearching(false)}></div>
      <div className="w-full max-w-2xl relative" style={{ height: '500px' }}>
        <div
          className={cn(
            'w-full',
            'bg-neutral-800 border border-neutral-700 px-2 rounded-xl shadow-xl text-sm'
          )}
        >
          <SuggestionList />
        </div>
      </div>
    </div>
  )
}
