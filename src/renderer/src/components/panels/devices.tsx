import { defaultDevices, presetResponsive } from '@/lib/devices'
import { devicesAtom } from '@/lib/state'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { Laptop, Smartphone, Tablet } from 'lucide-react'
import { FC } from 'react'
import { Panel } from './panel'

export const DevicesPanel: FC = () => {
  const [devices, setDevices] = useAtom(devicesAtom)
  return (
    <Panel.Root>
      <Panel.Title>Presets</Panel.Title>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          className="flex flex-col items-center gap-2 p-4 text-white/80 border border-neutral-700 rounded-md"
          onClick={() => {
            setDevices(defaultDevices.filter((d) => presetResponsive.includes(d.id)))
          }}
        >
          <span className="text-xs">Responsive Check</span>
          <span className="flex items-center gap-2">
            <Smartphone width="20px" />
            <Tablet width="20px" />
            <Laptop width="20px" />
          </span>
        </button>
      </div>
      <Panel.Title className="mt-12">Available Devices</Panel.Title>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {defaultDevices.map((device) => {
          return (
            <button
              key={device.id}
              className={cn(
                'text-left flex items-center gap-2 py-2 text-white/80 border border-neutral-700 px-2 rounded-md',
                devices.find((d) => d.id === device.id) && 'bg-blue-800 border-blue-700'
              )}
              onClick={() => {
                if (devices.find((d) => d.id === device.id)) {
                  setDevices((old) => old.filter((d) => d.id !== device.id))
                  return
                }
                setDevices((old) => [...old, device])
              }}
            >
              <span>
                {device.type === 'phone' ? (
                  <Smartphone width="20px" />
                ) : device.type === 'tablet' ? (
                  <Tablet width="20px" />
                ) : (
                  <Laptop width="20px" />
                )}
              </span>
              <span className="text-sm">
                {device.name}{' '}
                <span className="opacity-50 text-xs block">
                  {device.width}x{device.height}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </Panel.Root>
  )
}
