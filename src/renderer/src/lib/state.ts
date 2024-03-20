import { atom } from 'jotai'
import { Device, defaultDevices } from './devices'

export const zoomAtom = atom<number>(1)

export const urlAtom = atom<string>('')

export const devicesAtom = atom<Device[]>(
  defaultDevices.filter((d) => ['10003'].includes(d.id))
  // defaultDevices.filter((d) => ['10003', '10008', '10013', '10014', '10015'].includes(d.id))
)

export const rightPanelAtom = atom<'devices' | 'seo' | null>(null)

export const browserViewAtom = atom<'full' | 'responsive'>('full')
export const deviceAlignmentAtom = atom<'grid' | 'horizontal' | 'vertical'>('grid')
