import { cn } from '@/lib/utils'
import * as Tabs from '@radix-ui/react-tabs'
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
        'bg-[#282828] w-full h-screen overflow-auto pt-[40px] border-r border-l border-white/5 text-xs break-words',
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
  return <p className={cn('text-white/80 text-base', props.className)}>{props.children}</p>
}

type PanelTabsProps = {
  children: React.ReactNode
  defaultValue?: string
}

const PanelTabs: FC<PanelTabsProps> = (props) => {
  return <Tabs.Root defaultValue={props.defaultValue}>{props.children}</Tabs.Root>
}

type PanelTabsListProps = {
  items: Array<{
    value: string
    label: string
  }>
}
const PanelTabsList: FC<PanelTabsListProps> = (props) => {
  return (
    <Tabs.List className="bg-[#3C3C3C] text-xs text-[#C7C7C7] text-nowrap overflow-x-auto no-scroll-indicator">
      {props.items.map((item) => (
        <Tabs.Trigger
          key={item.value}
          value={item.value}
          className="py-1.5 px-3 hover:bg-[#505050] border-b border-[#474747] data-[state=active]:text-[#A8C7FA] data-[state=active]:border-[#7CACF8]"
        >
          {item.label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  )
}

type PanelTabsContentProps = {
  children: React.ReactNode
  value: string
  isLoading?: boolean
  renderLoading?: React.ReactNode
}

const PanelTabsContent: FC<PanelTabsContentProps> = (props) => {
  return (
    <Tabs.Content value={props.value} className="bg-[#282828] border-t border-[#474747]">
      {props.isLoading ? props.renderLoading ?? null : props.children}
    </Tabs.Content>
  )
}

export const Panel = {
  Root: PanelRoot,
  Title: PanelTitle,
  Tabs: PanelTabs,
  TabsList: PanelTabsList,
  TabsContent: PanelTabsContent
}
