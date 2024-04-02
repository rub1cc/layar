import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Panel } from './panel'

const MARGIN = 44

export const DevtoolsPanel = forwardRef<
  | HTMLDivElement
  | {
      resize: () => void
    }
>((_, ref) => {
  const panelRef = useRef<HTMLDivElement>(null)

  const handleResize = (): void => {
    if (!panelRef.current) return

    if (!panelRef.current.getBoundingClientRect() === null) return

    const { x, y, height, width } = panelRef.current?.getBoundingClientRect() || {}

    const bounds = { x, y: y + MARGIN, height: height - MARGIN, width }

    window.electron.ipcRenderer.invoke('resize-devtools', { bounds })
  }

  useImperativeHandle(ref, () => ({
    resize: handleResize
  }))

  useEffect(() => {
    handleResize()
  }, [])

  return <Panel.Root ref={panelRef}></Panel.Root>
})

DevtoolsPanel.displayName = 'DevtoolsPanel'
