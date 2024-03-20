import { ipcMain } from 'electron'
import preload from '../preload/preload-webview.js?asset'

export const initAppMetaHandlers = (): void => {
  ipcMain.handle('app-meta', () => {
    return {
      webviewPreloadPath: preload
    }
  })
}
