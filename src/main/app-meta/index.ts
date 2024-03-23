import { BrowserWindow, dialog, ipcMain } from 'electron'
import preload from '../../preload/preload-webview.js?asset'
import { store } from '../store'

export const initAppMetaHandlers = (win: BrowserWindow): void => {
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

  win.on('close', function (e) {
    const response = dialog.showMessageBoxSync(this, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to quit?'
    })

    if (response == 1) e.preventDefault()
  })
}
