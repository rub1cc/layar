import { cn } from '@/lib/utils'
import { FC } from 'react'

type PanelProps = {
  children: React.ReactNode
  className?: string
}
const PanelRoot: FC<PanelProps> = (props) => {
  return (
    <div
      className={cn(
        'bg-neutral-800 w-[600px] h-screen overflow-auto pt-[60px] pb-8 px-4 border-r border-l border-white/5',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

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
