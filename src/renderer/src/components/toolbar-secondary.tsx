import { defaultDevices, presetResponsive } from '@/lib/devices'
import { devicesAtom } from '@/lib/state'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { Laptop, Smartphone, Tablet } from 'lucide-react'
import { useState } from 'react'

type ToolbarProps = {
  className?: string
}

export const ToolbarSecondary: React.FC<ToolbarProps> = () => {
  const [devices, setDevices] = useAtom(devicesAtom)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      {open && (
        <div className="bg-neutral-800 w-[600px] h-screen overflow-auto pt-[60px] px-4 border-r border-l border-white/5">
          <p className="text-white/80">Presets</p>
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
          <p className="text-white/80 mt-12">Available Devices</p>
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
        </div>
      )}
      <div className="bg-neutral-800 w-8 pt-[52px]">
        <div className="flex transform rotate-90 gap-1">
          <button
            onClick={() => setOpen((old) => !old)}
            className="flex items-center gap-2 px-2 rounded-md hover:bg-neutral-700 text-white/80 text-xs whitespace-nowrap"
          >
            <Smartphone width="14px" className="transform -rotate-90" />
            <span>Devices</span>
          </button>
          {/* <button
            onClick={() => setOpen((old) => !old)}
            className="flex items-center gap-2 px-2 rounded-md hover:bg-neutral-700  text-white/80 text-xs whitespace-nowrap"
          >
            <ThumbsUp width="14px" className="transform -rotate-90" />
            <span>SEO Checker</span>
          </button>
          <button
            onClick={() => setOpen((old) => !old)}
            className="flex items-center gap-2 px-2 rounded-md hover:bg-neutral-700  text-white/80 text-xs whitespace-nowrap"
          >
            <Terminal width="14px" className="transform -rotate-90" />
            <span>Devtools</span>
          </button> */}
        </div>
      </div>
    </>
  )
}
