import { historyAtom, searchingAtom, urlAtom } from '@/lib/state'
import { cn, getFavicon, isValidURL } from '@/lib/utils'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Search } from 'lucide-react'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

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

interface SuggestionListProps {
  input: string
}

const SuggestionList: FC<SuggestionListProps> = (props) => {
  const [url, setUrl] = useAtom(urlAtom)
  const setSearching = useSetAtom(searchingAtom)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useAtomValue(historyAtom)
  const [activeIndex, setActiveIndex] = useState(-1)

  const suggestions = useMemo(() => {
    if (props.input) {
      return history.filter((item) =>
        `${item.label} ${item.url}`.toLocaleLowerCase().includes(props.input.toLocaleLowerCase())
      )
    }

    return DEFAULT_SEARCH
  }, [props.input, url])

  const searchUrl = (url: string): void => {
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

  const keydownHandler = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        if (activeIndex === -1) {
          searchUrl(props.input)
        } else {
          searchUrl(suggestions[activeIndex].url)
        }
      }

      if (e.key === 'ArrowDown') {
        if (activeIndex === suggestions.length - 1) return
        const nextId = activeIndex + 1
        setActiveIndex(nextId)

        document.getElementById(`suggestion${nextId}`)?.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'smooth'
        })

        const inputEl = document.getElementById('address-bar-input') as HTMLInputElement
        if (inputEl) {
          inputEl.value = nextId == -1 ? props.input : suggestions[nextId].url
          inputEl.select()
        }
      }

      if (e.key === 'ArrowUp') {
        if (activeIndex === -1) return
        const nextId = activeIndex - 1
        setActiveIndex(nextId)

        document.getElementById(`suggestion${nextId}`)?.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'smooth'
        })
        const inputEl = document.getElementById('address-bar-input') as HTMLInputElement
        if (inputEl) {
          inputEl.value = nextId == -1 ? props.input : suggestions[nextId].url
          inputEl.select()
        }
      }
    },
    [activeIndex, suggestions, searchUrl]
  )

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler)

    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [keydownHandler])

  return (
    <div className="border-t border-neutral-700/30 py-4 overflow-auto max-h-[284px]">
      {props.input && (
        <button
          type="button"
          className={cn(
            'text-left w-full p-4 rounded-lg ui-active:bg-blue-700 hover:bg-neutral-700/30 text-white/80 flex items-center gap-4',
            activeIndex === -1 ? 'bg-blue-700 hover:bg-blue-700' : ''
          )}
          onClick={() => searchUrl(props.input)}
        >
          <span>
            <Search className="w-4 h-4" />
          </span>
          <span className="line-clamp-1">{props.input}</span>
        </button>
      )}
      {suggestions.map((suggestion, index) => (
        <button
          type="button"
          id={`suggestion${index}`}
          key={`suggestion${index}`}
          className={cn(
            'text-left w-full p-4 rounded-lg ui-active:bg-blue-700 hover:bg-neutral-700/30 text-white/80 flex items-center gap-4',
            activeIndex === index ? 'bg-blue-700 hover:bg-blue-700' : ''
          )}
          onClick={() => searchUrl(suggestion.url)}
        >
          <img src={getFavicon(suggestion.url)} className="w-4 h-4" alt="favicon" />
          <span className="line-clamp-1">
            {suggestion.label} <span className="text-white/30">- {suggestion.url}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

export const AddressBar: FC = () => {
  const [input, setInput] = useState('')
  const url = useAtomValue(urlAtom)
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
          <input
            autoFocus
            id="address-bar-input"
            defaultValue={url}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault()
                document.getElementById('address-bar-input')?.blur()
                document.getElementById('address-bar-input')?.focus()
              }
            }}
            onFocus={(e) => e.currentTarget.select()}
            placeholder="Search or enter website address"
            className="w-full p-4 text-2xl bg-transparent text-white/80 placeholder:text-neutral-600 outline-none"
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <SuggestionList key={input} input={input} />
        </div>
      </div>
    </div>
  )
}
