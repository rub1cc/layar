import { rightPanelAtom } from '@/lib/state'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { Smartphone, ThumbsUp } from 'lucide-react'
import { DevicesPanel } from './panels/devices'
import { SEOPanel } from './panels/seo'

type ToolbarProps = {
  className?: string
}

export const ToolbarSecondary: React.FC<ToolbarProps> = () => {
  const [rightPanel, setRightPanel] = useAtom(rightPanelAtom)

  return (
    <>
      {rightPanel === 'devices' && <DevicesPanel />}
      {rightPanel === 'seo' && <SEOPanel />}
      <div className="bg-neutral-800 w-8 pt-[52px]">
        <div className="flex transform rotate-90 gap-1">
          <button
            onClick={() => {
              if (rightPanel === 'devices') {
                setRightPanel(null)
                return
              }
              setRightPanel('devices')
            }}
            className={cn(
              'flex items-center gap-2 px-2 rounded-md hover:bg-neutral-700 text-white/80 text-xs whitespace-nowrap',
              rightPanel === 'devices' && 'bg-neutral-700'
            )}
          >
            <Smartphone width="14px" className="transform -rotate-90" />
            <span>Devices</span>
          </button>
          <button
            onClick={() => {
              if (rightPanel === 'seo') {
                setRightPanel(null)
                return
              }
              setRightPanel('seo')
            }}
            className={cn(
              'flex items-center gap-2 px-2 rounded-md hover:bg-neutral-700 text-white/80 text-xs whitespace-nowrap',
              rightPanel === 'seo' && 'bg-neutral-700'
            )}
          >
            <ThumbsUp width="14px" className="transform -rotate-90" />
            <span>SEO</span>
          </button>
        </div>
      </div>
    </>
  )
}
