import { browserViewAtom, rightPanelAtom } from '@/lib/state'
import { cn } from '@/lib/utils'
import { useAtom, useAtomValue } from 'jotai'
import { Terminal, ThumbsUp, XIcon } from 'lucide-react'
import { useMemo } from 'react'

type ToolbarProps = {
  className?: string
}

export const ToolbarSecondary: React.FC<ToolbarProps> = () => {
  const browserView = useAtomValue(browserViewAtom)
  const [rightPanel, setRightPanel] = useAtom(rightPanelAtom)

  const menu = useMemo(
    () => [
      {
        label: 'Devtools',
        icon: <Terminal width="14px" className="transform -rotate-90" />,
        onClick: (): void => {
          window.electron.ipcRenderer.invoke('close-devtools')
          if (rightPanel === 'devtools') {
            setRightPanel(null)
            return
          }

          const el = document.querySelector('webview') as Electron.WebviewTag
          window.electron.ipcRenderer.invoke('open-devtools', {
            webviewId: el.getWebContentsId()
          })

          setRightPanel('devtools')
        }
      },
      {
        label: 'SEO',
        icon: <ThumbsUp width="14px" className="transform -rotate-90" />,
        onClick: (): void => {
          window.electron.ipcRenderer.invoke('close-devtools')
          if (rightPanel === 'seo') {
            setRightPanel(null)
            return
          }
          setRightPanel('seo')
        }
      }
    ],
    [rightPanel, setRightPanel, browserView]
  )

  return (
    <div className="bg-neutral-800 w-8 pt-[52px]">
      <div className="flex transform rotate-90 gap-1">
        {menu.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={cn(
              'flex items-center gap-2 px-2 rounded-md hover:bg-neutral-700 text-white/80 text-xs whitespace-nowrap',
              rightPanel === item.label.toLowerCase() && 'bg-neutral-700'
            )}
          >
            {rightPanel === item.label.toLowerCase() ? <XIcon width="14px" /> : item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
