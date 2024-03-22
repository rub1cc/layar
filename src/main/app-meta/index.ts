import { ipcMain } from 'electron'
import preload from '../../preload/preload-webview.js?asset'
import { store } from '../store'

export const initAppMetaHandlers = (): void => {
  ipcMain.removeHandler('app-meta')
  ipcMain.handle('app-meta', () => {
    return {
      webviewPreloadPath: preload
    }
  })

  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = store.get(val)
  })
  ipcMain.on('electron-store-set', async (_, key, val) => {
    store.set(key, val)
  })
  ipcMain.on('electron-store-delete', async (_, key) => {
    store.delete(key)
  })
}
