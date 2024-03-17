import { atom } from 'jotai'
import { defaultDevices } from './devices'

export const zoomAtom = atom(0.55)

export const urlAtom = atom('https://google.com')

export const urlHistoryAtom = atom<string[]>(['https://google.com'])

export const defaultDevicesAtom = atom(() => {
  return defaultDevices.filter((d) => ['10003', '10008', '10014', '10015'].includes(d.id))
})
