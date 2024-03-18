import { zoomAtom } from '@/lib/state'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { FC } from 'react'
import { createPortal } from 'react-dom'

export const ZoomIndicator: FC = () => {
  const [zoom, setZoom] = useAtom(zoomAtom)
  return (
    <>
      {createPortal(
        <div className={cn('fixed bottom-4 left-4 text-white/80 flex items-center gap-2')}>
          <button
            onClick={() => {
              setZoom((old) => {
                if (old <= 0.4) return old
                return old - 0.1
              })
            }}
          >
            <MinusIcon className="w-4" />
            <span className="hidden">Zoom out</span>
          </button>
          <span className={cn('bg-neutral-800 px-2 py-1 rounded-md text-xs')}>
            {(zoom * 100).toFixed()}%
          </span>
          <button
            onClick={() => {
              setZoom((old) => {
                if (old >= 1.2) return old
                return old + 0.1
              })
            }}
          >
            <PlusIcon className="w-4" />
            <span className="hidden">Zoom in</span>
          </button>
        </div>,
        document.body
      )}
    </>
  )
}
