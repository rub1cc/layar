import { Toolbar } from '@/components/toolbar'
import { useAtomValue, useSetAtom } from 'jotai'
import { Search } from 'lucide-react'
import Mousetrap from 'mousetrap'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Device } from './components/device'
import { ToolbarSecondary } from './components/toolbar-secondary'
import { Webview } from './components/webview'
import { ZoomIndicator } from './components/zoom-indicator'
import { browserViewAtom, deviceAlignmentAtom, devicesAtom, urlAtom, zoomAtom } from './lib/state'
import { cn, isValidURL } from './lib/utils'

function App(): JSX.Element {
  const url = useAtomValue(urlAtom)
  const setZoom = useSetAtom(zoomAtom)
  const devices = useAtomValue(devicesAtom)
  const inputRef = useRef<HTMLInputElement>(null)
  const setUrl = useSetAtom(urlAtom)
  const deviceAlignment = useAtomValue(deviceAlignmentAtom)
  const browserView = useAtomValue(browserViewAtom)

  const registerShortcuts = (): void => {
    Mousetrap.reset()
    Mousetrap.bind('mod+l', function () {
      const el = document.getElementById('address-bar') as HTMLInputElement
      if (!el) return
      el?.focus()
      el?.select()
    })
    Mousetrap.bind('mod+0', function () {
      setZoom(0.5)
    })
    Mousetrap.bind('mod+-', function () {
      setZoom((old) => {
        if (old <= 0.4) return old
        return old - 0.1
      })
    })
    Mousetrap.bind('mod+=', function () {
      setZoom((old) => {
        if (old >= 1.2) return old
        return old + 0.1
      })
    })
  }

  useEffect(() => {
    registerShortcuts()
  }, [])

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const url = formData.get('url') as string

    if (!url) return

    if (!isValidURL(url)) {
      setUrl('https://google.com/search?q=' + url)
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
  }

  return (
    <div className="bg-neutral-900">
      {browserView === 'responsive' && <ZoomIndicator />}
      {createPortal(<Toolbar />, document.body)}
      <div className="flex flex-1">
        {url ? (
          <div
            className={cn(
              'gap-8 pt-[40px] w-full h-screen overflow-auto',
              browserView === 'responsive' && 'p-4 pt-[56px]',
              deviceAlignment === 'grid' && 'flex flex-wrap',
              deviceAlignment === 'horizontal' && 'flex flex-nowrap',
              deviceAlignment === 'vertical' && 'flex flex-col items-center'
            )}
          >
            {url && browserView === 'responsive' ? (
              devices.map((device) => {
                return (
                  <div key={device.id}>
                    <Device device={device} />
                  </div>
                )
              })
            ) : (
              <Webview />
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center p-4 pt-[56px] w-full h-screen overflow-auto">
            <form onSubmit={handleSubmitForm} className="w-full max-w-[800px] relative">
              <span className="absolute left-0 top-0 bottom-0 w-14 flex justify-center items-center">
                <Search className="text-white/80 w-5" />
              </span>
              <input
                id="address-bar"
                key={url}
                ref={inputRef}
                name="url"
                defaultValue={url}
                placeholder="Search or enter website address"
                className="rounded-lg bg-neutral-700/30 border border-neutral-700 text-white/80 border-transparent  w-full p-4 pl-14"
              />

              <input type="submit" hidden />
            </form>
          </div>
        )}
        {browserView === 'responsive' && <ToolbarSecondary />}
      </div>
    </div>
  )
}

export default App
