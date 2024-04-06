import { StoreSchema } from '@/shared/types'
import { WritableAtom, atom } from 'jotai'
import { mobileDevices } from './devices'

const persistAtom = <K extends keyof StoreSchema>(
  key: K,
  initialValue?: StoreSchema[K]
): WritableAtom<StoreSchema[K], [update: StoreSchema[K]], void> => {
  const getInitialValue = (): StoreSchema[K] => {
    return window.api.store.get(key) ?? initialValue
  }
  const baseAtom = atom(getInitialValue() ?? initialValue)
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      window.api.store.set(key, nextValue)
    }
  )
  return derivedAtom
}

/**
 * atom for handling zoom level
 * of the responsive view
 */
export const zoomAtom = persistAtom('zoom')

/**
 * atom for handling the address bar
 */
export const urlAtom = persistAtom('url')

/**
 * atom for handling the devices
 */
export const devicesAtom = persistAtom('devices', [mobileDevices[0]])

/**
 * atom for handling the alignment of the devices
 */
export const deviceAlignmentAtom = persistAtom('devicesAlignment')

/**
 * atom for handling what is displayed in the right panel
 */
export const rightPanelAtom = atom<'seo' | 'devtools' | null>(null)

/**
 * atom for handling the browser view
 */
export const browserViewAtom = persistAtom('browserView')

/**
 * atom for handling the show address bar
 */
export const searchingAtom = atom(false)

/**
 * atom for handling the history
 */
export const historyAtom = persistAtom('history')
export const updateHistoryAtom = atom(null, (get, set, update: { url: string; label: string }) => {
  const updatedHistory = [
    {
      url: update.url,
      label: update.label
    },
    ...get(historyAtom).filter((h) => h.url !== update.url)
  ]
  set(historyAtom, updatedHistory)
})

export const panelSizeAtom = persistAtom('panelSize', 30)
