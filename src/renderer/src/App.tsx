import { Toolbar } from '@/components/toolbar'
import { useAtom, useAtomValue } from 'jotai'
import Mousetrap from 'mousetrap'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AddressBar } from './components/address-bar'
import { Device } from './components/device'
import { ToolbarSecondary } from './components/toolbar-secondary'
import { Webview } from './components/webview'
import { ZoomIndicator } from './components/zoom-indicator'
import {
  browserViewAtom,
  deviceAlignmentAtom,
  devicesAtom,
  searchingAtom,
  urlAtom,
  zoomAtom
} from './lib/state'
import { cn } from './lib/utils'

function App(): JSX.Element {
  const url = useAtomValue(urlAtom)
  const [zoom, setZoom] = useAtom(zoomAtom)
  const [searching, setSearching] = useAtom(searchingAtom)
  const devices = useAtomValue(devicesAtom)
  const deviceAlignment = useAtomValue(deviceAlignmentAtom)
  const browserView = useAtomValue(browserViewAtom)

  const registerShortcuts = (): void => {
    Mousetrap.reset()
    Mousetrap.bind('mod+r', function () {
      document.querySelectorAll('webview').forEach((webview: Element) => {
        const wv = webview as Electron.WebviewTag
        wv.reload()
      })
    })
    Mousetrap.bind('mod+l', function () {
      setSearching(true)
    })
    Mousetrap.bind('mod+0', function () {
      setZoom(0.5)
    })
    Mousetrap.bind('mod+-', function () {
      if (zoom <= 0.4) return
      setZoom(zoom - 0.1)
    })
    Mousetrap.bind('mod+=', function () {
      if (zoom >= 1.2) return
      setZoom(zoom + 0.1)
    })
    Mousetrap.bind('mod+left', function () {
      document.querySelectorAll('webview').forEach((webview: Element) => {
        ;(webview as Electron.WebviewTag).goBack()
      })
    })
    Mousetrap.bind('mod+right', function () {
      document.querySelectorAll('webview').forEach((webview: Element) => {
        ;(webview as Electron.WebviewTag).goForward()
      })
    })
  }

  useEffect(() => {
    registerShortcuts()
  }, [])

  return (
    <div className="bg-neutral-900">
      {browserView === 'responsive' && <ZoomIndicator />}
      {url && createPortal(<Toolbar />, document.body)}
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
            <AddressBar />
          </div>
        )}
        {url && <ToolbarSecondary />}
        {searching && <AddressBar />}
      </div>
    </div>
  )
}

export default App
