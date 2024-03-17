import { Input } from '@/components/ui/input'
import { urlAtom, urlHistoryAtom } from '@/lib/state'
import { appendUrlHistory } from '@/lib/utils'
import { ArrowLeftIcon, ArrowRightIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useAtom, useAtomValue } from 'jotai'
import { useRef } from 'react'

type ToolbarProps = {
  className?: string
}

export const Toolbar: React.FC<ToolbarProps> = () => {
  const [url, setUrl] = useAtom(urlAtom)
  const urlHistory = useAtomValue(urlHistoryAtom)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const url = formData.get('url') as string

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

    if (urlHistory.indexOf(newAddress) === -1) {
      appendUrlHistory(newAddress)
    }
  }

  const canGoBack = urlHistory.indexOf(url) > 0
  const handleGoBack = (): void => {
    const index = urlHistory.indexOf(url)
    if (index > 0) {
      setUrl(urlHistory[index - 1])
      if (inputRef.current) {
        inputRef.current.blur()
        inputRef.current.value = urlHistory[index - 1]
      }
    }
  }

  const canGoForward = urlHistory.indexOf(url) < urlHistory.length - 1
  const handleGoForward = (): void => {
    const index = urlHistory.indexOf(url)
    if (index < urlHistory.length - 1) {
      setUrl(urlHistory[index + 1])
      if (inputRef.current) {
        inputRef.current.blur()
        inputRef.current.value = urlHistory[index + 1]
      }
    }
  }

  const handleReloadWebview = (): void => {
    document.querySelectorAll('webview').forEach((webview: Electron.WebviewTag) => {
      webview.reload()
    })
  }

  return (
    <div className="fixed top-0 left-0 right-0 px-4 h-[60px] flex justify-center items-center gap-2">
      <div className="flex items-center gap-2">
        <button
          disabled={!canGoBack}
          className="text-white hover:bg-white/10 p-2 rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
          onClick={handleGoBack}
        >
          <ArrowLeftIcon />
          <span className="hidden">Go back</span>
        </button>
        <button
          disabled={!canGoForward}
          className="text-white hover:bg-white/10 p-2 rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
          onClick={handleGoForward}
        >
          <ArrowRightIcon />
          <span className="hidden">Go forward</span>
        </button>
        <button
          className="text-white hover:bg-white/10 p-2 rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
          onClick={handleReloadWebview}
        >
          <ReloadIcon />
          <span className="hidden">Reload</span>
        </button>
      </div>
      <form onSubmit={handleSubmitForm} className="w-full">
        <Input
          key={url}
          ref={inputRef}
          name="url"
          defaultValue={url}
          placeholder="Input URL"
          className="rounded-full bg-white/5 text-white/80 border-transparent"
        />

        <input type="submit" hidden />
      </form>
    </div>
  )
}
