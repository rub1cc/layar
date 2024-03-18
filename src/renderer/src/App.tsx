import { Toolbar } from '@/components/toolbar'
import { useAtom, useAtomValue } from 'jotai'
import Mousetrap from 'mousetrap'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Device } from './components/device'
import { defaultDevicesAtom, urlAtom, zoomAtom } from './lib/state'
import { cn } from './lib/utils'

function App(): JSX.Element {
  const url = useAtomValue(urlAtom)
  const [zoom, setZoom] = useAtom(zoomAtom)
  const devices = useAtomValue(defaultDevicesAtom)

  const registerShortcuts = () => {
    Mousetrap.reset()
    Mousetrap.bind('mod+l', function () {
      document.getElementById('address-bar')?.focus()
      document.getElementById('address-bar')?.select()
    })
    Mousetrap.bind('mod+0', function () {
      setZoom(0.5)
    })
    Mousetrap.bind('mod+-', function () {
      setZoom((old) => {
        if (old <= 0.3) return old
        return old - 0.1
      })
    })
    Mousetrap.bind('mod+=', function () {
      setZoom((old) => {
        if (old >= 1.5) return old
        return old + 0.1
      })
    })
  }

  useEffect(() => {
    registerShortcuts()
  }, [])

  return (
    <div className="bg-neutral-950">
      {createPortal(
        <span
          className={cn(
            'bg-neutral-800 px-2 py-1 rounded-md text-xs fixed bottom-4 right-4 text-white'
          )}
        >
          {(zoom * 100).toFixed()}%
        </span>,
        document.body
      )}
      <Toolbar />
      {url && (
        <div className="flex flex-nowrap gap-8 origin-top-left p-4 pt-[76px] w-screen h-screen overflow-auto">
          {devices.map((device) => {
            return (
              <div key={device.id}>
                <Device device={device} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
