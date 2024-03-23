import { StoreSchema } from '@/shared/types'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    app: {
      webviewPreloadPath: string
    }
    electron: ElectronAPI
    api: {
      store: {
        get: <T extends keyof StoreSchema>(val: T) => StoreSchema[T]
        set: <T extends keyof StoreSchema>(key: T, val: StoreSchema[T]) => void
        delete: <T extends keyof StoreSchema>(key: T) => void
      }
    }
  }
}
