import { deviceAlignmentAtom, urlAtom } from '@/lib/state'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GridIcon,
  HeightIcon,
  ReloadIcon,
  WidthIcon
} from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useRef } from 'react'

type ToolbarProps = {
  className?: string
}

const alignment = {
  grid: {
    label: 'Grid',
    icon: <GridIcon />
  },
  horizontal: {
    label: 'Horizontal',
    icon: <WidthIcon />
  },
  vertical: {
    label: 'Vertical',
    icon: <HeightIcon />
  }
}

export const Toolbar: React.FC<ToolbarProps> = () => {
  const [url, setUrl] = useAtom(urlAtom)
  const inputRef = useRef<HTMLInputElement>(null)
  const [deviceAlignment, setDeviceAlignment] = useAtom(deviceAlignmentAtom)

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const url = formData.get('url') as string

    if (!url) return

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
  }

  const handleGoBack = (): void => {
    document.querySelectorAll('webview').forEach((webview: Element) => {
      ;(webview as Electron.WebviewTag).goBack()
    })
  }

  const handleGoForward = (): void => {
    document.querySelectorAll('webview').forEach((webview: Element) => {
      ;(webview as Electron.WebviewTag).goForward()
    })
  }

  const handleReloadWebview = (): void => {
    document.querySelectorAll('webview').forEach((webview: Element) => {
      ;(webview as Electron.WebviewTag).reload()
    })
  }

  return (
    <div className="fixed top-0 left-0 right-0 px-1.5 h-[44px] flex justify-between items-center gap-2 bg-neutral-800 border-b border-white/5">
      <div className="flex items-center">
        <button
          className="text-white hover:bg-white/10 p-2 rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
          onClick={handleGoBack}
        >
          <ArrowLeftIcon />
          <span className="hidden">Go back</span>
        </button>
        <button
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
        <input
          id="address-bar"
          key={url}
          ref={inputRef}
          name="url"
          defaultValue={url}
          placeholder="Search or enter website address"
          className="rounded-lg bg-neutral-900/50 border border-neutral-700 text-white/80 border-transparent text-xs w-full p-2"
        />

        <input type="submit" hidden />
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button
            className="text-white hover:bg-white/10 p-2 rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
            title="Device Alignment"
          >
            {alignment[deviceAlignment].icon}
            <span className="hidden">{alignment[deviceAlignment].label}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            align="end"
            className="bg-neutral-800 border border-neutral-700 p-1 rounded-md text-white/80 shadow-xl text-sm space-y-1"
          >
            {Object.entries(alignment).map(([key, value]) => (
              <DropdownMenuItem asChild key={key}>
                <button
                  className={cn(
                    'px-2 py-1 hover:bg-neutral-700 rounded-md flex items-center gap-2 w-full',
                    deviceAlignment === key && 'bg-neutral-700'
                  )}
                  onClick={() => setDeviceAlignment(key as unknown as keyof typeof alignment)}
                >
                  {value.icon}
                  <span>{value.label}</span>
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  )
}
