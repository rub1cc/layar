import { atom } from 'jotai'
import { defaultDevices } from './devices'

export const zoomAtom = atom(0.5)

export const urlAtom = atom('https://google.com')

export const devicesAtom = atom(
  defaultDevices.filter((d) => ['10003', '10008', '10013', '10014', '10015'].includes(d.id))
)
