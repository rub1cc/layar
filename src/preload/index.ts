import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  store: {
    get(val: unknown): unknown {
      return ipcRenderer.sendSync('electron-store-get', val)
    },
    set(key: unknown, val: unknown): void {
      ipcRenderer.send('electron-store-set', key, val)
    },
    delete(key: unknown): void {
      ipcRenderer.send('electron-store-delete', key)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
