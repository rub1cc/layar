import { Toolbar } from '@/components/toolbar'
import { useAtomValue, useSetAtom } from 'jotai'
import Mousetrap from 'mousetrap'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Device } from './components/device'
import { ToolbarSecondary } from './components/toolbar-secondary'
import { ZoomIndicator } from './components/zoom-indicator'
import { devicesAtom, urlAtom, zoomAtom } from './lib/state'

function App(): JSX.Element {
  const url = useAtomValue(urlAtom)
  const setZoom = useSetAtom(zoomAtom)
  const devices = useAtomValue(devicesAtom)

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

  return (
    <div className="bg-neutral-900">
      <ZoomIndicator />
      {createPortal(<Toolbar />, document.body)}
      <div className="flex flex-1">
        {url && (
          <div className="flex flex-nowrap gap-8 origin-top-left p-4 pt-[56px] w-full h-screen overflow-auto">
            {devices.map((device) => {
              return (
                <div key={device.id}>
                  <Device device={device} />
                </div>
              )
            })}
          </div>
        )}
        <ToolbarSecondary />
      </div>
    </div>
  )
}

export default App
