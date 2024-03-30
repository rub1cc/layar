import { cn } from '@/lib/utils'
import { FC, forwardRef } from 'react'

type PanelProps = {
  children?: React.ReactNode
  resizable?: boolean
  className?: string
  onResize?: (size: number, prevSize: number | undefined) => void
}
const PanelRoot = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-neutral-800 w-full h-screen overflow-auto pt-[60px] pb-8 px-4 border-r border-l border-white/5',
        props.className
      )}
    >
      {props.children}
    </div>
  )
})
PanelRoot.displayName = 'PanelRoot'

type PanelTitleProps = {
  children: React.ReactNode
  className?: string
}
const PanelTitle: FC<PanelTitleProps> = (props) => {
  return <p className={cn('text-white/80', props.className)}>{props.children}</p>
}

export const Panel = {
  Root: PanelRoot,
  Title: PanelTitle
}
