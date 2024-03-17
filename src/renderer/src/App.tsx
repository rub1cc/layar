import { Toolbar } from '@/components/toolbar'
import { useAtomValue } from 'jotai'
import { Device } from './components/device'
import { defaultDevicesAtom, urlAtom } from './lib/state'

function App(): JSX.Element {
  const url = useAtomValue(urlAtom)
  const devices = useAtomValue(defaultDevicesAtom)
  return (
    <div className="bg-neutral-950">
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
